import uploader from '../config/cloudinary.config';

const profilePhoto = async (req) => {
  try {
    const tmp = req.files.image.tempFilePath;
    const Result = await uploader.upload(
      tmp,
      { folder: 'Barefoot Nomad' },
      (_, result) => result
    );
    return Result;
  } catch (error) {
    console.log(error);
  }
};

export default profilePhoto;
