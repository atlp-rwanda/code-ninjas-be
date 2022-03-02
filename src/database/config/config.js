'use strict';

require('dotenv').config();

module.exports = {
    development: {
        url: process.env.DB_CONNECT,
        dialect: 'postgres',
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