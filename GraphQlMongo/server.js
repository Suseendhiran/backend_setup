import express from 'express';
import mongoose from 'mongoose';
import { graphqlHTTP } from 'express-graphql';
import { GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql';
import { rootSchema } from './schema.js';
import Books from "./Models/BookModel.js"
import Authors from "./Models/AuthorModel.js"

const app = express();
const uri =
  'mongodb+srv://learning:IndiumSql!135@cluster0.dpkff5i.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose
  .connect(uri, {
    dbName: 'library',
  })
  .then(async () => {
    console.log('MongoDB library database connected');
    // const book = await Books.find({ name:'Shadows of Mumbai' });
    // console.log("initbooks",book)
  });

// const schema = new GraphQLSchema({
//     query: new GraphQLObjectType({
//         name:"test",
//         fields: () => ({
//             message:{
//                 type: GraphQLString,
//                 resolve: () => "Query first"
//             }
//         })
//     })
// })
app.use(
  '/graphql',
  graphqlHTTP({
    graphiql: true,
    schema: rootSchema,
  })
);

app.listen('3003', () => {
  console.log('App started in the port 3003');
});

const updateData = async() => {
    const authors = await Authors.find();
    const books = await Books.find().lean()
    console.log("books",books)
    
    const updatedBooks = books.map(book => {
        const author = authors.find(author => author.id === book.authorId)?._id
        return {
            ...book,
            authorId: author
        }
    })
    updatedBooks.forEach(async book => {
        await Books.updateOne({_id: book._id},{$set:{authorId:book.authorId}})
    })
    console.log(updatedBooks,"ss")
}

//updateData()
