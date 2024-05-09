import * as dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.API_KEY);


export const getdata = async (req , resp)=>{
try {
	
		const {message} = req.body
		console.log(message);
		const model = genAI.getGenerativeModel({ model: "gemini-pro"});
	
	  const chat = model.startChat({
	    history: [
	      {
	        role: "user",
	        parts: [{ text: "Hello,give output with using some funny emojis to make conversation intresting" }],
	      },
	      {
	        role: "model",
	        parts: [{ text: "ok sir from now onwards my every response will contain some emojy " }],
	      },
	    ],
	    generationConfig: {
	      maxOutputTokens: 100,
	    },
	  });
	  const result = await chat.sendMessage(message);
	  const response = await result.response;
	  const text = response.text();
	
	  resp.status(200).json({message : true , data : text})
} catch (err) {
	resp.status(400).json({message : "error in aidata controller"} )
}

}

