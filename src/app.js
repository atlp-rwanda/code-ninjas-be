import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import dbase from './database/config/database';
import routes from './routes/index';
import looger from './middlewares/logger';

config();

dbase.authenticate().then(() => {
  console.log('database connected...');
});

const app = express();

app.use(cors({ origin: '*', credentials: true }));
app.use(express.json());
app.use(looger);

app.use('/api/v2', routes);

export default app;
