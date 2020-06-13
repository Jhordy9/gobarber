import { ValidationError } from 'yup';

interface Errors {
  [key: string]: string;
}
/**
 * ValidationError -> Irá disponibilizar a tipagem com todas as propriedades.
 *
 * Interface -> [key: string] significa que irá vir qualquer string
 * (key é indiferente) com outra string, isso deixara mais dinâmico, pois nunca
 * irá saber ao certo quantos campos terá o form.
 */
export default function getValidationErrors(err: ValidationError): Errors {
  const validationErrors: Errors = {};

  /**
   * O erros estão dentro do err.inner e para cada um desses erros será percorrido
   * irá pegar a validationErrors e criar uma propriedade com o nome error.path
   * e o valor dela sera o error.message
   *
   * o path seria o nome do input e a message é a mensagem de error que ela possui
   */
  err.inner.forEach((error) => {
    validationErrors[error.path] = error.message;
  });

  return validationErrors;
}
