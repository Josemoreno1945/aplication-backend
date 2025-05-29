import { pool} from '../db.js';


//---------------------------------Get---------------------------------------
export const getA = async()=>{
    const query = "SELECT FROM assets"
    const result =await pool.query(query)
    return result.rows
}

//---------------------------------Get---------------------------------------
export const getAid = async(id)=>{
    const query = "SELECT * FROM assets WHERE id_assets = $3"
    const result =await pool.query(query,[id])
    return result.rows
}


//---------------------------------Post---------------------------------------
export const postA = async(data)=>{
        console.log("Datos recibidos:", data); 
    const query = `INSERT INTO assets(id_inventory,type, classification, description, 
    color, brand, model, serial, height, width, depth, plate, bodywork, engine, year_of_the_vehicle, 
    acquisition_value, use_status, conservation_status, observation, physical_location, direction_dependency,
    level, analyst)
    VALUES ($1, $2, $3, $4, $5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23) RETURNING *`;

    const values = [
        data.id_inventory, data.type, data.classification, data.description, data.color,
        data.brand, data.model, data.serial, data.height, data.width, data.depth,
        data.plate, data.bodywork, data.engine, data.year_of_the_vehicle,
        data.acquisition_value, data.use_status, data.conservation_status,
        data.observation, data.physical_location, data.direction_dependency,
        data.level, data.analyst
    ];

    console.log("Valores enviados:", values);
    const result =await pool.query(query,values)
    return result.rows
}

//---------------------------------Put---------------------------------------
export const putA = async(id,data)=>{
const query = `UPDATE assets
    SET id_inventory = $1, type = $2, classification = $3, description = $4, color = $5, 
        brand = $6, model = $7, serial = $8, height = $9, width = $10, depth = $11, 
        plate = $12, bodywork = $13, engine = $14, year_of_the_vehicle = $15, 
        acquisition_value = $16, use_status = $17, conservation_status = $18, 
        observation = $19, physical_location = $20, direction_dependency = $21, 
        level = $22, analyst = $23 
    WHERE id_assets = $24 RETURNING *`;


    const values=[
        data.id_inventory,
        data.type,
        data.classification,
        data.description,
        data.color,
        data.brand,
        data.model,
        data.serial,
        data.height,
        data.width,
        data.depth,
        data.plate,
        data.bodywork,
        data.engine,
        data.year_of_the_vehicle,
        data.acquisition_value,
        data.use_status,
        data.conservation_status,
        data.observation,
        data.physical_location,
        data.direction_dependency,
        data.level,
        data.analyst,
        id
    ]

    const result =await pool.query(query,values)
    return result.rows
}


//-------------------------------Delete-----------------------------------------

export const deleteA = async(id)=>{
        const query = "DELETE FROM assets WHERE id_assets = $1"
        const result =await pool.query(query,[id])
        return result.rows
}

