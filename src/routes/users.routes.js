import { Router } from "express";

import { createUsers, deleteUsers, getUserid, getusers, updateUsers } from '../controllers/users.controllers.js'

import { verifyToken } from "../middlewares/auth.js";
import { isAdmin } from "../middlewares/roles.js";


const router=Router();

router.get("/users", verifyToken, getusers
);

router.get("/users/:id", verifyToken, getUserid
);

router.post("/users", verifyToken, isAdmin, createUsers
);

router.delete("/users/:id", verifyToken, isAdmin, deleteUsers
);

router.put("/users/:id", verifyToken, isAdmin, updateUsers
);

export default router;