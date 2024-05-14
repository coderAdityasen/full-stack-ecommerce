import mongoose, { Schema } from "mongoose"

const adressSchema = mongoose.Schema({
	user : {
		type :  Schema.Types.ObjectId,
		ref : 'user',
		required : true
	},
	email : {
		type : String,
		required : true
	},
	landmark : {
		type : String,
		required : true
	},
	address : {
		type : String,
		required : true
	},
	firstName : {
		type : String,
		required : true
	} , 
	lastName : {
		type : String,
		required : true
	},
	phoneNumber : {
		type : Number,
		required : true
	},
	alternateNumber : {
		type : Number,
		required : true
	}

})

export const Address = mongoose.model("Address" , adressSchema)