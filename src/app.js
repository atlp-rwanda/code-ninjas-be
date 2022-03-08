import express from 'express';
import dotenv from 'dotenv';
import 'colors';
import dbase from './database/config/database';
import usersRoute from './routes/userRoute';

dotenv.config();

dbase.authenticate().then(() => {
  console.log('database connected......'.green.bgBlue);
});

const app = express();
app.use(express.json());
app.use('/api', usersRoute);
export default app;
