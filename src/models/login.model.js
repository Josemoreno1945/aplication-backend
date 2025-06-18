import { pool } from "../db.js";

export const getUbyusername = async (user_name) => {
  const query = "SELECT * FROM users WHERE user_name=$1";
  const result = await pool.query(query, [user_name]);
  return result.rows;
};
