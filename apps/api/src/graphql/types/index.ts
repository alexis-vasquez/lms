import { GraphQLList, GraphQLObjectType } from "graphql";
import { UserService } from "../../services/UserService";
import { UserType } from "./User";

export const query = new GraphQLObjectType({
  name: "Query",
  description: "Root query",
  fields: {
    users: {
      type: new GraphQLList(UserType),
      resolve: () => UserService.getAllUsers(),
    },
  },
});
