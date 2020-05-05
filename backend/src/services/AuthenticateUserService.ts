import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '../config/auth';
import AppError from '../errors/AppError';

import User from '../models/User';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    // user.password  - Senha criptografada - Senha do banco de dados
    // password - Senha não-criptografada -> Usuário tentando entrar
    // Retorna um boolean, true or false
    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    /**
     * Primeiro parâmetro ficara dentro do token, porém não seguro, utilzizar para
     * informações que será utilizada no frontend de maneira mais direta
     * Segundo parâmetro é uma chave secreta, md5.cz para gerar uma string única
     * Terceiro parâmetro são várias configurações do token
     */
    const { secret, expiresIn } = authConfig.jwt;
    const token = sign({}, secret, {
      // Sempre será o id do usuário
      subject: user.id,
      // Quando tempo irá durar a sessão logada do usuário
      expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
