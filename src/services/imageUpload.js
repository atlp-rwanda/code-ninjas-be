import uploader from '../config/cloudinary.config';

const blogImage = async (req) => {
  const tmp = req.files.profileImage.tempFilePath;
  const Result = await uploader.upload(
    tmp,
    { folder: 'Barefoot Nomad' },
    (_, result) => result
  );
  return Result;
};

export default blogImage;
