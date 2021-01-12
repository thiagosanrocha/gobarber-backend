import { Router } from 'express';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();

const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.get('/', (request, response) => {
  const allAppointments = appointmentsRepository.all();

  return response.json(allAppointments);
});

appointmentsRouter.post('/', (request, response) => {
  const { provider, date } = request.body;

  if (!provider || !date)
    return response
      .status(400)
      .json({ error: 'Provider or Date was not send.' });

  try {
    const turnsIntoDate = parseISO(date);

    const createAppointmentService = new CreateAppointmentService(
      appointmentsRepository,
    );

    const newAppointment = createAppointmentService.execute({
      provider,
      date: turnsIntoDate,
    });

    return response.json(newAppointment);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default appointmentsRouter;
