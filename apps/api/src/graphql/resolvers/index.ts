import { Role } from "../../database/models";
import { UserModel } from "../../database/models/User";
import { roleQueryResolver } from "./Role";
import { userMutationResolver, userQueryResolver } from "./User";
import { userBaseQueryResolver } from "./User/baseQueries";

export const resolvers: any = {
  Query: {
    // Default query for init
    _: () => true,
    ...userQueryResolver,
    ...roleQueryResolver,
  },
  Mutation: {
    // Default mutation for init
    _: () => true,
    ...userMutationResolver,
  },
  ...userBaseQueryResolver,
};
