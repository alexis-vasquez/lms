import { Sequelize } from "sequelize";
import DBCONFIG from "./config";
export * as models from "./models";

export const sequelize = new Sequelize(
  DBCONFIG.database,
  DBCONFIG.username,
  DBCONFIG.password,
  {
    host: DBCONFIG.host,
    dialect: "postgres",
    port: DBCONFIG.port,
    logging: false,
  }
);
