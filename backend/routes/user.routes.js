import { Router } from "express";
import {
  addAddress,
  forgetPassword,
  getCurrUser,
  getallUser,
  login,
  logout,
  registerUser,
  resetPassword,
  updateavatar,
  updateprofile,
} from "../controllers/user.controller.js";
import { verifyAdmin } from "../middleware/auth.middleware.js";
import upload from "../middleware/multer.middleware.js";
import { verifyjwt } from "../middleware/verifyjwt.js";

const userRoutes = Router();

userRoutes.route("/signup").post(registerUser);
userRoutes.route("/users").get(verifyAdmin, getallUser);
userRoutes.route("/login").post(login);
userRoutes.route("/curruser").get(verifyjwt, getCurrUser);
userRoutes.route("/updateprofile").post(verifyjwt, updateprofile);
userRoutes.route("/logout").get(verifyjwt, logout);
userRoutes.route("/createnewaddress").get(verifyjwt, addAddress);

userRoutes.route("/updateavatar").post(updateavatar);

// do it later
userRoutes.route("/forgetPassword").post(forgetPassword);
userRoutes.route("/reset-password/:token").post(resetPassword);

export default userRoutes;
