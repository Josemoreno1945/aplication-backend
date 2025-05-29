import { getReport, getReportid, createReport, deleteReport, updateReport} from '../models/reports.model.js';

//get
export const getReport = (req, res) => {
    try{
        const rows = getReport();
        res.json(rows);
    }

    catch (error){
        console.error("Error getting Report:", error);
        res.status(500).send("Error getting Report");
    }
}

export const getReportid = async (req, res) => {
    try{
    const id=req.params;
    const rows = await getRid(id);

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
        const rows = await createR(data);
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
        const id=req.params;
        const rows = await deleteRid(id);

        if (!rows || rows.length === 0) {
        return res.status(404).json({ message: "Report not found" });
        } else {
            return res.status(204).json({ message: "Report deleted successfully" });
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
        const rows = await updateRid(id, data);
        res.json(rows);
    }

    catch (error) {
        console.error("Error updating Report:", error);
        res.status(500).send("Error updating Report");
    }
}