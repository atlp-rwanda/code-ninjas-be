require('dotenv').config();

export const development = {
  url: process.env.DB_CONNECT,
  dialect: 'postgres',
};
export const test = {
  url: process.env.DB_CONNECT,
  dialect: 'postgres',
};
export const production = {
  url: process.env.DB_CONNECT,
  dialect: 'postgres',
};
