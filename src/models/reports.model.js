import { pool } from '../db.js';

//get
export const getR = async () => {
    const query = "SELECT * FROM reports"
    const result = await pool.query(query)
    return result.rows
}

export const getRid = async (id) => {
    const query = "SELECT * FROM users WHERE id_support = $1"
    const result = await pool.query(query, [id])
    return result.rows
}

//post
export const createR = async (data) => {
    const query = "INSER INTO report (id_support, id_users, date, hour, priority, description) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *"
    const values = [data.id_support, data.id_users, data.date, data.hour, data, priority, data.description]
    const result = await pool.query(query, values)
    return result.rows
}

//delete
export const deleteR = async (id) => {
    const query = "DELETE FROM report WHERE id_support = $1 RETURNING *"
    const result = await pool.query(query, [id])
    return result.rows
}

//put
export const updateR = async (id, data) => {
    const query = "UPDATE report SET id_users = $1, date = $2, hour = $3, priority = $4, description = $5 WHERE id_support = $6 RETURNING *"
    const values = [data.id_users, data.date, data.hour, data.priority, data.description, id]
    const result = await pool.query(query, values)
    return result.rows
}