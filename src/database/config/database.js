import Sequelize from 'sequelize';
import { config } from 'dotenv';

config();
// const dbase = new Sequelize('barefoot', 'postgres', process.env.DB_PASSWORD, {
//   host: 'localhost',
//   dialect: 'postgres',

//   pool: {
//     max: 5,
//     min: 0,
//     idle: 10000,
//   },
// });
// export default dbase;

const dbase = new Sequelize(process.env.DB_CONNECT, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});
export default dbase;
