import { getProfile, getProfileId } from '../models/profile.model.js';
import userSchema from '../schemas/users.schemas.js';
import { errors, throwError } from "../utils/errors.js"

export const getProfile = async (req, res, next) => {
    try {
        const id = req.user.id_users

        if (isNaN(id) || id < 0) {
            throwError(errors.invalidData)
        }

        const rows = await getProfileId(id);

        res.json(rows)
    }   catch (error) {
         next(error)
        }
}