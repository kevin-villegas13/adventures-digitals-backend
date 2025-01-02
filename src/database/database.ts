import { DataSource } from "typeorm";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE } = process.env;

export const AppDataSource = new DataSource({
  type: "mysql",
  host: DB_HOST,
  port: DB_PORT ? parseInt(DB_PORT) : 3306,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  entities: [path.join(__dirname, "../entities/**/*.ts")],
  synchronize: true,
  logging: true,
});
