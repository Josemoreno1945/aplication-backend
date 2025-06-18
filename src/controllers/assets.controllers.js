import { pool } from "../db.js";
import { deleteA, getA, getAid, postA, putA } from "../models/assets.model.js";
import assetsSchema from "../schemas/assets.schemas.js";

//---------------------------------Get---------------------------------------
export const getAssets = async (req, res) => {
  try {
    const result = await getA();
    res.json(result);
  } catch (error) {
    console.error("Error getting assets:", error);
    res.status(500).send("Error getting assets");
  }
};

//---------------------------------Get---------------------------------------
export const getAssetsid = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await getAid(id);

    if (!result || result == 0) {
      return res.status(404).json({ message: "Asset not found" });
    }

    res.json(result);
  } catch (error) {
    console.error("Error getting assets:", error);
    res.status(500).send("Error getting assets");
  }
};

//-------------------------------Post-----------------------------------------
export const postAssets = async (req, res) => {
  try {
    const data = req.body;

    const parsed = assetsSchema.safeParse(data);
    if (!parsed.success) {
      return res.status(400).json({ errors: parsed.error.errors });
    }

    const rows = await postA(data);
    return res.json(rows);
  } catch (error) {
    console.error("Error when creating asset:", error);
    res.status(500).send("Error when creating asset");
  }
};

//--------------------------------Put----------------------------------------
export const putAssets = async (req, res) => {
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
    console.error("Error updating asset:", error);
    res.status(500).send("Error updating asset");
  }
};

//-------------------------------Delete-----------------------------------------

export const deleteAssets = async (req, res) => {
  try {
    const id = req.params.id;
    const rows = await deleteA(id);

    if (rows === 0) {
      return res.status(404).json({ message: "Asset not found" });
    } else {
      return res.json({ message: "delete asset" });
    }
  } catch (error) {
    console.error("Error getting asset:", error);
    res.status(500).send("Error getting asset");
  }
};
