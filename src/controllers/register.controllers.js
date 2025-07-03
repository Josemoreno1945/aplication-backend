import { registerUser } from "../models/register.model.js";

import { getUser, getUser_id, createUser, deleteUserid, updateUserid, getUserName, getUserEmail } from "../models/users.model.js";


import registerSchema from "../schemas/register.schemas.js";
import bcrypt from "bcryptjs";
import { errors, throwError } from "../utils/errors.js";


export const postRegister = async (req, res, next) => {
    try{
        const data = req.body;



    const parseRegister = registerSchema.safeParse(data);
    if (!parseRegister.success) {
      return res.status(400).json({
        errors: parseRegister.error.errors,
      });
    }

    const emailExiste = await getUserEmail(data.email);
    if (emailExiste) {
      throwError(errors.User_emailDuplicated);
    }

    const userNameExiste = await getUserName(data.user_name);
    if (userNameExiste) {
      throwError(errors.userDuplicated);
    }

    const hashedPassword = await bcrypt.hash(data.password, 8);
    const userData = { ...data, password: hashedPassword };
    const rows = await registerUser(userData);
    return res.json(rows);
  } catch (error) {
    next(error);
  }
};
