import { ApolloServer } from "@apollo/server";
import { resolvers } from "./graphql/resolvers";
import { typeDefs } from "./graphql/typedefs";

export const graphQlServer = new ApolloServer({
  typeDefs,
  resolvers,
});
