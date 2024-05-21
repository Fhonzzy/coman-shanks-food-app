import express from "express"
import user from "../Controllers/user"

const router = express.Router()

router.post("/", user.createCurrentUser)

export default router