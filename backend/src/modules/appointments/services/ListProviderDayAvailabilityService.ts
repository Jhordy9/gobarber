import { injectable, inject } from 'tsyringe';
import { isAfter, format, formatISO9075 } from 'date-fns';

import IAppontmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
  day: number;
  month: number;
  year: number;
}

type IResponse = Array<{
  fullHour: any;
  halfHour: any;
  hour: number;
  fullHourAvailable: boolean;
  halfHourAvailable: boolean;
}>;

@injectable()
class ListProviderDayAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppontmentsRepository,
  ) {
    /** */
  }

  public async execute({
    provider_id,
    year,
    month,
    day,
  }: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentsRepository.findAllInDayFromProvider(
      {
        provider_id,
        year,
        month,
        day,
      },
    );

    const hourStart = 8;

    const eachHourArray = Array.from(
      { length: 10 },
      (_, index) => index + hourStart,
    );

    const currentDate = new Date(Date.now());

    const availability = eachHourArray.map(hour => {
      const compareFullHour = new Date(year, month - 1, day, hour);
      const compareHalfHour = new Date(year, month - 1, day, hour, 30);

      const hasAppointmentInFullHour = appointments.find(
        appointment =>
          formatISO9075(appointment.date.setSeconds(0)) ===
          formatISO9075(compareFullHour.setSeconds(0)),
      );

      const hasAppointmentInHalfHour = appointments.find(
        appointment =>
          formatISO9075(appointment.date.setSeconds(0)) ===
          formatISO9075(compareHalfHour.setSeconds(0)),
      );

      return {
        hour,
        fullHour: format(new Date().setHours(hour), 'HH:00'),
        fullHourAvailable:
          !hasAppointmentInFullHour && isAfter(compareFullHour, currentDate),
        halfHour: format(new Date().setHours(hour), 'HH:30'),
        halfHourAvailable:
          !hasAppointmentInHalfHour && isAfter(compareHalfHour, currentDate),
      };
    });

    return availability;
  }
}

export default ListProviderDayAvailabilityService;
