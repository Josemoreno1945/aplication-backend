import { Router } from "express";
import { pool, sequelize } from '../db.js';
import {getAssets} from "../controllers/assets.controllers.js"
import { getAssetsId } from "../controllers/assets.controllers.js";
import {postAssets} from "../controllers/assets.controllers.js"
import { putAssets } from "../controllers/assets.controllers.js";
import {deleteAssets} from "../controllers/assets.controllers.js"

const router=Router()

//---------------------------------Get---------------------------------------
router.get('/assets',getAssets)

//------------------------------Get------------------------------------------
router.get('/assets/:id',getAssetsId)

//-------------------------------Post-----------------------------------------
router.post('/assets',postAssets)

//--------------------------------Put----------------------------------------
router.put('/assets/:id',putAssets)

//-------------------------------Delete-----------------------------------------
router.delete('/assets/:id',deleteAssets)


export default router;