import { Request, Response } from "express";
import Stripe from "stripe";
import Restaurant, { MenuItemType } from "../Models/Restaurant";
import Order from "../Models/Order";

const STRIPE = new Stripe(process.env.SPRIPE_API_KEY as string);
const FRONTEND_URL = process.env.FRONTEND_URL as string;

type CheckoutSessionRequest = {
	cartItems: {
		menuItemId: string;
		name: string;
		quantity: string;
	}[];
	deliveryDetails: {
		email: string;
		name: string;
		addressLine1: string;
		city: string;
	};
	restaurantId: string;
};

const createCheckoutSession = async (req: Request, res: Response) => {
	try {
		const checkoutSessionRequest: CheckoutSessionRequest = req.body;

		const restaurant = await Restaurant.findById(
			checkoutSessionRequest.restaurantId
		);

		if (!restaurant) throw new Error("Restaurant not found");

		const newOrder = new Order({
			restaurant: restaurant,
			user: req.userId,
			status: "placed",
			deliveryDetails: checkoutSessionRequest.deliveryDetails,
			cartItems: checkoutSessionRequest.cartItems,
		})

		const lineItems = createLineItems(
			checkoutSessionRequest,
			restaurant.menuItems
		);

		const session = await createSession(
			lineItems,
			newOrder._id.toString(),
			restaurant.deliveryPrice,
			restaurant._id.toString()
		);

        if(!session.url) {
            return res.status(500).json({msg: "Error creating stripe session"})
        }

		await newOrder.save()
        
        res.status(200).json({url: session.url})
	} catch (error: any) {
		console.log(error);
		res.status(500).json({ msg: error.raw.message });
	}
};

const createLineItems = (
	checkoutSessionRequest: CheckoutSessionRequest,
	menuItems: MenuItemType[]
) => {
	// foreach cartItem, get the menuItem object from the restaurant (to get the price)
	//foreach cartItem, convert it to a stripe line item
	//return line item array

	const lineItems = checkoutSessionRequest.cartItems.map((cartItem) => {
		const menuItem = menuItems.find(
			(item) => item._id.toString() === cartItem.menuItemId.toString()
		);
		if (!menuItem) {
			throw new Error(`Menu Item not found: ${cartItem.menuItemId}`);
		}

		const line_item: Stripe.Checkout.SessionCreateParams.LineItem = {
			price_data: {
				currency: "ngn",
				unit_amount: menuItem.price,
				product_data: {
					name: menuItem.name,
				},
			},
			quantity: parseInt(cartItem.quantity),
		};

		return line_item;
	});
	return lineItems;
};

const createSession = async (
	lineItems: Stripe.Checkout.SessionCreateParams.LineItem[],
	orderId: string,
	deliveryPrice: number,
	restaurantId: string
) => {
	const sesssionData = await STRIPE.checkout.sessions.create({
		line_items: lineItems,
		shipping_options: [
			{
				shipping_rate_data: {
					display_name: "Delivery",
					type: "fixed_amount",
					fixed_amount: {
						amount: deliveryPrice,
						currency: "ngn",
					},
				},
			},
		],
		mode: "payment",
		metadata: {
			orderId,
			restaurantId,
		},
		success_url: `${FRONTEND_URL}/order-status?success=true`,
		cancel_url: `${FRONTEND_URL}/detail/${restaurantId}?cancelled=true`,
	});

    return sesssionData
};

export default {
	createCheckoutSession,
};
