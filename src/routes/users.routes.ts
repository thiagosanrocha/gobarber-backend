// Modules
import { Router } from 'express';
import multer, { diskStorage } from 'multer';
import { resolve } from 'path';
import { v4 as uuid } from 'uuid';

// Services
import CreateUserService from '../services/CreateUserService';
import ensureAuthentication from '../middlewares/ensureAuthentication';

const usersRouter = Router();

const upload = multer({
  storage: diskStorage({
    destination: resolve(__dirname, '..', '..', 'tmp'),
    filename: (request, file, callback) => {
      const fileName = `${uuid().replace('-', '')}-${file.originalname}`;

      callback(null, fileName);
    },
  }),
});

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const newUser = await createUser.execute({
      name,
      email,
      password,
    });

    return response.json(newUser);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

usersRouter.patch(
  '/avatar',
  ensureAuthentication,
  upload.single('avatar'),
  async (request, response) => {
    console.log(request.file);
    return response.json({ ok: true });
  },
);

export default usersRouter;
