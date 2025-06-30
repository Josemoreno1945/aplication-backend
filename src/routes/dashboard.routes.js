import { Router } from "express";

import { verifyToken } from "../middlewares/auth.js";
import { errorHandler } from "../middlewares/errorHandler.js";
import {
  getAssets,
  getDepartments,
  getusers,
  getDepartmentsId,
  getAssetsid,
  getUserid,
} from "../controllers/dashboard.controllers.js";

const router = Router();

router.get("/D_departments", verifyToken, getDepartments);
router.get("/D_users", verifyToken, getusers);
router.get("/D_assets", verifyToken, getAssets);

router.get("/D_departments/:id", verifyToken, getDepartmentsId, errorHandler);
router.get("/D_users/:id", verifyToken, getUserid);
router.get("/D_assets/:id", verifyToken, getAssetsid);

export default router;
