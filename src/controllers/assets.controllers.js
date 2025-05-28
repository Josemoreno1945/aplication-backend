import { pool} from '../db.js';
import assets from '../models/assets.model.js';
/*
//---------------------------------Get---------------------------------------
export const getAssets = async(req,res)=>{
    try{
        const getAssets =await assets.findAll()
        res.json(getAssets);
    }catch(error){
        console.error("Error getting assets:", error);
        res.status(500).send("Error getting assets");
    }
}

*/