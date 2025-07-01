import { pool } from '../db.js';

export const getProfileId = async (id) => {
    const query = 'SELECT * FROM users WHERE id_users = $1';
    const result = await pool.query (query, [id])
    return result.rows
}