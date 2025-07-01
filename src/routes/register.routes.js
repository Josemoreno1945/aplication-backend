import { Router } from "express";
import { postRegister } from '../controllers/register.controllers.js'

const router=Router();

router.post("/register", postRegister
);

export default router;