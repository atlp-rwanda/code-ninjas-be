import Sequelize from 'sequelize';
import { config } from 'dotenv';
const envConfigs = require('../config/config');

dotenv.config();
const dbase = new Sequelize('barefoot', 'postgres', process.env.DB_PASSWORD, {
  host: 'localhost',
  dialect: 'postgres',

const env = envConfigs[process.env.NODE_ENV] || envConfigs['development'];
const dbase = new Sequelize(env.url, {
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
});
export default dbase;
