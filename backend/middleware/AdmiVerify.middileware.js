import jwt from "jsonwebtoken"
import { User } from "../models/user.models.js"

 const adminverifyjwt = async(req ,resp , next)=>{
	try {
		const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
		
		if(!token) {
			return resp.status(401).json({message : "no token found"})
		}

		const decodetoken = jwt.verify(token , process.env.ACCESS_TOKEN_SECRET)
		
		const user = await User.findById(decodetoken?.userId)

		if(!user.isAdmin){
		return resp.status(401).json({message : "user not admin"})
		}
		
		req.user = user
		next()
	} catch (error) {
		resp.status(401).json({message : " no data found verifyjet failed" , error : error?.message})
	}
}

export default adminverifyjwt;