import { inject, injectable } from 'tsyringe';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import { classToClass } from 'class-transformer';

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

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {
    /** */
  }

  public async execute({ provider_id }: IRequest): Promise<IResponse> {
    const cacheKey = `provider-appointments:${provider_id}`;

    let data = await this.cacheProvider.recovery<IResponse>(cacheKey);

    if (!data) {
      data = await this.appointmentsRepository.findAllAppointmentsFromBarber({
        provider_id,
      });

      await this.cacheProvider.save(cacheKey, classToClass(data));
    }

    return data;
  }
}

export default ListAllAppointmentsFromBarber;
