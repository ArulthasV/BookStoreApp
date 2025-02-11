import express from "express"
import {Book} from "../models/bookModel.js"

const router = express.Router()

//route to create a book
router.post('/',async (req,res)=>{
    try{
        if(
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ){
            return res.status(400).send({
                message:'send all required fields : title,author,publishYear'
            })
        }

        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear
        }
        const book = await Book.create(newBook)
        return res.status(201).send(book)

    }catch(err){
        console.log(err.message)
        res.status(500).send({message:err.message})
    }
})

//route to return all books
router.get('/',async (req,res)=>{
    try{
        const books = await Book.find({})
        return res.status(201).send({count:books.length,data:books})
        //return res.status(201).json(books)

    }catch(err){
        console.log(err.message)
        res.status(500).send({message:err.message})
    }
})

//get method to return one book with id
router.get('/:id',async (req,res)=>{
    try{
        console.log(req.params)
        const {id} = req.params
        const books = await Book.findById(id)
        return res.status(201).send(books)
        //return res.status(201).json(books)

    }catch(err){
        console.log(err.message)
        res.status(500).send({message:err.message})
    }
})

//route to update one book with id
router.put('/:id',async (req,res)=>{
    try{
        if(
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ){
            return res.status(400).send({
                message:'send all required fields : title,author,publishYear'
            })
        }

    const {id} = req.params 
    const result = await Book.findByIdAndUpdate(id,req.body)  
    
    if(!result){
        return res.status(404).send({message:"The book is not found!"})
    }

    return res.status(200).send({message:"The book is updated successfully!"})

    }catch(err){
        console.log(err.message)
        res.status(500).send({message:err.message})
    }

})

//route to delete a book with id
router.delete('/:id',async (req,res)=>{
    try{
        const {id} = req.params
        const result = await Book.findByIdAndDelete(id)
        if(!result){
            return res.status(404).send({message:"The book is not found!"})
        }

        return res.status(200).send({message:"The book is deleted successfully!"})
        // return res.status(200).send({message:"The book is deleted successfully!"})
        // return res.status(200).send({message:"The book is deleted successfully!"})
        // return res.status(200).send({message:"The book is deleted successfully!"})
        // return res.status(200).send({message:"The book is deleted successfully!"})

    }catch(err){
        console.log(err.message)
        res.status(500).send({message:err.message})
    }
})

export default router