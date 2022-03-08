require('dotenv').config();

module.exports = {
    development: {
        url: process.env.DB_CONNECT,
        dialectOptions: {
            ssl: {
              require: true,
              rejectUnauthorized: false
            }
          }
    },
    test: {
        url: process.env.DB_CONNECT,
        dialect: 'postgres',
    },
    production: {
        url: process.env.DB_CONNECT,
        dialect: 'postgres',
    },
};
