import { EntityRepository, Repository } from 'typeorm';

import Appointment from '../models/Appointment';

/**
 * O parâmetro para esse decorator (EntityRepository) é o model Appointment.
 *
 * Extendendo a classe com o Repository e passando como tipagem o Appointment,
 * Esse repository possui métodos de criação, listagem, update e delete.
 */
@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {
  // A partir do momento que a função é async e o retorno dela sempre é uma Promise
  // Dentro da <> será indicado qual será o retorno dessa Promise
  public async findByDate(date: Date): Promise<Appointment | null> {
    // Buscando o método findOnd disponível no Repository
    // O findOnd irá receber uma condição
    // Encontrar um appointment onde as dates sejam iguais
    const findAppointment = await this.findOne({
      where: { date },
    });

    return findAppointment || null;
  }
}

export default AppointmentsRepository;
