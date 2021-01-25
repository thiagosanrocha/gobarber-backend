import multer, { Options } from 'multer';
import path from 'path';
import crypto from 'crypto';

type uploadConfigs = Options & { directory: string };

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

const avatarUploadConfigs: uploadConfigs = {
  directory: tmpFolder,
  storage: multer.diskStorage({
    destination: tmpFolder,
    filename: (request, file, callback) => {
      const hash = crypto.randomBytes(10).toString('hex');

      const fileName = `${hash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};

export default avatarUploadConfigs;
