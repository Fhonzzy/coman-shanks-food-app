import express from "express";
import { param } from "express-validator";
import restaurantActions from "../Controllers/restaurantActions";

const router = express.Router();

router.get(
	"/search/:city",
	param("city")
		.isString()
		.trim()
		.notEmpty()
		.withMessage("City must be a valid string"),
        restaurantActions.searchRestaurant
);

export default router;