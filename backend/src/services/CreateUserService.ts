import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import AppError from '../errors/AppError';

import User from '../models/User';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  async execute({ name, email, password }: Request): Promise<User> {
    const userRespository = getRepository(User);

    const checkUserExists = await userRespository.findOne({
      where: { email },
    });

    if (checkUserExists) {
      throw new AppError('Email address already used.');
    }

    const hashedPassword = await hash(password, 8);

    const user = userRespository.create({
      name,
      email,
      password: hashedPassword,
    });

    await userRespository.save(user);

    return user;
  }
}

export default CreateUserService;
