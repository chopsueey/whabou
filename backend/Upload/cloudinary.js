//1 import cloudinary from 'cloudinary';
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

//2 configure cloudinaryd
cloudinary.config({ 
    cloud_name: 'dp2foa50s', 
    api_key: '355389614935124', 
    api_secret: 'f5DdPVE7DFZtopFjw2sH425aqqY' 
  });

//3 export cloudinary
export { cloudinary };