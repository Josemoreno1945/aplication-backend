import { get_Report, get_Reportid, create_Report, deleteReportid, updateReportid} from '../models/reports.model.js';
import reportSchema from '../schemas/report.schemas.js';
import { errors, throwError } from "../utils/errors.js"

//get
export const getReport = async (req, res, next) => {
    try{
        
        const rows = await get_Report();
        res.json(rows);
    }

    catch (error){
        next(error);
    }
}

export const getReportid = async (req, res, next) => {
    try{
        const id= req.params.id;
        if (isNaN(id) || id < 0) {
              throwError(errors.invalidData);
        }
        
        const rows = await get_Reportid(id);
        if (!rows || rows.length == 0) {
        throwError(errors.reportNotFound);
        }

        res.json(rows);

    } 
    
    catch (error) {
        next(error);
    }
}

//post
export const createReport = async (req, res, next) => {
    try{
        const data = req.body;

        const parseR = reportSchema.safeParse(data);
        if (!parseR.success) {
            return res.status(400).json({
                errors: parseR.error.errors
            })
        }

        const rows = await create_Report(data);
        return res.json(rows)
    }

    catch (error) {
        next(error);
    }
}

//delete
export const deleteReport = async (req, res, next) => {
    try{
        const id=req.params.id;
        const rows = await deleteReportid(id);

        if (!rows || rows.length === 0) {
            throwError(errors.reportNotFound)
        } else {
            return res.json({ message: "Report deleted successfully" });
        }
    }

    catch (error) {
        next(error);
    }

    
}

//put
export const updateReport = async (req, res, next) => {
    try{
        const id = req.params.id;
        if (isNaN(id) || id < 0) {
              throwError(errors.invalidData);
        }
        const data = req.body;

        const parseR = reportSchema.safeParse(data);
        if (!parseR.success) {
            return res.status(400).json({
                errors: parseR.error.errors
            })
        }

        const rows = await updateReportid(id, data);
        if (!rows || rows.length == 0) {
        throwError(errors.reportNotFound);
        }
        res.json(rows);
    }

    catch (error) {
        next(error);
    }
}