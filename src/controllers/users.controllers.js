import { getU, getUid, createU, deleteUid, updateUid} from '../models/users.model';

//get
export const getusers = async (req, res) => {
    try{
        const rows = await getU();
        res.json(rows);
    }

    catch (error){
        console.error("Error getting User:", error);
        res.status(500).send("Error getting User");
    }
}

export const getUserid = async (req, res) => {
    try{
    const id=req.params.id;
    const rows = await getUid(id);

    if (!rows || rows.length === 0) {
        return res.status(404).json({ message: "User not found"});
    }
    res.json(rows);

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
        const rows = await createU(data);
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
        const rows = await deleteUid(id);

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
        const rows = await updateUid(id, data);
        res.json(rows);
    }

    catch (error) {
        console.error("Error updating User:", error);
        res.status(500).send("Error updating User");
    }
}