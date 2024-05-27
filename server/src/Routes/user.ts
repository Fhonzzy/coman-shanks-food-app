import express from "express"
import user from "../Controllers/user"
import { jwtCheck, jwtParse } from "../Middlewares/auth"
import { validateMyUserRequest } from "../Middlewares/validation"

const router = express.Router()

router.post("/", jwtCheck, user.createCurrentUser)
router.put('/', jwtCheck, jwtParse, validateMyUserRequest, user.updateCurrentUser)
router.get('/', jwtCheck, jwtParse, user.getCurrentUser)

export default router;