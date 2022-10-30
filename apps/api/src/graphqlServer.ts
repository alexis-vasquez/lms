import { ApolloServer } from "@apollo/server";
import { GraphQLSchema } from "graphql";
import { query } from "./graphql/types";

const schema = new GraphQLSchema({
  query: query,
});

export const graphQlServer = new ApolloServer({
  schema,
});
