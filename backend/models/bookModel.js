import mongoose from "mongoose"

const bookSchema = mongoose.Schema(
    
    {
        title:{
            type:String,
            required:true,
            unique:[true,"Book already exists."]
        },

        author:{
            type:String,
            required:true
        },

        publishYear:{
            type:Number,
            required:true
        }
    },
    {
        timestamps:true,
    }
)

export const Book = mongoose.model("Books Collection",bookSchema)