import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import Connect_DB from './config/db.js';

dotenv.config()
Connect_DB()
const app = express()
const PORT = process.env.PORT

app.use(cors)
app.use(express.json())




app.listen(PORT, () => {
    console.log('Server is running http://localhost:' + PORT);
})