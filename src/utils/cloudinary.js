import {v2 as cloudinary} from "cloudinary"
import exp from "constants";
import fs from "fs"


cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadOnCloudinary = async (localFilePath) =>{
    try {
        if(!localFilePath) return null;
        //upload the file in cloudinaory
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type:"auto"
        })
        fs.unlinkSync(localFilePath) // Remove the locally save temp file as the upload operation failed
        //file has been uploaded successfully
        // console.log("File is uploaded on cloudinaory...!", response.url);
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath) // Remove the locally save temp file as the upload operation failed
        console.log("Erroe", error);
        return null
    }
}

export {uploadOnCloudinary}