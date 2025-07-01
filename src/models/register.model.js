import { pool } from '../db.js';

export const registerUser = async (data) => {
    const query = `INSERT INTO "users" ("first_name", "last_name", "user_name", "password", "email") VALUES ($1, $2, $3, $4, $5)`;

    const values = [data.first_name, data.last_name, data.user_name, data.password, data.email, 2];

    const result = await pool.query(query, values);
    return result.rows;
}