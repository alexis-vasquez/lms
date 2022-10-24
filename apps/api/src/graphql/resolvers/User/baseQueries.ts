import { Role } from "../../../database/models";
import { UserModel } from "../../../database/models/User";

export const userBaseQueryResolver: any = {
  User: {
    role: (user: UserModel) => Role.findByPk(user.roleId),
  },
};
