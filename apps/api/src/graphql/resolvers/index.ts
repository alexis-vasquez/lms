import { roleQueryResolver } from "./Role";
import {
  userMutationResolver,
  userQueryResolver,
  userBaseQueryResolver,
} from "./User";

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
