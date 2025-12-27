import { Sequelize } from "sequelize";
import "dotenv/config";
import logger from '../config/logger.js';

const sequelize = new Sequelize(
  process.env.DB_NAME || process.env.database,
  process.env.DB_USER || process.env.user,
  process.env.DB_PASSWORD || process.env.password,
  {
    host: process.env.DB_HOST || process.env.host,
    dialect: "mysql",
    logging: process.env.NODE_ENV === 'production' ? false : logger.debug.bind(logger),
  }
);

export default sequelize;
