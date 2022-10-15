import { createPool } from "mysql2/promise";
import { DB_PORT, DB_USER, DB_HOST, DB_PASS, DB_NAME } from "./config.js";

const connectionDB = {
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASS,
  port: DB_PORT,
  database: DB_NAME,
};
export const pool = createPool(connectionDB);
