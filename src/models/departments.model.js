import { email } from "zod/v4";
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

//-------------------------------Post-----------------------------------------

export const postDept = async (data) => {
  const deptQuery = `INSERT INTO departments(name, address, phone, email, operational_status)
      VALUES ($1, $2, $3, $4, $5) RETURNING *`;

  const deptValues = [
    data.name,
    data.address,
    data.phone,
    data.email,
    data.operational_status,
  ];

  const deptResult = await pool.query(deptQuery, deptValues);
  const newDept = deptResult.rows[0];

  const inventoryQuery = `INSERT INTO inventory(id_departments, available_quantity, last_updated, inventory_status, commentary)
      VALUES ($1, 0, NOW(), 'active', 'Inventario creado automáticamente') RETURNING *`;

  const inventoryValues = [newDept.id_departments];
  const inventoryResult = await pool.query(inventoryQuery, inventoryValues);

  return { department: newDept, inventory: inventoryResult.rows[0] };
};

//--------------------------------Put----------------------------------------

export const putDept = async (id, data) => {
  const query = `
        UPDATE departments
        SET name = $1, address = $2, phone = $3, email = $4, operational_status = $5
        WHERE id_departments = $6 RETURNING *`;

  const values = [
    data.name,
    data.address,
    data.phone,
    data.email,
    data.operational_status,
    id,
  ];

  const result = await pool.query(query, values);
  return result.rows;
};

//-------------------------------Delete-----------------------------------------

export const deleteDept = async (id) => {
  const query = "DELETE FROM departments WHERE id_departments = $1";
  const result = await pool.query(query, [id]);
  return result.rows;
};

//-------------------------------------------------------------------------------

export const getDeptEmail = async (email) => {
  const query = "Select * FROM departments WHERE email=$1";
  const result = await pool.query(query, [email]);
  return !!result.rows[0];
};

//---------------------------------Get_assets_dept---------------------------------------
export const getADept = async (id) => {
  const query = `
  SELECT * FROM assets
  JOIN inventory on inventory.id_inventory = assets.id_inventory
  JOIN departments on departments.id_departments = inventory.id_departments
  WHERE departments.id_departments= $1`;
  const result = await pool.query(query, [id]);
  return result.rows;
};
