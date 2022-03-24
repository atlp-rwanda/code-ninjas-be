import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import { serve, setup } from 'swagger-ui-express';
import dbase from './database/config/database';
import authRoute from './routes/user';
import docs from '../public/swagger/index';
import routes from './routes/index';
import looger from './middlewares/logger';

dotenv.config();

dbase.authenticate().then(() => {
  console.log('database connected......'.green.bgBlue);
});

const app = express();
app.use(express.json());
app.use('/api/auth', authRoute);
app.use('/api/docs', serve, setup(docs));

app.use(cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});
app.use(express.json());
app.use(looger);

app.use('/api', routes);

export default app;
