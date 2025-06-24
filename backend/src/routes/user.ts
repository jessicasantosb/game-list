import { Router } from 'express';

import { userControllers } from '@/controllers';
import { ensureAuthentication } from '@/middleware/ensureAuthentication';

const routes = Router();

routes.post(
  '/register',
  userControllers.registerValidation,
  userControllers.register,
);

routes.post('/login', userControllers.login);

routes.get('/summary', ensureAuthentication, userControllers.summary);

export { routes };
