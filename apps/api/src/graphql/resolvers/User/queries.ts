import { Sequelize } from "sequelize";
import { Role, User } from "../../../database/models";

export const userQueryResolver = {
  users: () => User.findAll({}),
};
