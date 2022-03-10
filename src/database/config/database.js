import Sequelize from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const dbase = new Sequelize(process.env.DB_CONNECT, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});
export default dbase;
