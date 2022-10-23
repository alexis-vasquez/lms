import { userMutationResolver, userQueryResolver } from "./User";

export const resolvers = {
  Query: {
    // Default query for init
    _: () => true,
    ...userQueryResolver,
  },
  Mutation: {
    // Default mutation for init
    _: () => true,
    ...userMutationResolver,
  },
};
