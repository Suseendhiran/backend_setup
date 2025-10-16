import {
  GraphQLFloat,
  GraphQLID,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { AuthorType } from './AuthorSchema.js';
import Authors from '../Models/AuthorModel.js';

export const BookType = new GraphQLObjectType({
  name: 'Books',
  fields: () => ({
    id: {
      type: GraphQLID,
    },
    _id:{
      type: GraphQLString
    },
    name: {
      type: GraphQLString,
    },
    pages: {
      type: GraphQLInt,
    },
    rating: {
      type: GraphQLFloat,
    },
    authorId: {
      type: GraphQLString,
    },
    author: {
      type: AuthorType,
      resolve: async (book) => await Authors.findById(book.authorId)
    },
  }),
});