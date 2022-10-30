import { ApolloServer } from "@apollo/server";
import { typeDefs } from "./graphql/typedefs";
import { resolvers } from "./graphql/resolvers";

export const graphQlServer = new ApolloServer({
  // schema,
  typeDefs,
  resolvers,
});
