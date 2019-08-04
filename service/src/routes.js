import { Router } from 'express';
import Brute from 'express-brute';
import BruteRedis from 'express-brute-redis';

import multer from 'multer';
import multerConfig from './config/multer';
import redisConfig from './config/redis';

import UserController from './app/controllers/UserController';
import MeetupController from './app/controllers/MeetupController';
import OrganizingController from './app/controllers/OrganizingController';
import SessionController from './app/controllers/SessionController';
import SubscriptionController from './app/controllers/SubscriptionController';
import FileController from './app/controllers/FileController';

import {
  validateMeetupStore,
  validateMeetupUpdate,
} from './app/validators/Meetup';
import { validateSessionStore } from './app/validators/Session';
import { validateSubscriptionStore } from './app/validators/Subscription';
import { validateUserStore, validateUserUpdate } from './app/validators/User';

import authMiddware from './app/middwares/auth';

const routes = new Router();
const upload = multer(multerConfig);

const bruteStore = new BruteRedis(redisConfig);
const bruteForce = new Brute(bruteStore);

routes.get('/', (_, res) => res.send('Welcome to MeetApp'));

routes.post(
  '/session',
  bruteForce.prevent,
  validateSessionStore,
  SessionController.store
);

routes.post('/users', validateUserStore, UserController.store);

routes.use(authMiddware);

routes.put('/users', validateUserUpdate, UserController.update);
routes.post('/files', upload.single('file'), FileController.store);

routes
  .route('/meetups')
  .get(MeetupController.index)
  .post(validateMeetupStore, MeetupController.store);

routes
  .route('/meetups/:id')
  .put(validateMeetupUpdate, MeetupController.update)
  .delete(MeetupController.delete);

routes.get('/organizing', OrganizingController.index);
routes.get('/subscriptions', SubscriptionController.index);

routes.post(
  '/meetups/:meetupId/subscriptions',
  validateSubscriptionStore,
  SubscriptionController.store
);

export default routes;
