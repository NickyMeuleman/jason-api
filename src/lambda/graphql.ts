import { Handler } from "aws-lambda";
import { ApolloServer, gql } from "apollo-server-lambda";

const typeDefs = gql`
  type Query {
    hello: String
    allAuthors: [Author!]
    author(id: Int!): Author
    authorByName(name: String!): Author
  }
  type Author {
    id: ID!
    name: String!
    married: Boolean!
  }
`;

interface Author {
  id: number;
  name: string;
  married: boolean;
}

const authors: Author[] = [
  { id: 1, name: "Terry Pratchett", married: false },
  { id: 2, name: "Stephen King", married: true },
  { id: 3, name: "JK Rowling", married: false }
];

const resolvers = {
  Query: {
    hello: (root, args, context) => {
      return "Hello, world!";
    },
    allAuthors: (root, args, context) => {
      return context.db;
    },
    author: (root, args, context) => {
      return;
    },
    authorByName: (root, args, context) => {
      console.log("hihhihi", args.name);
      return authors.find(x => x.name === args.name) || "NOTFOUND";
    }
  }
};

interface MyContext {
  db: Author[];
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }): MyContext => ({
    db: authors
  }),
  playground: true,
  introspection: true
});

const handler = server.createHandler();

export { handler };
