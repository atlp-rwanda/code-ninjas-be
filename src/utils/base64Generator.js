import DataURI from 'datauri/parser';
import path from 'path';

const dataUri = new DataURI();

const base64FileStringGenerator = (req) => {
  return dataUri.format(
    path.extname(req.file.originalname).toString(),
    req.file.buffer
  );
};

export default base64FileStringGenerator;
