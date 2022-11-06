import { UserModel } from "@romalms/database/models/User";
import { UserService } from "../../../services/UserService";

export const userQueryResolver = {
  users: () => UserService.getAllUsers(),
  user: (_: void, args: { userId: number }) =>
    UserService.getUserById(args.userId),
  me: (_a: void, _b: void, ctx: { user: UserModel }) =>
    UserService.getUserById(ctx.user.id),
};
