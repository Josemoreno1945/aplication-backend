import { pool } from '../db.js';

//get
export const getR = async () => {
    const query = "SELECT * FROM reports"
    const result = await pool.query(query)
    return result.rows
}

export const getRid = async (id) => {
    const query = "SELECT * FROM users WHERE id_reports = $1"
    const result = await pool.query(query, [id])
    return result.rows
}