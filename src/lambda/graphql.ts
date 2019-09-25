import { ApolloServer } from "apollo-server-lambda";
import { resolvers } from "../resolvers";
import { faunaContext, IFaunaContext } from "../db";
import typeDefs from "../schema.graphql";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: (): IFaunaContext => ({
    client: faunaContext.client,
    q: faunaContext.q
  }),
  playground: true,
  introspection: true
});

const handler = server.createHandler();

export { handler };
