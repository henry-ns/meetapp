import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import authMiddware from './app/middwares/auth';

const routes = new Router();

routes.get('/', (_, res) => res.send('Welcome to MeetApp'));

routes.post('/session', SessionController.store);

routes.post('/users', UserController.store);

routes.use(authMiddware);

routes.route('/users').put(UserController.update);

export default routes;
