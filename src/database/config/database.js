import Sequelize from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();
const dbase = new Sequelize('barefoot', 'postgres', process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'postgres',

    pool: {
        max: 5,
        min: 0,
        idle: 10000,
    },
});
export default dbase;