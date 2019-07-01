import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';

import authMiddware from './app/middwares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.get('/', (_, res) => res.send('Welcome to MeetApp'));

routes.post('/session', SessionController.store);
routes.post('/users', UserController.store);

routes.use(authMiddware);

routes.put('/users', UserController.update);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
