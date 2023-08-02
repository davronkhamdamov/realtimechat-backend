import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import Connect_DB from './config/db.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js'
dotenv.config()
Connect_DB()
const app = express()
const PORT = process.env.PORT
import userRoutes from './router/userRoutes.js'
import chatRoutes from './router/chatRoutes.js'


app.use(cors())
app.use(express.json())


app.use('/api/user', userRoutes)
app.use('/api/chat', chatRoutes)

app.use(notFound)
app.use(errorHandler)


app.listen(PORT, () => {
    console.log('Server is running http://localhost:' + PORT);
})