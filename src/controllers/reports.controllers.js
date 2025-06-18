import { get_Report, get_Reportid, create_Report, deleteReportid, updateReportid} from '../models/reports.model.js';
import reportSchema from '../schemas/report.schemas.js';

//get
export const getReport = async (req, res) => {
    try{
        
        const rows = await get_Report();
        res.json(rows);

        const parseR = reportSchema.safeParse();
        if (!parseR.success) {
            return res.status(400).json({
                errors: parseR.error.errors
            })
        }

    }

    catch (error){
        
        console.error("Error getting Report:", error);
        res.status(500).send("Error getting Report");
    }
}

export const getReportid = async (req, res) => {
    try{
    const id=req.params.id;

    const parseR = reportSchema.safeParse();
        if (!parseR.success) {
            return res.status(400).json({
                errors: parseR.error.errors
            })
        }

    const rows = await get_Reportid(id);

    if (!rows || rows.length === 0) {
        return res.status(404).json({ message: "Report not found"});
    }
    res.json(rows);

    } 
    
    catch (error) {
        console.error("Error getting Report:", error);
        res.status(500).send("Error getting Report");
    }
}

//post
export const createReport = async (req, res) => {
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
        console.error("Error creating Report:", error);
        res.status(500).send("Error creating Report");
    }
}

//delete
export const deleteReport = async (req, res) => {
    try{
        const id=req.params.id;
        const rows = await deleteReportid(id);

        if (!rows || rows.length === 0) {
        return res.status(404).json({ message: "Report not found" });
        } else {
            return res.json({ message: "Report deleted successfully" });
        }
    }

    catch (error) {
        console.error("Error deleting Report:", error);
        return res.status(500).send("Error deleting Report");
    }

    
}

//put
export const updateReport = async (req, res) => {
    try{
        const id = req.params.id;
        const data = req.body;
        const rows = await updateReportid(id, data);
        res.json(rows);
    }

    catch (error) {
        console.error("Error updating Report:", error);
        res.status(500).send("Error updating Report");
    }
}