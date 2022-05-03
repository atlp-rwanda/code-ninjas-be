import dotenv from 'dotenv';
import cloudinary from 'cloudinary';

dotenv.config();

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/*
 * @description this function uploads only a profile picture to coudinary
 * @param base64 string generated from image file buffer
 * @return coudinary url for the image
 */
const uploadProfilePic = async (pictureFileString, upload_preset_value) => {
  const uploaded_pic_url = await cloudinary.v2.uploader.upload(
    pictureFileString,
    {
      upload_preset: upload_preset_value,
    }
  );
  return uploaded_pic_url;
};

const uploadAccommodationPic = async (pictureString, upload_preset_value) => {
  const uploaded_picture = await cloudinary.v2.uploader.upload(pictureString, {
    upload_preset: upload_preset_value,
  });

  return uploaded_picture;
};

export default { uploadProfilePic, uploadAccommodationPic };
