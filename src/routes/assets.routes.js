import { Router } from "express";
import { pool } from "../db.js";

import {
  deleteAssets,
  getAssets,
  getAssetsid,
  postAssets,
  putAssets,
} from "../controllers/assets.controllers.js";
import { verifyToken } from "../middlewares/auth.js";
import { isAdmin } from "../middlewares/roles.js";

const router = Router();

//---------------------------------Get---------------------------------------
router.get("/assets", verifyToken, getAssets);

//---------------------------------Get---------------------------------------
router.get("/assets/:id", verifyToken, getAssetsid);

//-------------------------------Post-----------------------------------------
router.post("/assets", verifyToken, isAdmin, postAssets);

//--------------------------------Put----------------------------------------
router.put("/assets/:id", verifyToken, isAdmin, putAssets);

//-------------------------------Delete-----------------------------------------
router.delete("/assets/:id", verifyToken, isAdmin, deleteAssets);

export default router;
