import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService';
import ListAllAppointmentsFromBarber from '@modules/appointments/services/ListAllAppointmentsFromBarber';

export default class ProviderAppointmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const provider_id = request.user.id;
    const { year, month, day } = request.query;

    const listProviderAppointments = container.resolve(
      ListProviderAppointmentsService,
    );

    const appointments = await listProviderAppointments.execute({
      provider_id,
      day: Number(day),
      month: Number(month),
      year: Number(year),
    });

    return response.json(classToClass(appointments));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const provider_id = request.user.id;

    const listAllAppointments = container.resolve(
      ListAllAppointmentsFromBarber,
    );

    const allAppointments = await listAllAppointments.execute({
      provider_id,
    });

    return response.json(allAppointments);
  }
}
