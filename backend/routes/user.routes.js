import { Router } from "express";
import {  getallUser, login, registerUser } from "../controllers/user.controller.js";


const userRoutes = Router()

userRoutes.route("/signup").post(registerUser)
userRoutes.route("/users").get(  getallUser)
userRoutes.route("/login").post(login)

export default userRoutes
