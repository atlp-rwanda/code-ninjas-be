import express from 'express';
import { config } from 'dotenv';
import dbase from './database/config/database';
import routes from './routes/index';
import userRouter from './routes/userRoute';

config();

dbase.authenticate().then(() => {
    console.log('database connected...');
});

const app = express();
app.use(express.json());
app.set('view engine', 'ejs');
app.get('/login', (req, res) => {
    res.render('login');
});

app.use('/api', routes);
app.use('/api', userRouter);
export default app;