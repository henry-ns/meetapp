import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

const routes = new Router();

routes.get('/', (_, res) => res.send('Welcome to MeetApp'));

routes.post('/session', SessionController.store);

routes.route('/users').post(UserController.store);

export default routes;
