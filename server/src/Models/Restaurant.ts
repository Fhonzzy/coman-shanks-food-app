import mongoose, { InferSchemaType } from "mongoose";

const MenuItemSchema = new mongoose.Schema({
	_id: {
		type: mongoose.Schema.ObjectId,
		required: true,
		default: () => new mongoose.Types.ObjectId()
	},
	name: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
});


const RestaurantSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	restaurantName: {
		type: String,
		required: true,
	},
	city: {
		type: String,
		required: true,
	},
	country: {
		type: String,
		required: true,
	},
	deliveryPrice: {
		type: Number,
		required: true,
	},
	estimatedDeliveryTime: {
		type: Number,
		required: true,
	},
	cuisines: [
		{
			type: String,
			required: true,
		},
	],
	menuItems: [
		MenuItemSchema
    ],
	imageUrl: {
		type: String,
		required: true,
	},
	lastUpdated: {
		type: Date,
		required: true,
	},
});

export type MenuItemType = InferSchemaType<typeof MenuItemSchema>

const Restaurant = mongoose.model("Restaurant", RestaurantSchema)
export default Restaurant