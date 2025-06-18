import { number } from "zod/v4";
import { pool } from "../db.js";
import {
  getDept,
  getDeptid,
  postDept,
  putDept,
  deleteDept,
  getDeptEmail,
} from "../models/departments.model.js";
import departmentSchema from "../schemas/departments.schemas.js";

//---------------------------------Get---------------------------------------
export const getDepartments = async (req, res, next) => {
  try {
    const rows = await getDept();
    res.json(rows);
  } catch (error) {
    next(error);
  }
};

//---------------------------------Get---------------------------------------
export const getDepartmentsId = async (req, res, next) => {
  try {
    const id = req.params.id;

    //-----------------------------------------------------------
    if (isNaN(id) || id < 0) {
      const error = new Error("ID inválido");
      error.status = 400;
      throw error;
    }
    const rows = await getDeptid(id); //verifico primero el id y despues llamo a la funcion

    //-----------------------------------------------------------
    if (!rows || rows.length == 0) {
      const error = new Error("Department not found");
      error.status = 404;
      throw error;
    }
    //-----------------------------------------------------------
    res.json(rows);
  } catch (error) {
    next(error);
  }
};

//-------------------------------Post-----------------------------------------
export const postDeparments = async (req, res, next) => {
  try {
    const data = req.body;

    const parsed = departmentSchema.safeParse(data);
    if (!parsed.success) {
      return res.status(400).json({ errors: parsed.error.errors }); //esquema validaciones
    }

    //verificar email repetido
    const emailExist = await getDeptEmail(data.email);
    if (emailExist) {
      const error = new Error("El correo ya está registrado");
      error.status = 409;
      throw error;
    }

    const rows = await postDept(data);
    return res.json(rows);
  } catch (error) {
    return res.status(500).json({ error: error.message });
    /*
    //--------------------------------------------------------------
    if (error.code === "23506") {
      error.status = 409;
      error.message = "El correo ya está registrado";
    }
    if (error.code === "ECONNREFUSED") {
      error.status = 503;
      error.message = "No se pudo conectar a la base de datos";
    }
    //---------------------------------------------------------------
    next(error);
    */
  }
};

//--------------------------------Put----------------------------------------
export const putDeparments = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;

    const parsed = departmentSchema.safeParse(data);
    if (!parsed.success) {
      return res.status(400).json({ errors: parsed.error.errors });
    }

    const rows = await putDept(id, data);
    res.json(rows);
  } catch (error) {
    console.error("Error updating department:", error);
    res.status(500).send("Error updating department");
  }
};

//-------------------------------Delete-----------------------------------------

export const deleteDepartments = async (req, res) => {
  try {
    const id = req.params.id;
    const rows = await deleteDept(id);

    if (rows === 0) {
      return res.status(404).json({ message: "Department not found" });
    } else {
      return res.json({ message: "delete department" });
    }
  } catch (error) {
    console.error("Error getting department:", error);
    res.status(500).send("Error getting department");
  }
};

//---------------------------------------------------------------------------------------
