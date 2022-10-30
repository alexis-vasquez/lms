import { Role } from "@romalms/database/models";
import { UserModel } from "@romalms/database/models/User";

export const userBaseQueryResolver: any = {
  User: {
    role: (user: UserModel) => Role.findByPk(user.roleId),
  },
};
