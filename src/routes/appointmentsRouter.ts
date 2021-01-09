import { Router } from 'express';
import { v4 as uuid } from 'uuid';
import { startOfHour, parseISO, isEqual } from 'date-fns';

const appointmentsRouter = Router();

interface Appointment {
  id: string;
  provider: string;
  date: Date;
}

const appointments: Appointment[] = [];

appointmentsRouter.post('/', (request, response) => {
  const { provider, date } = request.body;

  if (!provider || !date)
    return response.status(400).json({
      error: 400,
      message: 'Provider or Date was not send.',
    });

  const dateWithoutMinutesSeconds = startOfHour(parseISO(date));

  const checkIsAppointmentExists = appointments.find(appointment =>
    isEqual(appointment.date, dateWithoutMinutesSeconds),
  );

  if (checkIsAppointmentExists)
    return response.status(400).json({
      error: 400,
      message: 'This appointment is already booked',
    });

  const appointment = {
    id: uuid(),
    provider,
    date: dateWithoutMinutesSeconds,
  };

  appointments.push(appointment);

  return response.json(appointment);
});

export default appointmentsRouter;
