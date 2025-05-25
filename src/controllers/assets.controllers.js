import { pool, sequelize } from '../db.js';
import assets from '../models/assets.model.js';

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

//---------------------------------Get---------------------------------------
export const getAssetsId = async(req,res)=>{
    try{
        const id=req.params.id
        const getAssetsId = await assets.findByPk(id) 

        if (!getAssetsId){
            return res.status(404).json({ messaje : "Asset not found"});
        }
        res.json(getAssetsId);

    }catch(error){
        console.error("Error getting asset:", error);
        res.status(500).send("Error getting asset");
    }
}

//-------------------------------Post-----------------------------------------
export const postAssets = async(req,res)=>{
    try{
        const data=req.body
        const  postAssets = await assets.create(data)
        return res.json(postAssets)
    }   
    catch(error){
        console.error("Error when creating assets:", error);
        res.status(500).send("Error when creating assets");
    } 
}

//--------------------------------Put----------------------------------------
export const putAssets = async(req,res)=>{
    try{
        const id = req.params.id
        const data = req.body
        const putAssets = await assets.update(data,{ where: { id_assets: id } }) 
        res.json(putAssets);
    }
    catch(error){
        console.error("Error when creating Assets:", error);
        res.status(500).send("Error when creating Assets");
    }
}

//-------------------------------Delete-----------------------------------------

export const deleteAssets = async(req,res)=>{
    try{
        const id=req.params.id
        const deleteAssets = await assets.destroy({ where: { id_assets: id } })

        if (deleteAssets===0){
            return res.status(404).json({ message : "Asset not found"});
        }
        else{
            return res.json({message:"delete asset"});
        }
    }catch(error){
        console.error("Error getting asset:", error);
        res.status(500).send("Error getting asset");
    }
}