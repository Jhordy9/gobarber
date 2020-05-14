import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';

interface TokenPayLoad {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  // Primeira verificação, verica se o token foi informado
  if (!authHeader) {
    throw new AppError('JWT token is missing', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    // verify irá verificar se o token enviado pelo frontend é o que correto
    // verify possui uma mensagem de erro padrão, porém não é a melhor opção
    const decoded = verify(token, authConfig.jwt.secret);

    // O decoded indica que possui dois formatos
    // Utilizando o as é possível forçar um formato
    const { sub } = decoded as TokenPayLoad;

    // Agora utilizando um request.user em quaalquer rota é possível saber qual
    // É a id do usuário que ta solicitando alguma requisição
    request.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new AppError('Invalid JWT token', 401);
  }
}
