import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

import ensureAuthentication from '../middlewares/ensureAuthentication';

const appointmentsRouter = Router();

appointmentsRouter.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);

  const allAppointments = await appointmentsRepository.find();

  return response.json(allAppointments);
});

appointmentsRouter.post(
  '/',
  ensureAuthentication,
  async (request, response) => {
    const { provider_id, date } = request.body;

    if (!provider_id || !date)
      return response
        .status(400)
        .json({ error: 'Provider or Date was not send.' });

    try {
      const turnsIntoDate = parseISO(date);

      const createAppointmentService = new CreateAppointmentService();

      const newAppointment = await createAppointmentService.execute({
        provider_id,
        date: turnsIntoDate,
      });

      return response.json(newAppointment);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  },
);

export default appointmentsRouter;
