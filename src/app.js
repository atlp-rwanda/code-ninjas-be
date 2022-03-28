import express from 'express';
import dotenv from 'dotenv';
import 'colors';
import dbase from './database/config/database';
import authRoute from './routes/user';
import docs from './swagger/index';

dotenv.config();

dbase.authenticate().then(() => {
  console.log('database connected......'.green.bgBlue);
});

const app = express();
app.use(express.json());
app.use('/api/auth', authRoute);
app.use('/api/docs', docs);
export default app;
