import { Router } from 'express';

// Routes
import appointmentsRouter from './appointmentsRouter';

const routes = Router();

routes.use('/appointments', appointmentsRouter);

export default routes;
