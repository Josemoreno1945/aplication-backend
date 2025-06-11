import { Router } from "express";
import { pool } from "../db.js";

import {
  deleteAssets,
  getAssets,
  getAssetsid,
  postAssets,
  putAssets,
} from "../controllers/assets.controllers.js";

const router = Router();

//---------------------------------Get---------------------------------------
router.get("/assets", getAssets);

//---------------------------------Get---------------------------------------
router.get("/assets/:id", getAssetsid);

//-------------------------------Post-----------------------------------------
router.post("/assets", postAssets);

//--------------------------------Put----------------------------------------
router.put("/assets/:id", putAssets);

//-------------------------------Delete-----------------------------------------
router.delete("/assets/:id", deleteAssets);

export default router;
