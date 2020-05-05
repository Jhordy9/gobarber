import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import User from '../models/User';
import uploadConfig from '../config/upload';
import AppError from '../errors/AppError';

interface Request {
  user_id: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename }: Request): Promise<User> {
    const userRepository = getRepository(User);

    // Buscando usuário já cadastrado no banco
    const user = await userRepository.findOne(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can change avatar', 401);
    }

    if (user.avatar) {
      // Deletar avatar anterior
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      // Checar se o arquivo realmente existe
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      // Verificando se o arquivo existe e deletando caso exista
      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    // Atualizando o avatar caso passe todas as verif
    user.avatar = avatarFilename;

    // Salvando o novo avatar
    await userRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
