import { Router } from 'express';

import CreateSessionService from '../services/CreateSessionService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  try {
    const { email, password } = request.body;

    const createSession = new CreateSessionService();

    const { user, token } = await createSession.execute({ email, password });

    return response.json({
      user,
      token,
    });
  } catch (err) {
    return response.json({ error: err.message });
  }
});

export default sessionsRouter;
