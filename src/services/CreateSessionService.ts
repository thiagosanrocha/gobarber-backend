import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import Users from '../models/Users';

import tokenConfig from '../configs/token';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: Users;
  token: string;
}

class CreateSessionService {
  public async execute({ email, password }: Request): Promise<Response> {
    const usersRepository = getRepository(Users);

    const findUser = await usersRepository.findOne({ where: { email } });

    if (!findUser) {
      throw new Error('Invalid email/password combination');
    }

    const user = findUser;

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error('Invalid email/password combination');
    }

    const token = sign({}, tokenConfig.secretKey, {
      subject: user.id,
      expiresIn: tokenConfig.expiresIn,
    });

    delete user.password;

    return {
      user,
      token,
    };
  }
}

export default CreateSessionService;
