import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_DB);

redis.addListener('error', (error) => {
  console.log(error.message);
});

redis.addListener('ready', () => {
  console.log('Redis client connected and ready to use...');
});

export default redis;
