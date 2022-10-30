import { roleQueryResolver } from "./Role";
import { userQueryResolver, userBaseQueryResolver } from "./User";

export const resolvers: any = {
  Query: {
    // Default query for init
    ...userQueryResolver,
    ...roleQueryResolver,
  },
  Mutation: {
    // Default mutation for init
    _: () => true,
  },
  ...userBaseQueryResolver,
};
