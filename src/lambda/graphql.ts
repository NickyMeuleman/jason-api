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

// on yarn build:lambda

// WARNING in /home/nicky/projects/jason-api/node_modules/subscriptions-transport-ws/node_modules/ws/lib/buffer-util.js
// Module not found: Error: Can't resolve 'bufferutil' in '/home/nicky/projects/jason-api/node_modules/subscriptions-transport-ws/node_modules/ws/lib'
// WARNING in /home/nicky/projects/jason-api/node_modules/subscriptions-transport-ws/node_modules/ws/lib/validation.js
// Module not found: Error: Can't resolve 'utf-8-validate' in '/home/nicky/projects/jason-api/node_modules/subscriptions-transport-ws/node_modules/ws/lib'

// despite those errors, ./netlify/functions/graphql still works
