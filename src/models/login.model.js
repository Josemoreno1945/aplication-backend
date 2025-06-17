import { pool } from "../db.js";

export const getUbyEmail = async (email) => {
  const query = "SELECT * FROM users WHERE email=$1";
  const result = await pool.query(query, [email]);
  return result.rows;
};
