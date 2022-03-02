import express from 'express';
import db from './config/config';
db.authenticate().then(() => {
    console.log('database connected......');
});

const app = express();

export default app;