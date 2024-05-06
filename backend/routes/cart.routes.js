import { Router } from "express";
import { addToCart, decrement, deleteCartItem, getCartItem } from "../controllers/Cart.controller.js";
import { verfiyUser } from "../middleware/userverify.js";


const cartRoutes = Router()

cartRoutes.route("/addtocart/:userid").post( verfiyUser , addToCart)
cartRoutes.route("/cartitems/:userid").get( verfiyUser , getCartItem)
cartRoutes.route("/decerment/:userid").post( verfiyUser , decrement)
cartRoutes.route("/deletecartproduct/:userid").post( verfiyUser , deleteCartItem)


export default cartRoutes;