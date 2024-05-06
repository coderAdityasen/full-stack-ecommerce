import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({ 
  cloud_name: process.env.CLODINARY_CLOUD_NAME, 
  api_key: process.env.CLODINARY_API_KEY, 
  api_secret: process.env.CLODINARY_API_SECRET 
});

const uploadonclodinary = async (localfilepath) => {
    try {
        const response = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload(localfilepath, { public_id: "product_image" }, (error, result) => {
                if (error) reject(error);
                else resolve(result);
            });
        });
        fs.unlinkSync(localfilepath); // remove the locally saved temporary file after successful upload
        return response;
    } catch (error) {
        fs.unlinkSync(localfilepath); // remove the locally saved temporary file as the upload operation failed
        console.error("Error uploading file to Cloudinary:", error);
        throw error; // rethrow the error to indicate failure
    }
};

export default uploadonclodinary;
