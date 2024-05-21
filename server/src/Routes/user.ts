import express from "express"
import user from "../Controllers/user"
import { jwtCheck } from "../Middlewares/auth"

const router = express.Router()

router.post("/", jwtCheck, user.createCurrentUser)

export default router