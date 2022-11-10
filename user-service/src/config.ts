import "dotenv/config";
import { Sequelize } from "sequelize";
import { Secret } from "jsonwebtoken";

export const DEV_ENV = process.env.NODE_ENV;

export const access_token_secret = process.env.ACCESS_TOKEN_SECRET as Secret;

export const allowed_origins =
  process.env.ALLOWED_ORIGINS || "http://localhost:3000";
export const port = process.env.API_PORT || 8000;
export const db_host = process.env.DB_HOST || "userservicedb";
export const db_port = process.env.DB_PORT || 5433;
export const db_name = process.env.DB_NAME || "postgres";
export const db_user = process.env.DB_USER || "postgres";
export const db_password = process.env.DB_PASSWORD || "postgres";
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
