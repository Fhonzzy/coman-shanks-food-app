import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import connectDb from "./db/connectDb";
const PORT = process.env.PORT || 8000;
import userRoute from './Routes/user'

const app = express();
const MONGO_URL = process.env.MONGO_URL || ""

app.use(express.json());
app.use(cors());

app.use("/api/v1/my/user", userRoute)

const startServer = async () => {
	try {
		await connectDb(MONGO_URL)
		app.listen(PORT, () => {
			console.log(`Server is listening on port ${PORT}`);
		});
	} catch (error) {
		console.log("Failed to Start Server: ", error);
	}
}

startServer()

