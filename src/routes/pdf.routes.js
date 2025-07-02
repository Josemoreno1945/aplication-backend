import { Router } from "express";
import {
  generateDepartmentsPdf,
  generateAssetsPdf,
} from "../controllers/PDF.controllers.js";

const router = Router();
router.get("/dpt_pdf", generateDepartmentsPdf);
router.get("/assets_pdf", generateAssetsPdf);
export default router;
