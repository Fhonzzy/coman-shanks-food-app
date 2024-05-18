import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
const PORT = 5000;
import mongoose from "mongoose";

const app = express();
mongoose
	.connect(process.env.MONGO_URL as string)
	.then(() => console.log("Database is connected"));
app.use(express.json());
app.use(cors());

app.get("/test", (req: Request, res: Response) => {
	res.json({ msg: "hello" });
});

app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`);
});
