import express from 'express';
import cors from 'cors';

import * as userController from './controllers/userController.js';
import * as financialController from './controllers/financialController';
import auth from './middlewares/auth.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/financial-events', auth);

app.post('/sign-up', userController.signUp);

app.post('/sign-in', userController.signIn);

app.post('/financial-events', financialController.postEvent);

app.get('/financial-events', financialController.getEvents);

app.get('/financial-events/sum', financialController.getSum);

export default app;
