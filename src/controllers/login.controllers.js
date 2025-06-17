import { getUbyEmail } from "../models/login.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { JWT_SECRET } from "../config.js";

export const getLogin = async (req, res) => {
  try {
    const { email, password } = req.body; //saca de la peticion los campos email y password
    const users = await getUbyEmail(email); //en users guardamos al usuario
    const user = users[0];
    if (!user) {
      //si no esta ese usuario nos tira error
      return res.status(404).json({ message: "User not found" });
    }

    const validPassword = password === user.password; //aqui comparamos la contrase;a q se manda  y la q se tiene en la bdd

    if (!validPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }

    //se genera el token

    const token = jwt.sign(
      { id: user.id_users, email: user.email, role: user.id_roles },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).send("Error getting email");
  }
};
