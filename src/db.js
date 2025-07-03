import pg from "pg";
import app from "./app.js";
import { pool } from "./db.js";
import {
  DB_DATABASE,
  DB_HOST,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,
  DATABASE_URL,
} from "./config.js";
const { Pool } = pg;

/*
const pool = new Pool({
    user:DB_USER,
    host:DB_HOST,
    database:DB_DATABASE,
    password:DB_PASSWORD,
    port:DB_PORT

})
*/

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

app.get("/", (req, res) => {
  res.send("¡Bienvenido a la API Backend!");
});

app.get("/ping", async (req, res) => {
  const result = await pool.query("SELECT NOW()");
  return res.json(result.rows[0]);
});

export { pool };
