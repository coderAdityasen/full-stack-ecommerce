import mongoose from "mongoose";

const productSchema = mongoose.Schema({
	title : {
		type : String,
		required : true
	},
	description : {
		type : String,
		required : true
	},
	price : {
		type : Number,
		required : true
	},
	image : {
		type : String,
		required : true
	},
	stock : {
		type : Number,
		required : true
	}

} , {timestamps: true})

export const Product = mongoose.model("Product" , productSchema)