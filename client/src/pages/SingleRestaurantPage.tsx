import { usecreateCheckoutSession } from "@/api/OrderApi";
import { useGetRestaurant } from "@/api/Restaurant";
import CheckOutBtn from "@/components/custom/CheckOutBtn";
import MenuItem from "@/components/custom/MenuItem";
import OrderSummary from "@/components/custom/OrderSummary";
import RestaurantInfo from "@/components/custom/RestaurantInfo";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardFooter } from "@/components/ui/card";
import { UserFormData } from "@/forms/user_profile_form/UserProfileForm";
import { MenuItem as MenuItemType } from "@/types/types";
import { useState } from "react";
import { useParams } from "react-router-dom";

export type CartItem = {
	_id: string;
	name: string;
	price: number;
	quantity: number;
};

const SingleRestaurantPage = () => {
	const { restaurantId } = useParams();
	const { restaurant, isLoading } = useGetRestaurant(restaurantId);
	const {createCheckoutSession, isLoading: isCheckoutLoading} = usecreateCheckoutSession()

	const [cartItems, setCartItems] = useState<CartItem[]>(() => {
		const storedCartItems = sessionStorage.getItem(`cartItems-${restaurantId}`);
		return storedCartItems ? JSON.parse(storedCartItems) : [];
	});

	const addToCart = (menuItem: MenuItemType) => {
		setCartItems((prev) => {
			//1. check if the item is already in the cart
			const existingCartItem = prev.find(
				(cartItem) => cartItem._id === menuItem._id
			);

			let updatedCartItem;

			//2. if item is in cart, update the quantity
			if (existingCartItem) {
				updatedCartItem = prev.map((cartItem) =>
					cartItem._id === menuItem._id
						? { ...cartItem, quantity: cartItem.quantity + 1 }
						: cartItem
				);
			} else {
				//3. if item is not in cart, add it as a new item
				updatedCartItem = [
					...prev,
					{
						_id: menuItem._id,
						name: menuItem.name,
						price: menuItem.price,
						quantity: 1,
					},
				];
			}
			sessionStorage.setItem(
				`cartItems-${restaurantId}`,
				JSON.stringify(updatedCartItem)
			);
			return updatedCartItem;
		});
	};

	const removeFromCart = (cartItem: CartItem) => {
		setCartItems((prev) => {
			const updatedCartItems = prev.filter((item) => cartItem._id !== item._id);

			sessionStorage.setItem(
				`cartItems-${restaurantId}`,
				JSON.stringify(updatedCartItems)
			);

			return updatedCartItems;
		});
	};

	const onCheckout = async (userFormData: UserFormData) => {
		// console.log("userFormData", userFormData);

		if(!restaurant) {
			return;
		}

		const checkoutData = {
			cartItems: cartItems.map((cartItem) => ({
			  menuItemId: cartItem._id,
			  name: cartItem.name,
			  quantity: cartItem.quantity.toString(),
			})),
			deliveryDetails: {
			  name: userFormData.name,
			  addressLine1: userFormData.addressLine1,
			  city: userFormData.city,
			  country: userFormData.country,
			  email: userFormData.email as string,
			},
			restaurantId: restaurant._id,
		  };

		  const data = await createCheckoutSession(checkoutData);
		  window.location.href = data.url
	};

	if (isLoading || !restaurant) {
		return "Loading";
	}

	return (
		<div className="flex flex-col gap-10 px-4 sm:px-6 lg:px-8">
			<AspectRatio ratio={16 / 5}>
				<img
					src={restaurant.imageUrl}
					className="rounded-md object-cover h-full w-full"
				/>
			</AspectRatio>
			<div className="grid md:grid-cols-[4fr_2fr] gap-5 md:gap-10">
				<div className="flex flex-col gap-4">
					<RestaurantInfo restaurant={restaurant} />
					<span className="text-2xl font-bold tracking-tight">Menu</span>
					<div className="flex flex-col gap-4">
						{restaurant.menuItems.map((menuItem) => (
							<MenuItem
								menuItem={menuItem}
								addToCart={() => addToCart(menuItem)}
							/>
						))}
					</div>
				</div>

				<div>
					<Card>
						<OrderSummary
							restaurant={restaurant}
							cartItems={cartItems}
							removeFromCart={removeFromCart}
						/>

						<CardFooter>
							<CheckOutBtn
								disabled={cartItems.length === 0}
								onCheckout={onCheckout}
								isLoading= {isCheckoutLoading}
							/>
						</CardFooter>
					</Card>
				</div>
			</div>
		</div>
	);
};

export default SingleRestaurantPage;
