import {
  getDept,
  getDeptid,
  getA,
  getAid,
  getUser,
  getUser_id,
} from "../models/dashboard.model.js";
import { errors, throwError } from "../utils/errors.js";
import { handleDBError } from "../utils/errorsDB.js";

export const getDepartments = async (req, res, next) => {
  try {
    const rows = await getDept();
    res.json(rows);
  } catch (error) {
    try {
      handleDBError(error);
    } catch (error) {
      next(error);
    }
  }
};

//---------------------------------Get---------------------------------------
export const getDepartmentsId = async (req, res, next) => {
  try {
    const id = req.params.id;
    //-----------------------------------------------------------
    if (isNaN(id) || id < 0) {
      throwError(errors.invalidData);
    }
    //-----------------------------------------------------------
    //verifico primero el id y despues llamo a la funcion
    const rows = await getDeptid(id);
    //-----------------------------------------------------------
    if (!rows || rows.length == 0) {
      throwError(errors.departmentNotFound);
    }
    //-----------------------------------------------------------
    res.json(rows);
  } catch (error) {
    next(error);
  }
};

//---------------------------------Get---------------------------------------
export const getAssets = async (req, res, next) => {
  try {
    const result = await getA();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

//---------------------------------Get---------------------------------------
export const getAssetsid = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await getAid(id);

    if (!result || result == 0) {
      throwError(errors.assetNotFound);
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

//get
export const getusers = async (req, res) => {
  try {
    const rows = await getUser();
    res.json(rows);
  } catch (error) {
    console.error("Error getting User:", error);
    res.status(500).send("Error getting User");
  }
};

export const getUserid = async (req, res) => {
  try {
    const id = req.params.id;

    const result = await getUser_id(id);

    if (!rows || rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(result);
  } catch (error) {
    console.error("Error getting User:", error);
    res.status(500).send("Error getting User");
  }
};
