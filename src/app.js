import express from 'express';
import dotenv from 'dotenv';
import dbase from './database/config/database';
import usersRoute from './routes/userRoute';

dotenv.config();

dbase.authenticate().then(() => {
  console.log('database connected......');
});

const app = express();
app.use('/api', usersRoute);
export default app;
