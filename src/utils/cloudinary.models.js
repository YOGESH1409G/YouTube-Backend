import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadToCloudinary = async (filePath, folder) => {
    try {
        const result = await cloudinary.uploader.upload(filePath, {
            folder: folder,
            resource_type: "auto",
        });
        // Remove the file from local uploads folder
        fs.unlinkSync(filePath);
        return {
            url: result.secure_url,
            public_id: result.public_id,
        };
    } catch (error) {
        // Remove the file from local uploads folder in case of error too
        fs.unlinkSync(filePath);
        throw error;
    }
};

export { uploadToCloudinary };