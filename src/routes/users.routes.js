import { Router } from "express";
import { pool, sequelize } from '../db.js';

const router=Router();

router.get("/users", async (req, res) => {
    const {rows} = await pool.query('SELECT * FROM users')
    
    res.json(rows);
}
);

router.get("/users/:id", async (req, res) => {
    const {id}=req.params;
    const {rows} = await pool.query('SELECT * FROM users WHERE id = $1', [id]);

    if (rows.length === 0) {
        return res.status(404).json({ message: "User not found"});
    }

    res.json(rows);
}
);

router.post("/users", async (req, res) => {
    const data = req.body;
    const {rows} = await pool.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *', [data.name, data.email]);

    return res.json(rows[0]);
}
);

router.delete("/users/:id", async (req, res) => {
    const {id}=req.params;
    const {rowCount} = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);

    if (rowCount === 0) {
        return res.status(404).json({ message: "User not found"});
    }

    return res.sendStatus(204);
}
);

router.put("/users/:id", async (req, res) => {
    const {id}=req.params;
    const data = req.body;
    const {rows} = await pool.query ('UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *', [data.name, data.emali, id]);

    return res.json(rows[0]);
}
);

export default router;