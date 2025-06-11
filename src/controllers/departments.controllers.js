import { pool } from "../db.js";
import {
  getDept,
  getDeptid,
  postDept,
  putDept,
  deleteDept,
} from "../models/departments.model.js";

//---------------------------------Get---------------------------------------
export const getDepartments = async (req, res) => {
  try {
    const rows = await getDept();
    res.json(rows);
  } catch (error) {
    console.error("Error getting department:", error);
    res.status(500).send("Error getting department");
  }
};

//---------------------------------Get---------------------------------------
export const getDepartmentsId = async (req, res) => {
  try {
    const id = req.params.id;
    const rows = await getDeptid(id);

    if (!rows || rows.length == 0) {
      return res.status(404).json({ messaje: "Department not found" });
    }
    res.json(rows);
  } catch (error) {
    console.error("Error getting department:", error);
    res.status(500).send("Error getting department");
  }
};

//-------------------------------Post-----------------------------------------
export const postDeparments = async (req, res) => {
  try {
    const data = req.body;
    const rows = await postDept(data);
    return res.json(rows);
  } catch (error) {
    console.error("Error when creating department:", error);
    res.status(500).send("Error when creating department");
  }
};

//--------------------------------Put----------------------------------------
export const putDeparments = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
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
