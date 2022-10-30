import dotenv from "dotenv";
import invariant from "invariant";
dotenv.config();

invariant(process.env.POSTGRES_DB, "POSTGRES_DB is required");
invariant(process.env.POSTGRES_USER, "POSTGRES_USER is required");
invariant(process.env.POSTGRES_PASSWORD, "POSTGRES_PASSWORD is required");
invariant(process.env.POSTGRES_PORT, "POSTGRES_PORT is required");
invariant(process.env.POSTGRES_HOST, "POSTGRES_HOST is required");

const DBCONFIG = {
  host: process.env.POSTGRES_HOST,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  port: Number(process.env.POSTGRES_PORT),
  dialect: "postgres",
};

export = DBCONFIG;
