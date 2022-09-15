import dotenv from 'dotenv';
import invariant from 'invariant';

dotenv.config();

invariant(process.env.POSTGRES_DB, 'POSTGRES_DB is required');
invariant(process.env.POSTGRES_USER, 'POSTGRES_USER is required');
invariant(process.env.POSTGRES_PASSWORD, 'POSTGRES_PASSWORD is required');
invariant(process.env.POSTGRES_PORT, 'POSTGRES_PORT is required');

export const CONFIG = {
  PORT: process.env.PORT || 4000,
  DBNAME: process.env.POSTGRES_DB,
  DBUSER: process.env.POSTGRES_USER,
  DBPASS: process.env.POSTGRES_PASSWORD,
  DBPORT: Number(process.env.POSTGRES_PORT),
  DBHOST: process.env.NODE_ENV === 'production' ? 'db' : 'localhost',
};
