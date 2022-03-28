import express from 'express';
import { config } from 'dotenv';
import dbase from './database/config/database';
import authRoute from './routes/user';
import docs from './swagger/index';

config();

dbase.authenticate().then(() => {
  console.log('database connected...');
});

const app = express();
app.use(express.json());
app.use('/api/auth', authRoute);
app.use('/api/docs', docs);
export default app;
