// Modules
import { Router } from 'express';
import multer from 'multer';

// Services & Middlewares & Configs
import CreateUserService from '../services/CreateUserService';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';
import ensureAuthentication from '../middlewares/ensureAuthentication';
import avatarUploadConfigs from '../configs/avatarUpload';

const usersRouter = Router();

const uploadAvatar = multer(avatarUploadConfigs);

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
  uploadAvatar.single('avatar'),
  async (request, response) => {
    try {
      const user_id = request.user.id;

      const avatar = request.file;

      const updateUserAvatar = new UpdateUserAvatarService();

      const user = await updateUserAvatar.execute({ user_id, avatar });

      return response.json(user);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  },
);

export default usersRouter;
