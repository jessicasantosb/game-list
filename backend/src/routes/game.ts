import { Router } from 'express';

import { gamesControllers } from '@/controllers';
import { ensureAuthentication } from '@/middleware/ensureAuthentication';

const routes = Router();

routes.get(
  '/game',
  ensureAuthentication,
  gamesControllers.getAllValidator,
  gamesControllers.getAll,
);

routes.post('/game', ensureAuthentication, gamesControllers.create);

routes.get('/game/:id', ensureAuthentication, gamesControllers.getById);

routes.put('/game/:id', ensureAuthentication, gamesControllers.updateById);

routes.delete('/game/:id', ensureAuthentication, gamesControllers.deleteById);

routes.patch('/game/:id', ensureAuthentication, gamesControllers.favoriteById);

export { routes };
