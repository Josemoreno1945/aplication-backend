import { pool } from '../db.js';

//get
export const getU = async () => {
    const query = "SELECT * FROM users"
    const result = await pool.query(query)
    return result.rows
}

export const getUid = async (id) => {
    const query = "SELECT * FROM users WHERE id_users = $1"
    const result = await pool.query(query, [id])
    return result.rows
}

//post
export const createU = async (data) => {
    const query = "INSER INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *"
    const values = [data.name, data.email, data.password]
    const result = await pool.query(query, values)
    return result.rows
}

//delete
export const deleteU = async (id) => {
    const query = "DELETE FROM users WHERE id_users = $1 RETURNING *"
    const result = await pool.query(query, [id])
    return result.rows
}

//put
export const updateU = async (id, data) => {
    const query = "UPDATE users SET name = $1, email = $2, password = $3 WHERE id_users = $4 RETURNING *"
    const values = [data.name, data.email, data.password, id]
    const result = await pool.query(query, values)
    return result.rows
}