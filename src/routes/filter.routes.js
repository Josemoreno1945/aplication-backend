import {Router} from 'express';
import { report_filter } from '../controllers/filter.controllers.js'; 

const router = Router();

router.get("/filter", report_filter);

export default router;