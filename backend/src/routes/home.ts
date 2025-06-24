import { Router } from 'express';

const routes = Router();

routes.get('/', (_req, res) => {
  res.json({ express: 'ON' });
});

routes.get('/health', (req, res) => {
  res.status(200).send('OK');
});

export { routes };
