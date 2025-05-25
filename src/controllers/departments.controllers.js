import { pool, sequelize } from '../db.js';
import department from "../models/departments.model.js"


//---------------------------------Get---------------------------------------
export const getDepartments = async(req,res)=>{
    try{
        const getDept =await department.findAll()
        res.json(getDept);
    }catch(error){
        console.error("Error getting department:", error);
        res.status(500).send("Error getting department");
    }
}

//---------------------------------Get---------------------------------------
export const getDepartmentsId = async(req,res)=>{
    try{
        const id=req.params.id
        const getDeptid = await department.findByPk(id) 

        if (!getDeptid){
            return res.status(404).json({ messaje : "Department not found"});
        }
        res.json(getDeptid);

    }catch(error){
        console.error("Error getting department:", error);
        res.status(500).send("Error getting department");
    }
}

//-------------------------------Post-----------------------------------------
export const postDeparments = async(req,res)=>{
    try{
        const data=req.body
        const  postDept = await department.create(data)
        return res.json(postDept)
    }   
    catch(error){
        console.error("Error when creating department:", error);
        res.status(500).send("Error when creating department");
    } 
}

//--------------------------------Put----------------------------------------
export const putDeparments = async(req,res)=>{
    try{
        const id = req.params.id
        const data = req.body
        const putDept = await department.update(data,{ where: { id_departments: id } }) 
        res.json(putDept);
    }
    catch(error){
        console.error("Error when creating department:", error);
        res.status(500).send("Error when creating department");
    }
}

//-------------------------------Delete-----------------------------------------

export const deleteDepartments = async(req,res)=>{
    try{
        const id=req.params.id
        const deleteDept = await department.destroy({ where: { id_departments: id } })

        if (deleteDept===0){
            return res.status(404).json({ message : "Department not found"});
        }
        else{
            return res.json({message:"delete department"});
        }
    }catch(error){
        console.error("Error getting department:", error);
        res.status(500).send("Error getting department");
    }
}