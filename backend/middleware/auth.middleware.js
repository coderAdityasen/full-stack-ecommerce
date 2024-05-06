import { User } from "../models/user.models.js";

export const verifyAdmin = async (req, resp, next) => {
    try {
        const id = req.params.userid; // Assuming the user ID is passed as a query parameter named "id"
       
        if (!id) {
            return resp.status(400).json({ message: "User ID is required" });
        }
        
        const user = await User.findById(id);
        if (!user) {
            return resp.status(404).json({ message: "User not found" });
        }
        
        if (!user.isAdmin) {
            return resp.status(403).json({ message: "You are not an admin" });
        }

        // If the user is an admin, proceed to the next middleware or route handler
        next();
    } catch (error) {
        console.log("Error in verifyAdmin middleware:", error);
        return resp.status(500).json({ message: "Internal server error" });
    }
};
