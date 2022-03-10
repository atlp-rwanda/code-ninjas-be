import Sequelize from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const dbase = new Sequelize(process.env.DB_CONNECT, {
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  })
<<<<<<< HEAD
export default dbase;
=======
export default dbase;
>>>>>>> f3d0b1f9ed0f552aed5635a39efff49cb539244e
