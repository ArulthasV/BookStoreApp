import express from "express"
import booksRoute from './routes/booksRoute.js'
import cors from "cors"
import mongoose from "mongoose"
import env from "dotenv"

env.config({
    path:".env"
})
const app = express()

app.use(express.json())

//Middleware for CORS policy
app.use(cors())

app.use('/books',booksRoute)

app.get('/',(req,res)=>{
    //console.log(req)
    return res.status(234).send("Welcome to the mern tutotial!")
})


mongoose
    .connect(process.env.MONGODB_URL)
    .then(()=>{
        app.listen(5555,()=>{
            console.log("App is listening to port 5555")
        })
        console.log("App is connected to database.")
    })
    .catch((err)=>{
        console.log(err.message)
    })