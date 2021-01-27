import { Express } from 'express';
import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import User from '../models/Users';
import avatarUploadConfigs from '../configs/avatarUpload';
import AppError from '../errors/AppError';

interface Request {
  user_id: string;
  avatar: Express.Multer.File;
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatar }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(user_id);

    if (!user)
      throw new AppError('Only existing users can change avatar.', 400);

    if (user.avatar) {
      const userAvatarFilePath = path.join(
        avatarUploadConfigs.directory,
        user.avatar,
      );

      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.rm(userAvatarFilePath);
      }
    }

    user.avatar = avatar.filename;

    await usersRepository.update(user.id, { avatar: avatar.filename });

    delete user.password;

    return user;
  }
}

export default UpdateUserAvatarService;
