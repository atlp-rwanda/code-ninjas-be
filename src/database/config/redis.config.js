import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_DB);

redis.addListener('ready', async () => {
  console.log('Redis client connected...');
});

export default redis;
