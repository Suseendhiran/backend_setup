import mongoose from "mongoose";
import Author from "./AuthorModel.js";

const schema = new mongoose.Schema({
    // _id:{
    //     type: mongoose.SchemaTypes.ObjectId
    // },
    name:{
        type: String,
        required: true
    },
    pages:{
        type: Number,
        required: true,
        min: 100
    },
    rating:{
        type: Number,
        required: true,
        min: 0
    },
    authorId:{
        type: mongoose.SchemaTypes.ObjectId,
        ref:"Author"
    }
})

const Books = new mongoose.model("Book", schema);

export default Books