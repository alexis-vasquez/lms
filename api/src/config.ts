import dotenv from 'dotenv';
import invariant from 'invariant';

dotenv.config();

invariant(process.env.POSTGRES_DB, 'POSTGRES_DB is required');
invariant(process.env.POSTGRES_USER, 'POSTGRES_USER is required');
invariant(process.env.POSTGRES_PASSWORD, 'POSTGRES_PASSWORD is required');
invariant(process.env.POSTGRES_PORT, 'POSTGRES_PORT is required');

invariant(process.env.JWT_SECRET, 'JWT_SECRET is required');

export const CONFIG = {
  // API
  PORT: process.env.PORT || 4000,

  // Config
  JWT_SECRET: process.env.JWT_SECRET,

  // Database
  DBNAME: process.env.POSTGRES_DB,
  DBUSER: process.env.POSTGRES_USER,
  DBPASS: process.env.POSTGRES_PASSWORD,
  DBPORT: Number(process.env.POSTGRES_PORT),
  DBHOST: process.env.NODE_ENV === 'production' ? 'db' : 'localhost',
};
