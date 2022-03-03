import express from 'express';
import dbase from './database/config/database.js';
import usersRoute from './routes/userRoute.js';
import dotenv from 'dotenv';
dotenv.config();

dbase.authenticate().then(() => {
    console.log('database connected......');
});

const app = express();
app.use('/api', usersRoute);
export default app;