import { Router } from 'express';
import { startOfHour, parseISO } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

const appointmentsRouter = Router();

const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.get('/', (request, response) => {
  const allAppointments = appointmentsRepository.all();

  return response.json(allAppointments);
});

appointmentsRouter.post('/', (request, response) => {
  const { provider, date } = request.body;

  if (!provider || !date)
    return response.status(400).json({
      error: 400,
      message: 'Provider or Date was not send.',
    });

  const dateWithoutMinutesSeconds = startOfHour(parseISO(date));

  const findAppointmentInSameDate = appointmentsRepository.findByDate(
    dateWithoutMinutesSeconds,
  );

  if (findAppointmentInSameDate)
    return response.status(400).json({
      error: 400,
      message: 'This appointment is already booked',
    });

  const appointment = appointmentsRepository.create({
    provider,
    date: dateWithoutMinutesSeconds,
  });

  return response.json(appointment);
});

export default appointmentsRouter;
