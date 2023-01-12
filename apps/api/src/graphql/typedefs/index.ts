import { commonTypeDef } from "./common";
import { courseTypeDef } from "./course";
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
  courseTypeDef,
  roleTypeDef,
  privilegesTypeDef,
  courseTypeDef,
];
