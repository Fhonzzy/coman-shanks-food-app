import { Request, Response, NextFunction } from "express";
import Restaurant from "../Models/Restaurant";
import cloudinary from "cloudinary";
import mongoose from "mongoose";

const createRestaurant = async (req: Request, res: Response) => {
	try {
		const existingRestaurant = await Restaurant.findOne({ user: req.userId });

		if (existingRestaurant) {
			return res.status(409).json({ msg: "User Restaurant already Exists" });
		}

		// Retrieve the uploaded file from the request object and cast it to the type Express.Multer.File
		const image = req.file as Express.Multer.File;
		if (!image) {
            return res.status(400).json({ msg: "Image file is required" });
        }

		// Convert the binary data of the image to a Base64-encoded string
		const base64Image = Buffer.from(image.buffer).toString("base64");
		// Create a data URI using the image's MIME type and the Base64-encoded string
		const dataURI = `data:${image.mimetype};base64,${base64Image}`;

		const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);

		const restaurant = new Restaurant(req.body);

		restaurant.imageUrl = uploadResponse.url;
		restaurant.user = new mongoose.Types.ObjectId(req.userId);
		restaurant.lastUpdated = new Date();

		await restaurant.save();

		res.status(201).json({ restaurant });
	} catch (error) {
		console.log(error);
		res.status(500).json({ msg: "An Error Occurred" });
	}
};

const getRestaurant = async (req: Request, res: Response) => {
	try {
		const restaurant = await Restaurant.findOne({user: req.userId})

		if(!restaurant) {
			return res.status(404).json({msg: "Restaurant Doesn't Exist"})
		}

		res.status(200).json(restaurant)
	} catch (error) {
		console.log(error);
		res.status(500).json({msg: "Something went wrong!"})
	}
}

export default {
	createRestaurant,
	getRestaurant
};
