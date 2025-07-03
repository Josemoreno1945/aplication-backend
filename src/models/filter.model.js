import { pool } from '../db.js';

export const getReportByCampo = async (campo, valor) => {
    const query = `SELECT * FROM report WHERE $(campo) ILIKE $1`;
    const result = await pool.query(query, [`%${valor}%`]);
    return result.rows;
}