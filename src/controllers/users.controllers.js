import { getUser, getUser_id, createUser, deleteUserid, updateUserid, getUserName} from '../models/users.model.js';
import userSchema from '../schemas/users.schemas.js';
import bcrypt from 'bcryptjs';

//get
export const getusers = async (req, res) => {
    try{
        const rows = await getUser();
        res.json(rows);
    }

    catch (error){
        console.error("Error getting User:", error);
        res.status(500).send("Error getting User");
    }
}

export const getUserid = async (req, res) => {
    try{
        const id= req.params.id;
        
        const result = await getUser_id(id);


        if (!rows || rows.length === 0) {
        return res.status(404).json({ message: "User not found"});
        }
        res.json(result);

    } 
    
    catch (error) {
        console.error("Error getting User:", error);
        res.status(500).send("Error getting User");
    }
}

//post
export const createUsers = async (req, res) => {
    try{
        const data = req.body;

        const parseU = userSchema.safeParse(data);
        if (!parseU.success) {
            return res.status(400).json({
                errors: parseU.error.errors
            })
        }

        const hashedPassword = await bcrypt.hash(data.password, 8);
        const userData = { ...data, password: hashedPassword };
        const rows = await createUser(userData);
        
        const emailExiste = await getUserEmail(data.email);
        const usernameExiste = await getUserName(data.user_name);


        return res.json(rows)
    }

    catch (error) {
        console.error("Error creating User:", error);
        res.status(500).send("Error creating User");
    }
}

//delete
export const deleteUsers = async (req, res) => {
    try{
        const id=req.params.id;
        const rows = await deleteUserid(id);

        if (rows === 0) {
        return res.status(404).json({ message: "User not found" });
        } 
        else {
            return res.json({ message: "User deleted successfully" });
        }
    }

    catch (error) {
        console.error("Error deleting User:", error);
        return res.status(500).send("Error deleting User");
    }

    
}

//put
export const updateUsers = async (req, res) => {
    try{
        const id = req.params.id;
        const data = req.body;

        const parseU = userSchema.safeParse(data);
        if (!parseU.success) {
            return res.status(400).json({
                errors: parseU.error.errors
            })
        }

        const rows = await updateUserid(id, data);
        res.json(rows);
    }

    catch (error) {
        console.error("Error updating User:", error);
        res.status(500).send("Error updating User");
    }
}