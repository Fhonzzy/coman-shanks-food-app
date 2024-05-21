import mongoose, {Document, Schema, Model} from "mongoose";

interface IUser extends Document {
    auth0Id: string;
    email: string;
    name?: string;
    addressLine1?: string;
    city?: string;
    country?: string;
}

const UserSchema: Schema<IUser> = new Schema(
	{
		auth0Id: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		name: {
			type: String,
		},
		addressLine1: {
			type: String,
		},
		city: {
			type: String,
		},
		country: {
			type: String,
		},
	},
	{ timestamps: true }
);

const User: Model<IUser> = mongoose.model("User", UserSchema)
export default User;