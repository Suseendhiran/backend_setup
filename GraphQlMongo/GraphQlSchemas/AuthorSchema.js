
import {
  GraphQLID,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList
} from 'graphql';
import { BookType } from './BooksSchema.js';
import Books from '../Models/BookModel.js';

export const AuthorType = new GraphQLObjectType({
  name: 'Authors',
  fields: () => ({
    id: {
      type: GraphQLID,
    },
    _id:{
        type: GraphQLString
    },
    name: {
      type: GraphQLNonNull(GraphQLString), // if name is null for any documents, will add as the error Cannot return null for non-nullable field Authors.name.
                                           // but will not throw server error.
    },
    age: {
      type: GraphQLInt,
    },
    state: {
      type: GraphQLString,
    },
    books: {
      type: new GraphQLList(BookType),
      resolve: async (author) => await Books.find({ authorId: author._id })
    },
  }),
});