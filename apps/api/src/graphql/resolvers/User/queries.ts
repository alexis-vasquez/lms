import { UserService } from "../../../services/UserService";

export const userQueryResolver = {
  users: () => UserService.getAllUsers(),
  user: (_: any, args: { userId: number }) =>
    UserService.getUserById(args.userId),
};
