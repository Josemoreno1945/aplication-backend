import { Router } from "express";
import { createReport, deleteReport, getReportid, getReport, updateReport } from '../controllers/reports.controllers.js'

const router=Router();

router.get("/report", getReport
);

router.get("/report/:id", getReportid
);

router.post("/report", createReport
);

router.delete("/report/:id", deleteReport
);

router.put("/report/:id", updateReport
);


export default router;