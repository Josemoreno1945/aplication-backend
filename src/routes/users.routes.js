import { Router } from "express";

import { createUsers, deleteUsers, getUserid, getUsers, updateUsers } from '../controllers/users.controllers.js'

import { pool } from '../db.js';


const router=Router();

router.get("/users", getusers
);

router.get("/users/:id_user", getUserid
);

router.post("/users", createUsers
);

router.delete("/users/:id", deleteUsers
);

router.put("/users/:id", updateUsers
);

export default router;