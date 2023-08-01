import { Router } from 'express'
import { authUser, registerUser } from '../controller/userControllers.js'

const rout = Router()


rout.route('/register').post(registerUser)
rout.route('/login').post(authUser)



export default rout