import { postRegister, registerUser} from '../models/register.model.js';
import userSchema from '../schemas/users.schemas.js';
import bcrypt from 'bcryptjs';
import { errors, throwError } from "../utils/errors.js"

export const postRegister = async (req, res, next) => {
    try{
        const data = req.body;

        const parseU = userSchema.safeParse(data);
        if (!parseU.success) {
            return res.status(400).json({
                errors: parseU.error.errors
            })
        }

        const emailExiste = await getUserEmail(data.email);
        if(emailExiste){
            throwError(errors.User_emailDuplicated)
        }

        const usernameExiste = await getUserName(data.user_name);
        if(usernameExiste){
            throwError(errors.userDuplicated)
        }

        const hashedPassword = await bcrypt.hash(data.password, 8);
        const userData = { ...data, password: hashedPassword };
        const rows = await registerUser(userData);
        return res.json(rows)
    }

    catch (error) {
        next(error);
    }
}