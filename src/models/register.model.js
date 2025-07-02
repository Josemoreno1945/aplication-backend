import { pool } from '../db.js';

export const registerUser = async (data) => {
    const query = `INSERT INTO "users" ("first_name", "last_name", "user_name", "password", "email", "status", "id_roles") VALUES ($1, $2, $3, $4, $5, $6, $7)`;

    const values = [data.first_name, data.last_name, data.user_name, data.password, data.email, "active", 2];

    const result = await pool.query(query, values);
    return result.rows;
}

export const getUserEmail = async (email) => {
    const query = "SELECT * FROM users WHERE email = $1";
    const result = await pool.query(query, [email]);
    return !!result.rows[0];
}

export const getUserName = async (user_name) => {
    const query = "SELECT * FROM users WHERE user_name = $1";
    const result = await pool.query(query, [user_name]);
    return !!result.rows[0];
}