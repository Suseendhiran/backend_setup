import {
  GraphQLFloat,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';
import Authors from './Models/AuthorModel.js';
import Books from './Models/BookModel.js';
import { BookType } from './GraphQlSchemas/BooksSchema.js';
import { AuthorType } from './GraphQlSchemas/AuthorSchema.js';

// const BookType = new GraphQLObjectType({
//   name: 'Books',
//   fields: () => ({
//     id: {
//       type: GraphQLID,
//     },
//     _id:{
//       type: GraphQLString
//     },
//     name: {
//       type: GraphQLString,
//     },
//     pages: {
//       type: GraphQLInt,
//     },
//     rating: {
//       type: GraphQLFloat,
//     },
//     authorId: {
//       type: GraphQLString,
//     },
//     author: {
//       type: AuthorType,
//       resolve: async (book) => await Authors.findById(book.authorId)
//     },
//   }),
// });

// const AuthorType = new GraphQLObjectType({
//   name: 'Authors',
//   fields: () => ({
//     id: {
//       type: GraphQLID,
//     },
//     _id:{
//         type: GraphQLString
//     },
//     name: {
//       type: GraphQLNonNull(GraphQLString), // if name is null for any documents, will add as the error Cannot return null for non-nullable field Authors.name.
//                                            // but will not throw server error.
//     },
//     age: {
//       type: GraphQLInt,
//     },
//     state: {
//       type: GraphQLString,
//     },
//     books: {
//       type: new GraphQLList(BookType),
//       resolve: async (author) => await Books.find({ authorId: author._id })
//     },
//   }),
// });

const RootQuery = new GraphQLObjectType({
  name: 'LibraryQuery',
  fields: {
    authors: {
      type: new GraphQLList(AuthorType),
      resolve: () => Authors.find(),
    },
    books: {
      type: new GraphQLList(BookType),
      resolve: () => Books.find(),
    },
    author:{
        type: AuthorType,
        args:{
            id:{
                type: GraphQLString
            }
        },
        resolve: (parent, args) => Authors.findById(args.id)
    },
    book:{
        type: BookType,
        args:{
            id:{
                type: GraphQLString
            }
        },
        resolve: (parent, args) => Books.findById(args.id)
    }
  },
});

const RootMutation = new GraphQLObjectType({
  name: 'LibraryMutation',
  fields: {
    addBook: {
      type: BookType,
      args: {
        name: {
          type: GraphQLNonNull(GraphQLString),
        },
        rating: {
          type: GraphQLNonNull(GraphQLInt),
        },
        pages: {
          type: GraphQLNonNull(GraphQLInt),
        },
      },
      resolve: async (parent, args) => {
        const res = await Books.create({
          name: args.name,
          rating: args.rating,
          pages: args.pages,
        });
        console.log("Addbookres",res)
        return res;
      },
    },
    addAuthor: {
      type: AuthorType,
      args: {
        name: {
          type: GraphQLNonNull(GraphQLString),
        },
        age: {
          type: GraphQLNonNull(GraphQLInt),
        },
        state: {
          type: GraphQLNonNull(GraphQLString),
        },
      },
      resolve: async (parent, args) => {
        const res = await Authors.create({
          name: args.name,
          age: args.age,
          state: args.state,
        });
        console.log("AddAuthorres",res)
        return res;
      },
    },
  },
});

export const rootSchema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation
});
