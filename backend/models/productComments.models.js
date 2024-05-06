import mongoose, { Schema } from "mongoose";

const commentSchema = mongoose.Schema({
	content : {
		type : String
	},
	product : {
		type : Schema.Types.ObjectId,
		ref : "Product"
	},
	owner : {
		type : Schema.Types.ObjectId,
		ref : "User"
	},
	

} ,  {timestamps: true})

export const Comment = mongoose.model("Comment" , commentSchema)