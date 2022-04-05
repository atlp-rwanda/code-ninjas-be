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
app.use(express.json());
app.set('view engine', 'ejs');

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
