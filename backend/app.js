import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";


const app = express()

app.use(
	cors({
		origin:"https://indoridukan.vercel.app",
	  credentials: true,
	})
  );
  
  
  app.use(express.json({limit: "16kb"}))
  app.use(express.urlencoded({extended: true, limit: "16kb"}))
  app.use(express.static("public"))
  app.use(cookieParser())



//routes

import productRouter from "./routes/product.routes.js";
import userRoutes from "./routes/user.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import openairoutes from "./routes/openai.routes.js";
import orderRoute from "./routes/Order.routes.js";


app.use("/api" , productRouter)
app.use("/user" , userRoutes)
app.use("/cart" , cartRoutes)
app.use("/openai" , openairoutes)
app.use("/order" ,orderRoute)
export {app}
