import { isEqual } from 'date-fns';

import Appointment from '../models/Appointment';

interface CreateDTO {
  provider: string;
  date: Date;
}

class AppointmentsRepository {
  private appointments: Appointment[];

  constructor() {
    this.appointments = [];
  }

  public create({ provider, date }: CreateDTO): Appointment {
    const newAppointment = new Appointment({ provider, date });

    this.appointments.push(newAppointment);

    return newAppointment;
  }

  public findByDate(date: Date): Appointment | null {
    const findAppointment = this.appointments.find(appointment =>
      isEqual(date, appointment.date),
    );

    return findAppointment || null;
  }

  public all(): Appointment[] {
    return this.appointments;
  }
}

export default AppointmentsRepository;
