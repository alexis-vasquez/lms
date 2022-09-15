import { Sequelize } from 'sequelize';
import { CONFIG } from '~/config';

export const sequelize = new Sequelize(
  CONFIG.DBNAME,
  CONFIG.DBUSER,
  CONFIG.DBPASS,
  {
    host: CONFIG.DBHOST,
    dialect: 'postgres',
    port: CONFIG.DBPORT,
  }
);
