import Sequelize from 'sequelize';
import { config } from 'dotenv';
const envConfigs = require('../config/config');

config();

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