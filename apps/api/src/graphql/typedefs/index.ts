import { commonTypeDef } from "./common";
import { privilegesTypeDef } from "./privileges";
import { roleTypeDef } from "./role";
import { userTypeDef } from "./user";

const baseTypeDefs = `#graphql
  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }
`;

export const typeDefs = [
  baseTypeDefs,
  commonTypeDef,
  userTypeDef,
  roleTypeDef,
  privilegesTypeDef,
];
