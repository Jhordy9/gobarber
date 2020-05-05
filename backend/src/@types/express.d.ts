/**
 * Adicionando uma informação nova dentro da biblioteca Express
 * Dentro do Request
 */
declare namespace Express {
  export interface Request {
    user: {
      id: string;
    };
  }
}
