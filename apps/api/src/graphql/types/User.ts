import {
  GraphQLID,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { RoleService } from "../../services/RoleService";
import { validatePrivileges } from "../../utils/validation";

export const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    firstName: { type: new GraphQLNonNull(GraphQLString) },
    lastName: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (user, _, ctx) => {
        validatePrivileges("READ_USER_PASSWORD", ctx.user.privileges);
        return user.password;
      },
    },
    role: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (user) =>
        RoleService.getRoleById(user.roleId).then((role) => role?.name),
    },
  }),
});
