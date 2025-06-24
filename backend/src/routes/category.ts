import { Router } from 'express';

import { categoryController } from '@/controllers';
import { ensureAuthentication } from '@/middleware/ensureAuthentication';

const routes = Router();

routes.get(
  '/categories',
  ensureAuthentication,
  categoryController.getAllValidator,
  categoryController.getAll,
);

routes.post('/categories', ensureAuthentication, categoryController.create);

routes.put(
  '/categories/:id',
  ensureAuthentication,
  categoryController.updateById,
);

routes.delete(
  '/categories/:id',
  ensureAuthentication,
  categoryController.deleteById,
);

export { routes };
