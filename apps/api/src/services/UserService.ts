import { Sequelize } from "sequelize";
import { Privilege, Role, User } from "@romalms/database/models";

export class UserService {
  static getAllUsers() {
    return User.findAll({});
  }

  static getUserByEmail(email: string) {
    return User.findOne({
      where: {
        email,
      },
      raw: true,
    });
  }

  static getUserById(id: number) {
    return User.findByPk(id);
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
