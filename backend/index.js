import express from "express"
import {port,mongodbURL} from "./config.js"
import mongoose from "mongoose"
import {Book} from './models/bookModel.js'
import booksRoute from './routes/booksRoute.js'
import cors from "cors"

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
    .connect(mongodbURL)
    .then(()=>{
        app.listen(port,()=>{
            console.log(`App is listening to port : ${port}`)
        })
        console.log("App is connected to database.")
    })
    .catch((err)=>{
        console.log(err.message)
    })