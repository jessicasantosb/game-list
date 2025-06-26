import { Router } from 'express';

import { gamesControllers } from '@/controllers';
import { ensureAuthentication } from '@/middleware/ensureAuthentication';

const routes = Router();

routes.get(
  '/games',
  ensureAuthentication,
  gamesControllers.getAllValidator,
  gamesControllers.getAll,
);

routes.post('/games', ensureAuthentication, gamesControllers.create);

routes.get('/games/:id', ensureAuthentication, gamesControllers.getById);

routes.put('/games/:id', ensureAuthentication, gamesControllers.updateById);

routes.delete('/games/:id', ensureAuthentication, gamesControllers.deleteById);

routes.patch('/games/:id', ensureAuthentication, gamesControllers.favoriteById);

export { routes };
