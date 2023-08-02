import { Router } from 'express'
import { authUser, registerUser, allUsers } from '../controller/userControllers.js'
import { protect } from '../middleware/authMiddleware.js'
const rout = Router()


rout.route('/register').post(registerUser)
rout.route('/login').post(authUser)
rout.route("/").get(protect, allUsers)


export default rout