import { Router } from "express";
import { post_Register } from '../controllers/register.controllers.js'

const router=Router();

router.post("/register", post_Register
);

export default router;