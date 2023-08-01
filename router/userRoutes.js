import { Router } from 'express'
import { registerUser } from '../controller/userControllers.js'

const rout = Router()


rout.route('/login').post(registerUser)



export default rout