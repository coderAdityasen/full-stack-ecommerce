import { Router } from "express";
import {  getallUser, login, registerUser, updateavatar } from "../controllers/user.controller.js";
import { verifyAdmin } from "../middleware/auth.middleware.js";
import { verfiyUser } from "../middleware/userverify.js";
import upload from "../middleware/multer.middleware.js";


const userRoutes = Router()

userRoutes.route("/signup").post(registerUser)
userRoutes.route("/users").get(verifyAdmin , getallUser)
userRoutes.route("/login").post(login)
userRoutes.route("/updateavatar/:userid").post(verfiyUser ,upload.single("avatar"), updateavatar)

export default userRoutes
