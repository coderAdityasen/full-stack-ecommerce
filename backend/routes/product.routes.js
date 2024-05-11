import { Router } from "express";
import { getproducts , createproducts, deleteproduct, getsingleproduct, createproductcomment, getCommentsByProduct } from "../controllers/product.controllers.js";
import upload from "../middleware/multer.middleware.js"
import { verfiyUser } from "../middleware/userverify.js";

const productRouter = Router()

productRouter.route("/products/create").post( upload.fields([
		{
			name : "image",
			maxCount : 1
		}
	])
	,  createproducts
)

productRouter.route("/products").get(getproducts)
productRouter.route("/products/comments/:productId").get(getCommentsByProduct)
productRouter.route("/products/:productId").get(getsingleproduct)
productRouter.route("/delete/:id").get(deleteproduct);
productRouter.route("/product/comment/:userid").post( verfiyUser, createproductcomment);



export default productRouter;