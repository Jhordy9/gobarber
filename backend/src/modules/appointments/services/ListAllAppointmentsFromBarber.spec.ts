// import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import ListAllAppointmentsFromBarber from '@modules/appointments/services/ListAllAppointmentsFromBarber';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listAllAppointmentsFromBarber: ListAllAppointmentsFromBarber;
let fakeCacheProvider: FakeCacheProvider;

describe('listProviderAppointments', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeCacheProvider = new FakeCacheProvider();

    listAllAppointmentsFromBarber = new ListAllAppointmentsFromBarber(
      fakeAppointmentsRepository,
      fakeCacheProvider,
    );
  });

  it('Shoud be able to list the appointments on a specific day', async () => {
    const appointment1 = await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2020, 4, 20, 14, 0, 0),
      type: 'cabelo/barba',
    });

    const appointment2 = await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2020, 4, 20, 15, 0, 0),
      type: 'cabelo/barba',
    });

    const appointments = await listAllAppointmentsFromBarber.execute({
      provider_id: 'provider',
    });

    expect(appointments).toEqual([appointment1, appointment2]);
  });
});
