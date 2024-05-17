import { User } from "../models/user.models.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import uploadonclodinary from "../utils/cloudinary.js";
import { Address } from "../models/Address.models.js";

export const registerUser = async (req, resp) => {
  try {
    const { username, email, fullName, password } = req.body;

    // Check if all required fields are provided
    if (
      ![username, email, fullName, password].every(
        (field) => field.trim() !== ""
      )
    ) {
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
      password: hashPassword,
    });
    // Save the new user to the database
    const savedUser = await newUser.save();

    return resp
      .status(201)
      .json({
        success: true,
        message: "User created successfully",
        data: savedUser,
      });
  } catch (error) {
    resp.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const login = async (req, resp) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    const isMatched = await bcryptjs.compare(password, user.password);
    if (!user || !isMatched) {
      return resp.status(400).json({ message: "Invalid username or password" });
    }
    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    const refreshToken = jwt.sign(
      { userId: user._id },
      process.env.REFRESH_TOKEN_SECRET
    );
    user.refreshToken = refreshToken;
    await user.save();

    const options = {
      httpOnly: true,
      sameSite: 'none',
      secure: true
  }
  
    return resp
      .status(200)
      .cookie("refreshToken", refreshToken , options)
      .cookie("accessToken", accessToken , options)
      .json({
        message: "user login successfully",
        data: {
          _id: user._id,
          username: user.username,
          fullname: user.fullName,
          email: user.email,
          isAdmin: user.isAdmin,
          avatar: user.avatar,
          accessToken: accessToken,
          refreshToken: refreshToken,
        },
      });
  } catch (error) {
    resp.status(400).json({message : "user not found"})
  }
};

export const getallUser = async (_, resp) => {
  try {
    const user = await User.find();

    resp.status(201).json({ message: "all user found", user: user });
  } catch (error) {
    resp.status(400).json({ message: "failed to fetch" });
  }
};

export const updateavatar = async (req, resp) => {
  try {
    const ownerid = req.user._id;
    const {avatar} = req.body
    const user = await User.findById(ownerid);
    user.avatar = avatar;
    await user.save();
    return resp
      .status(200)
      .json({ message: "Avatar updated successfully", avatar : avatar });
  } catch (error) {
    console.log(error);
    resp.status(400).json({ message: "failed to update avatar" });
  }
};

export const getCurrUser = async (req, resp) => {
  return resp.status(200).json({ user: req.user, message: "user fetched" });
};

export const logout = async (req, resp) => {
  try {
    // Update refreshToken to undefined
    await User.findByIdAndUpdate(
      req.user._id,
      {
        $set: {
          refreshToken: undefined,
        },
      },
      {
        new: true,
      }
    );

    const options = {
      httpOnly: true,
      sameSite: 'none',
      secure: true
  }
  
    resp.clearCookie("accessToken" , options);
    resp.clearCookie("refreshToken" , options);

    return resp.status(200).json({ message: "User logout successfully" });
  } catch (error) {
    return resp.status(400).json({ message: "Failed to logout" });
  }
};

export const updateprofile = async (req, resp) => {
  try {
    //get profile updation data from body
    const { fullName, email } = req.body;
    if (!fullName || !email) {
      return resp
        .status(400)
        .json({ message: "fullname and email are required" });
    }

    const existingemail = await User.findOne({ email });
    if (existingemail) {
      return resp.status(401).json({ message: "email is already register" });
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        $set: {
          fullName,
          email,
        },
      },
      { new: true }
    ).select("-password");

    return resp
      .status(200)
      .json({ message: "profile updated successfully", data: user });
  } catch (error) {
    resp.status(400).json({ message: "failed to update used" });
  }
};

export const addAddress = async (req, resp)=>{
  try {
    const user = User.findById(req.user._id)
    const {email , landmark , address , firstName ,lastName , phoneNumber, alternateNumber } = req.body
    const newaddress = new Address({
      email , user , landmark , address , firstName ,lastName , phoneNumber, alternateNumber
    })
    const addedAdrress = newaddress.save()

    return resp.status(200).json({address : addedAdrress , message : true})
  } catch (error) {
    console.log(error);
    resp.status(400).json({message : "no address saved"})
  }
}

export const forgetPassword = async (req, res) => {
  // Logic for forget password
};

export const resetPassword = async (req, res) => {
  // Logic for reset password
};

