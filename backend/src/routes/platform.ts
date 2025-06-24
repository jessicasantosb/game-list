import { Router } from 'express';

import { platformControllers } from '@/controllers';
import { ensureAuthentication } from '@/middleware/ensureAuthentication';

const routes = Router();

routes.get(
  '/platform',
  ensureAuthentication,
  platformControllers.getAllValidator,
  platformControllers.getAll,
);

routes.post('/platform', ensureAuthentication, platformControllers.create);

routes.put(
  '/platform/:id',
  ensureAuthentication,
  platformControllers.updateById,
);

routes.delete(
  '/platform/:id',
  ensureAuthentication,
  platformControllers.deleteById,
);

export { routes };
