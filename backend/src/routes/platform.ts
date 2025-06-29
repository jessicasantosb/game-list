import { Router } from 'express';

import { platformControllers } from '@/controllers';
import { ensureAuthentication } from '@/middleware/ensureAuthentication';

const routes = Router();

routes.get(
  '/platforms',
  ensureAuthentication,
  platformControllers.getAllValidator,
  platformControllers.getAll,
);

routes.post('/platforms', ensureAuthentication, platformControllers.create);

routes.put(
  '/platforms/:id',
  ensureAuthentication,
  platformControllers.updateById,
);

routes.delete(
  '/platforms/:id',
  ensureAuthentication,
  platformControllers.deleteById,
);

export { routes };
