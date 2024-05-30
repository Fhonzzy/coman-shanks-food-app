import express from "express";
import multer from "multer";
import restaurant from "../Controllers/restaurant";
import { jwtCheck, jwtParse } from "../Middlewares/auth";
import { validateMyRestaurantRequest } from "../Middlewares/validation";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
	storage: storage,
	limits: {
		fileSize: 5 * 1024 * 1024,
	},
});

router.post(
	"/",
	validateMyRestaurantRequest,
	jwtCheck,
	jwtParse,
	upload.single("imageFile"),
	restaurant.createRestaurant
);

export default router;
