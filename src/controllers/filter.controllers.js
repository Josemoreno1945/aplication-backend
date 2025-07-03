import {getReportByCampo} from "../models/filter.model.js";

export const report_filter = async (req, res, next) => {
    const {campo, valor} = req.query;

    const camposValidos = ['date', 'hour', 'priority', 'status'];
    if (!camposValidos.includes(campo)) {
        return res.status(400).json({error: 'Campo no valido'});
    }

    try {
        const rows = await getReportByCampo(campo, valor);
        res.json(rows);
    }

    catch (error) {
        next(error)
    }
}