import express from "express"
import mongoose from "mongoose"
import * as dotenv from 'dotenv'
import {router} from './routes/game'
import cors from 'cors'
dotenv.config()


mongoose.set("strictQuery", false)

const PORT = 5000

const app = express()
export const routes = express.Router();
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(router)


const host: string = process.env.DB_CONNECTION || ''
const dbUpdate = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}
const db =  mongoose.connect(host).then(() => {
  console.log("connected to mongoDB...")
  console.log(`listening on port ${PORT}`)
  app.listen(PORT)
})