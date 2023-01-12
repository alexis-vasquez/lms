import { RoleService } from "../../../services/RoleService";

export const roleQueryResolver = {
  role: (_: any, args: { roleId: number }) =>
    RoleService.getRoleById(args.roleId),
};
