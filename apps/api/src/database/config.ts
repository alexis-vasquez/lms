import { Options } from "sequelize";
import { CONFIG } from "../config";

const DBCONFIG: Options = {
  username: CONFIG.DBUSER,
  password: CONFIG.DBPASS,
  database: CONFIG.DBNAME,
  port: Number(CONFIG.DBPORT),
  dialect: "postgres",
};

export = DBCONFIG;
