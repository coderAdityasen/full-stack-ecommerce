import { Router } from "express";
import { verifyjwt } from "../middleware/verifyjwt.js";
import { createOrder, getAllOrders, getUserOrders, updateOrderStatus,  } from "../controllers/order.controller.js";
import adminverifyjwt from "../middleware/AdmiVerify.middileware.js"

const orderRoute = Router()

orderRoute.route("/createorder").post(verifyjwt , createOrder)
orderRoute.route("/getorder").get(verifyjwt , getUserOrders)
orderRoute.route("/getallorder").get(adminverifyjwt , getAllOrders)
orderRoute.route("/updatestatus/:orderid").post(adminverifyjwt , updateOrderStatus)

export default orderRoute