import { inject, injectable } from 'tsyringe';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
}

type IResponse = Array<{
  id: string;
  provider_id: string;
  date: Date;
}>;

@injectable()
class ListAllAppointmentsFromBarber {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {
    /** */
  }

  public async execute({ provider_id }: IRequest): Promise<IResponse> {
    const data = await this.appointmentsRepository.findAllAppointmentsFromBarber(
      { provider_id },
    );

    return data;
  }
}

export default ListAllAppointmentsFromBarber;
