import { PrivilegeModel } from "@romalms/database/models/Privilege";
import { UserModel } from "@romalms/database/models/User";
import { RoleService } from "../../../services/RoleService";

export const userBaseQueryResolver = {
  User: {
    role: (user: UserModel) => RoleService.getRoleById(user.roleId),
    privileges: (user: UserModel) =>
      RoleService.getPrivilegesByRoleId(user.roleId).then((role: any) =>
        role?.Privileges.map((privilege: PrivilegeModel) => privilege)
      ),
  },
};
