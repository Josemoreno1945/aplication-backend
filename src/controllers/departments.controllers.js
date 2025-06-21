import {
  getDept,
  getDeptid,
  postDept,
  putDept,
  deleteDept,
  getDeptEmail,
} from "../models/departments.model.js";
import departmentSchema from "../schemas/departments.schemas.js";
import { errors, throwError } from "../utils/errors.js";
import { handleDBError } from "../utils/errorsDB.js";
//---------------------------------Get---------------------------------------
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

//-------------------------------Post-----------------------------------------
export const postDeparments = async (req, res, next) => {
  try {
    const data = req.body;

    const parsed = departmentSchema.safeParse(data);
    if (!parsed.success) {
      return res.status(400).json({ errors: parsed.error.errors }); //esquema validaciones
    }
    //--------------------------------------------------------------------------
    //verificar email repetido
    const emailExist = await getDeptEmail(data.email);
    if (emailExist) {
      throwError(errors.Dpt_emailDuplicated);
    }
    const rows = await postDept(data);
    return res.json(rows);
  } catch (error) {
    next(error);
  }
};

//--------------------------------Put----------------------------------------
export const putDeparments = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;

    if (isNaN(id) || id < 0) {
      throwError(errors.invalidData);
    }

    const parsed = departmentSchema.safeParse(data);
    if (!parsed.success) {
      return res.status(400).json({ errors: parsed.error.errors });
    }

    //verificar email repetido
    const emailExist = await getDeptEmail(data.email);
    if (emailExist) {
      throwError(errors.Dpt_emailDuplicated);
    }

    const rows = await putDept(id, data);
    res.json(rows);
  } catch (error) {
    try {
      handleDBError(error);
    } catch (error) {
      next(error);
    }
  }
};

//-------------------------------Delete-----------------------------------------

export const deleteDepartments = async (req, res, next) => {
  try {
    const id = req.params.id;
    const rows = await deleteDept(id);

    if (rows === 0) {
      throwError(errors.departmentNotFound);
    } else {
      return res.json({ message: "delete department" });
    }
  } catch (error) {
    next(error);
  }
};

//---------------------------------------------------------------------------------------
