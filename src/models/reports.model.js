import { pool } from '../db.js';

//get
export const get_Report = async () => {
    const query = "SELECT * FROM report"
    const result = await pool.query(query)
    return result.rows
}

export const get_Reportid = async (id) => {
    const query = "SELECT * FROM report WHERE id_support = $1"
    const result = await pool.query(query, [id])
    return result.rows
}

//post
export const create_Report = async (data) => {
    const query = "INSERT INTO report (id_users, date, hour, priority, description) VALUES ($1, $2, $3, $4, $5) RETURNING *"
    const values = [data.id_users, data.date, data.hour, data.priority, data.description]
    const result = await pool.query(query, values)
    return result.rows
}

//delete
export const deleteReportid = async (id) => {
    const query = "DELETE FROM report WHERE id_support = $1 RETURNING *"
    const result = await pool.query(query, [id])
    return result.rows
}

//put
export const updateReportid = async (id, data) => {
    const query = "UPDATE report SET id_users = $1, date = $2, hour = $3, priority = $4, description = $5 WHERE id_support = $6 RETURNING *"
    const values = [data.id_users, data.date, data.hour, data.priority, data.description, id]
    const result = await pool.query(query, values)
    return result.rows
}