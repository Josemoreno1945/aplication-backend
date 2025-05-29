import { Router } from "express";
import { createReport, deleteReport, getReportid, getReport, updateReport } from '../controllers/reports.controllers.js'

const router=Router();

router.get("/report", getReport
);

router.get("/report", getReportid
);

router.post("/report", createReport
);

router.delete("/report/:id", deleteReport
);

router.put("/report/:id", updateRepor
);


export default router;