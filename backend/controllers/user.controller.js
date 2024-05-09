import { User } from "../models/user.models.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";


import uploadonclodinary from "../utils/cloudinary.js";


export const registerUser = async (req, resp) => {
    try {
        const { username, email, fullName, password } = req.body;

        // Check if all required fields are provided
        if (![username, email, fullName, password].every(field =>  field.trim() !== "")) {
            return resp.status(400).json({ message: "All fields are required" });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return resp.status(409).json({ message: "User already exists" });
        }

        const hashPassword = await bcryptjs.hash(password, 10);

        // Create a new user instance
        const newUser = new User({
            username,
            email,
            fullName,
            password : hashPassword
        });
        // Save the new user to the database
        const savedUser = await newUser.save();

        return resp.status(201).json({ success: true, message: "User created successfully", data: savedUser });
    } catch (error) {
         resp.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const login = async(req ,resp)=>{
    const { email , password} = req.body;

    
    const user = await User.findOne({email})
    const isMatched = await bcryptjs.compare(password , user.password)

    if (!user || !isMatched) {
        return resp.status(400).json({ message: "Invalid username or password" });
    } 

      // Generate access token
  const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d" });

  // Generate refresh token
  const refreshToken = jwt.sign({ userId: user._id }, process.env.REFRESH_TOKEN_SECRET );

  // Save refresh token to user document
  user.refreshToken = refreshToken;
  await user.save();

  // Set access token as a cookie
  resp.cookie("accessToken", accessToken, { httpOnly: true });


    return resp.status(200).json({message : "user login successfully" , data : {
        _id: user._id,
        username : user.username,
        fullname: user.fullName,
        email: user.email,
        isAdmin : user.isAdmin,
        avatar : user.avatar
    }})
}

export const getallUser = async(_,resp)=>{
    try {
        const user = await User.find()

        resp.status(201).json({message : "all user found" , user : user})
    } catch (error) {
        resp.status(400).json({message : "failed to fetch" })
    }
}

export const updateavatar = async(req ,resp)=>{
    try {
        const ownerid = req.params.userid
        const user = await User.findById(ownerid);
        const localimage = req.file.path;
        const avatar = await uploadonclodinary(localimage)
        user.avatar = avatar.url
       const updateduser = await user.save()
        return resp.status(200).json({ message: "Avatar updated successfully" , data : updateduser});
    } catch (error) {
        console.log(error);
        resp.status(400).json({message : "failed to update avatar"})
    }
}

export const updateprofile = async(req , resp)=>{
    try {
       
    } catch (error) {
        resp.status(400).json({message : "failed to update used"})
    }
}

export const forgetPassword = async (req, res) => {
    // Logic for forget password
};

export const resetPassword = async (req, res) => {
    // Logic for reset password
};