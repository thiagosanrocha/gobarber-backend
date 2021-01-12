import { startOfHour } from 'date-fns';

import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface Request {
  provider: string;
  date: Date;
}

class CreateAppointmentService {
  private appointments: AppointmentsRepository;

  constructor(appointments: AppointmentsRepository) {
    this.appointments = appointments;
  }

  public execute({ provider, date }: Request): Appointment {
    const dateWithoutMinutesSeconds = startOfHour(date);

    const findAppointmentInSameDate = this.appointments.findByDate(
      dateWithoutMinutesSeconds,
    );

    if (findAppointmentInSameDate)
      throw Error('This appointment is already booked');

    const newAppointment = this.appointments.create({
      provider,
      date: dateWithoutMinutesSeconds,
    });

    return newAppointment;
  }
}

export default CreateAppointmentService;
