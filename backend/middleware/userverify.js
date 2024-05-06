import { User } from "../models/user.models.js";

export const verfiyUser = async (req, resp, next) => {
    try {
        const id = req.params.userid; // Assuming the user ID is passed as a query parameter named "id"
       
        if (!id) {
            return resp.status(400).json({ message: "User ID is required" });
        }
        
        const user = await User.findById(id);
        if (!user) {
            return resp.status(404).json({ message: "User not found" });
        }
        next();
    } catch (error) {
        return resp.status(500).json({ message: "Internal server error" });
    }
};
