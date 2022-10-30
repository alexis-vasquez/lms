import { Sequelize } from "sequelize";
import { Role, User } from "../database/models";

export class UserService {
  static getAllUsers() {
    return User.findAll({});
  }
  static getUserWithRoleByEmail(email: string) {
    return User.findOne({
      where: { email },
      include: [{ model: Role, attributes: [] }],
      attributes: [
        "id",
        "email",
        "firstName",
        "password",
        "lastName",
        [Sequelize.col('"Role"."name"'), "role"],
      ],
      raw: true,
    });
  }

  static createNewUser(user: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    roleId: number;
  }) {
    return User.create(user);
  }
}
