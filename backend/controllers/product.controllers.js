import { Product } from "../models/product.models.js";
import { Comment } from "../models/productComments.models.js";
import uploadonclodinary from "../utils/cloudinary.js";

export const getproducts = async (req,resp) =>{
	try {
		const products = await Product.find();
		resp.status(200).json({
			success: true,
			data : products
		})
	} catch (error) {
		resp.status(401).json({message : "no data found"})
	}
}

export const getsingleproduct = async (req, resp)=>{
	try {
		const productId = req.params.productId;
		const product = await Product.findById(productId);

		resp.status(200).json({success : true , product : product})
	} catch (error) {
		resp.status(400).json({message : "failed to fetch the product"})
	}
}

export const createproducts = async(req, resp)=>{
	try {
		const {title , description , price , stock , image} = req.body
		
			

		
		const createdProduct = await new Product({
			title,
			description,
			price,
			stock,
			image
		})

		const saveproduct = await createdProduct.save()
		
		return resp.status(201).json({ success: true, message: "product created successfully", data: saveproduct });
    

	} catch (error) {
		resp.status(400).json({message : "plz fill all the details"});
	}
}

export const deleteproduct = async (req, resp) => {
	try {
	  const product = await Product.findById(req.params.id);
	 
	  if (!product) {
		return resp.status(400).json({ message: "Error: No product found with the provided ID" });
	  }
  
	  await product.deleteOne();
  
	  return resp.status(200).json({ message: "Product deleted successfully" });
	} catch (error) {
	  console.error("Error deleting product:", error);
	  return resp.status(500).json({ message: "Server error" });
	}
  };
 
  export const createproductcomment = async (req, resp) => {
	try {
	  const { content, product, owner } = req.body;
  
	  // Assuming you have a 'User' model
	  const commentWithUsername = await new Comment({
		content,
		product,
		owner // Assuming 'owner' is the user's ObjectId
	  }).populate('owner', 'username'); // Populate 'owner' field with 'username'
  
	  const newcomment = await commentWithUsername.save();
  
	  resp.status(200).json({ status: true, data: newcomment });
	} catch (error) {
	  resp.status(400).json({ message: "Comment failed" });
	}
  };
  


  export const getCommentsByProduct = async (req, res) => {
	try {
	  const { productId } = req.params;
  
	  // Populate 'owner' field with 'username' before fetching comments
	  const comments = await Comment.find({ product: productId }).populate('owner', 'username');
	  
	  res.status(200).json({ comments: comments });
	} catch (error) {
	  res.status(500).json({ error: 'Internal Server Error' });
	}
  };
  

  export const addToWishlist = async (req , resp)=>{
	try {
	
	} catch (error) {
		resp.status(400).json({message : "failed to add to wishlist"})
	}
  }

  export const removeFromWishList = async (req , resp)=>{
	try {
		
	} catch (error) {
		
	}
  } 