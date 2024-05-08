import mongoose from "mongoose";


const userSchema = mongoose.Schema(
	{
        username: {
            type: String,
            required: true,
            unique: true,
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowecase: true,
            trim: true, 
        },
        fullName: {
            type: String,
            required: true,
            trim: true, 
            index: true
        },
       
        password: {
            type: String,
            required: [true, 'Password is required']
        },
        isAdmin : {
            type : Boolean,
            default : false
        },
        refreshToken: {
            type: String,
          },
          avatar : {
            type : String,
          }
} , {timestamps: true})

userSchema.method()
export const User = mongoose.model("User" ,userSchema )

