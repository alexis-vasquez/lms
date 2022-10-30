import { Privilege, Role } from "@romalms/database/models";

export class RoleService {
  static getRoleById(id: number) {
    return Role.findByPk(id);
  }

  static getPrivilegesByRoleId(roleId: number) {
    return Role.findByPk(roleId, {
      include: [
        {
          model: Privilege,
          attributes: ["name"],
        },
      ],
    });
  }
}
