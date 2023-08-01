import asyncHandler from 'express-async-handler'
import User from '../models/UserModel.js'
import { generateToken } from '../config/generateToken.js'

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, pic } = req.body
    if (!name, !email, !password) {
        res.status(400)
        throw new Error('Please enter all the Fields')
    }
    const userExists = await User.findOne({ email })
    if (userExists) {
        res.status(400)
        throw new Error("User already exists")
    }
    const user = await User.create({
        name, email, password, pic
    })
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken({ id: user._id })
        })
    } else {
        res.status(400)
        throw new Error('Failed to Create the User')
    }
})
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken({ id: user._id })
        })
    } else {
        res.status(400)
        throw new Error("Invalid Password or Email")
    }
})

export { registerUser, authUser }