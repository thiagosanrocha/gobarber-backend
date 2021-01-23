import multer, { diskStorage } from 'multer';
import { resolve } from 'path';
import crypto from 'crypto';

export default multer({
  storage: diskStorage({
    destination: resolve(__dirname, '..', '..', 'tmp'),
    filename: (request, file, callback) => {
      const hash = crypto.randomBytes(10).toString('hex');

      const fileName = `${hash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
});
