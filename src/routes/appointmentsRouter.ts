import { Router } from 'express';
import { startOfHour, parseISO, isEqual } from 'date-fns';
import Appointment from '../models/Appointment';

const appointmentsRouter = Router();

const appointments: Appointment[] = [];

appointmentsRouter.post('/', (request, response) => {
  const { provider, date } = request.body;

  if (!provider || !date)
    return response.status(400).json({
      error: 400,
      message: 'Provider or Date was not send.',
    });

  const dateWithoutMinutesSeconds = startOfHour(parseISO(date));

  const findAppointmentInSameDate = appointments.find(appointment =>
    isEqual(appointment.date, dateWithoutMinutesSeconds),
  );

  if (findAppointmentInSameDate)
    return response.status(400).json({
      error: 400,
      message: 'This appointment is already booked',
    });

  const appointment = new Appointment(provider, dateWithoutMinutesSeconds);

  appointments.push(appointment);

  return response.json(appointment);
});

export default appointmentsRouter;
