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

router.get("/order", jwtCheck, jwtParse, restaurant.getMyRestaurantOrders)

router.post(
	"/",
	jwtCheck,
	jwtParse,
	upload.single("imageFile"),
	validateMyRestaurantRequest,
	restaurant.createRestaurant
);

router.get(
	"/",
	jwtCheck,
	jwtParse,
	restaurant.getRestaurant
);

router.put(
	"/",
	jwtCheck,
	jwtParse,
	upload.single("imageFile"),
	validateMyRestaurantRequest,
	restaurant.updateRestaurant
);

router.patch("/order/:orderId/status", jwtCheck, jwtParse, restaurant.updateOrderStatus)

export default router;
