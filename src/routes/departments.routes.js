import { Router } from "express";

import {
  getDepartments,
  getDepartmentsId,
  postDeparments,
  putDeparments,
  deleteDepartments,
  getAssetsDepartments,
} from "../controllers/departments.controllers.js";

import { verifyToken } from "../middlewares/auth.js";
import { isAdmin } from "../middlewares/roles.js";
import { errorHandler } from "../middlewares/errorHandler.js";
const router = Router();

//callback(funcion de retorno) la funcion en si
//request(peticion) req
//response(respuesta) res

//---------------------------------Get---------------------------------------
router.get("/departments", verifyToken, getDepartments);

//------------------------------Get------------------------------------------
router.get("/departments/:id", verifyToken, getDepartmentsId, errorHandler);

//-------------------------------Post-----------------------------------------
router.post("/departments", verifyToken, isAdmin, postDeparments);

//--------------------------------Put----------------------------------------
router.put("/departments/:id", verifyToken, isAdmin, putDeparments);

//-------------------------------Delete-----------------------------------------
router.delete("/departments/:id", verifyToken, isAdmin, deleteDepartments);

router.get("/AssetsDepartments/:id", verifyToken, getAssetsDepartments);

export default router;
