import { pool } from "../db.js";

//---------------------------------Get---------------------------------------
export const getDept = async () => {
  const query = "SELECT * FROM departments";
  const result = await pool.query(query);
  return result.rows;
};

//---------------------------------Get---------------------------------------
export const getDeptid = async (id) => {
  const query = "SELECT * FROM departments WHERE id_departments=$1";
  const result = await pool.query(query, [id]);
  return result.rows;
};

//---------------------------------Get---------------------------------------
export const getA = async () => {
  const query = "SELECT * FROM assets";
  const result = await pool.query(query);
  return result.rows;
};

//---------------------------------Get---------------------------------------
export const getAid = async (id) => {
  const query = "SELECT * FROM assets WHERE id_assets = $1";
  const result = await pool.query(query, [id]);
  return result.rows;
};

//get
export const getUser = async () => {
  const query = "SELECT * FROM users";
  const result = await pool.query(query);
  return result.rows;
};

export const getUser_id = async (id) => {
  const query = "SELECT * FROM users WHERE id_users = $1";
  const result = await pool.query(query, [id]);
  return result.rows;
};
