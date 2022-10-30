import { UserModel } from "@romalms/database/models/User";
import { UserService } from "../../../services/UserService";

export const userQueryResolver = {
  users: () => UserService.getAllUsers(),
  user: (_: any, args: { userId: number }) =>
    UserService.getUserById(args.userId),
  me: (_a: any, _b: any, ctx: { user: UserModel }) =>
    UserService.getUserById(ctx.user.id),
};
