import { GraphQLID, GraphQLObjectType } from "graphql";
import mongoose from "mongoose";

const schema = new mongoose.Schema({
    id:{
        type: Number
    },
    name:{
        type: String,
        required: true
    },
    age:{
        type: Number,
        required: true,
        min:10
    },
    state:{
        type: String,
        required: true
    },
    books:{
        type: Array,
        //ref:"Book"
    }
})

const Author = new mongoose.model("Author", schema)

export default Author