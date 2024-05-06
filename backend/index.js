import mongoose from "mongoose";
import { app } from "./app.js";
import dotenv from "dotenv";

dotenv.config()


const connectToDb = async()=> {
	try {
		const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/ecommerce`)
		console.log("mongodb connected");
	} catch (error) {
		console.log("error in db connect");
	}
}
connectToDb()
.then(()=>{
	app.listen(process.env.PORT || 3000 , ()=>{
		console.log(`server is running at port ${process.env.PORT}`);
	})
})
.catch((error)=>{
	console.log("mongodb connection failed");
})

