import express from "express"
import { jwtCheck, jwtParse } from "../Middlewares/auth"
import Order from "../Controllers/Order"

const router = express.Router()

router.post('/checkout/create-checkout-session', jwtCheck, jwtParse, Order.createCheckoutSession)
router.post('/checkout/webhook', Order.stripeWebhookHandler);
router.get('/', jwtCheck, jwtParse, Order.getMyOrders)
export default router