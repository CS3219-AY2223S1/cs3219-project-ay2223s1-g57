import "dotenv/config";
import { Sequelize } from "sequelize";
import { Secret } from "jsonwebtoken";

export const DEV_ENV = process.env.NODE_ENV;

export const access_token_secret = process.env.ACCESS_TOKEN_SECRET as Secret;

export const port = Number(process.env.API_PORT);
export const db_host = String(process.env.DB_HOST);
export const db_port = Number(process.env.DB_PORT);
export const db_name = String(process.env.DB_NAME);
export const db_user = String(process.env.DB_USER);
export const db_password = String(process.env.DB_PASSWORD);
export const db_dialect = "postgres";

export const sequelizeConnection = new Sequelize(
  db_name,
  db_user,
  db_password,
  {
    host: db_host,
    dialect: db_dialect,
  },
);
