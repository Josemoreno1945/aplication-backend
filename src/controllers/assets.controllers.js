import {
  deleteA,
  getA,
  getAid,
  postA,
  putA,
  getInvid,
} from "../models/assets.model.js";
import assetsSchema from "../schemas/assets.schemas.js";
import { errors, throwError } from "../utils/errors.js";
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

//---------------------------------Get---------------------------------------
export const getinventoryid = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await getInvid(id);

    res.json(result);
  } catch (error) {
    next(error);
  }
};

//-------------------------------Post-----------------------------------------
export const postAssets = async (req, res, next) => {
  try {
    const data = req.body;

    const parsed = assetsSchema.safeParse(data);
    if (!parsed.success) {
      return res.status(400).json({ errors: parsed.error.errors });
    }

    const rows = await postA(data);
    return res.json(rows);
  } catch (error) {
    next(error);
  }
};

//--------------------------------Put----------------------------------------
export const putAssets = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;

    const parsed = assetsSchema.safeParse(data);
    if (!parsed.success) {
      return res.status(400).json({ errors: parsed.error.errors });
    }

    const rows = await putA(id, data);
    res.json(rows);
  } catch (error) {
    next(error);
  }
};

//-------------------------------Delete-----------------------------------------

export const deleteAssets = async (req, res, next) => {
  try {
    const id = req.params.id;
    const rows = await deleteA(id);

    if (rows === 0) {
      throwError(errors.assetNotFound);
    } else {
      return res.json({ message: "delete asset" });
    }
  } catch (error) {
    next(error);
  }
};
