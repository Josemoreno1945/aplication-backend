import { Router } from "express";
import { createReport, deleteReport, getReportid, getReport, updateReport } from '../controllers/reports.controllers.js'
import { verifyToken } from "../middlewares/auth.js";
import { isAdmin } from "../middlewares/roles.js";

const router=Router();

router.get("/report", verifyToken, getReport
);

router.get("/report/:id", verifyToken, getReportid
);

router.post("/report", verifyToken, isAdmin, createReport
);

router.delete("/report/:id", verifyToken, isAdmin, deleteReport
);

router.put("/report/:id", verifyToken, isAdmin, updateReport
);


export default router;