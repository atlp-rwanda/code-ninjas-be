import multer from 'multer';

const storage = multer.memoryStorage();
const multerAccommodationUploads = multer({ storage }).single('photoUrl');

export default multerAccommodationUploads;
