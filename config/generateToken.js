import jwt from 'jsonwebtoken'

const generateToken = (action) => {
    return jwt.sign(action, process.env.JWT_SECRET, {
        expiresIn: "30d"
    })
}
export { generateToken }