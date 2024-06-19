import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import connectDb from "./db/connectDb";
const PORT = process.env.PORT || 8000;
import userRoute from "./Routes/user";
import restaurantRoute from "./Routes/restaurant";
import restaurantHandlerRoute from "./Routes/restaurantHandlers";
import { v2 as cloudinary } from "cloudinary";
import { corsOptions } from "./Config/corsConfig";

const app = express();
const MONGO_URL = process.env.MONGO_URL || "";

//Middleware
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" })); // Increase payload limit
app.use(cors({
    origin: corsOptions
}));

//Cloudinary SDK Config
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

//Health check api for my hosted API
app.get("/status", async (req: Request, res: Response, next: NextFunction) => {
	res.send({ msg: "OK!" });
});

//Routes
app.use("/api/v1/my/user", userRoute);
app.use("/api/v1/my/restaurant", restaurantRoute);
app.use("/api/v1/restaurant", restaurantHandlerRoute);

//Starts the Server
const startServer = async () => {
	try {
		await connectDb(MONGO_URL);
		app.listen(PORT, () => {
			console.log(`Server is listening on port ${PORT}`);
		});
	} catch (error) {
		console.log("Failed to Start Server: ", error);
	}
};

startServer();
