import { getUbyusername } from "../models/login.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { JWT_SECRET } from "../config.js";
import { errors, throwError } from "../utils/errors.js";

export const getLogin = async (req, res, next) => {
  try {
    const { user_name, password } = req.body; //saca de la peticion los campos email y password

    if (!req.body.user_name || !req.body.password) {
      throwError(errors.missingFields);
    }

    const users = await getUbyusername(user_name); //en users guardamos al usuario
    const user = users[0];

    if (!user) {
      //si no esta ese usuario nos tira error
      throwError(errors.userNotFound);
    }

    const validPassword = await bcrypt.compare(password, user.password); //aqui comparamos la contrase;a q se manda  y la q se tiene en la bdd

    if (!validPassword) {
      throwError(errors.InvalidPassword);
    }

    //se genera el token

    const token = jwt.sign(
      { id: user.id_users, email: user.user_name, role: user.id_roles },
      JWT_SECRET,
      { expiresIn: "5h" }
    );

    res.json({ token });
  } catch (error) {
    next(error);
  }
};
