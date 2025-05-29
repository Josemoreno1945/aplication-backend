import { Router } from "express";
import { createUsers, deleteUsers, getUserid, getusers, updateUsers } from '../controllers/users.controllers.js'

const router=Router();

router.get("/users", getusers
);

router.get("/users/:id", getUserid
);

router.post("/users", createUsers
);

router.delete("/users/:id", deleteUsers
);

router.put("/users/:id", updateUsers
);


export default router;