import express from 'express';
import { config } from 'dotenv';
import 'colors';
import dbase from './database/config/database';
import routes from './routes/index';

config();

dbase.authenticate().then(() => {
  console.log('database connected......'.brightGreen.bold.bgBlue);
});

const app = express();
app.use('/api/v2', routes);
export default app;
