import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import MeetupController from './app/controllers/MeetupController';
import OrganizingController from './app/controllers/OrganizingController';
import SessionController from './app/controllers/SessionController';
import SubscriptionController from './app/controllers/SubscriptionController';
import FileController from './app/controllers/FileController';

import authMiddware from './app/middwares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.get('/', (_, res) => res.send('Welcome to MeetApp'));

routes.post('/session', SessionController.store);
routes.post('/users', UserController.store);

routes.use(authMiddware);

routes
  .route('/meetups')
  .get(MeetupController.index)
  .post(MeetupController.store);

routes
  .route('/meetups/:id')
  .put(MeetupController.update)
  .delete(MeetupController.delete);

routes.get('/organizing', OrganizingController.index);
routes.get('/subscriptions', SubscriptionController.index);

routes.post('/meetups/:meetupId/subscriptions', SubscriptionController.store);

routes.put('/users', UserController.update);
routes.post('/files', upload.single('file'), FileController.store);

export default routes;
