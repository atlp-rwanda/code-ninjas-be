import redis from 'redis';
import { createClient } from '@node-redis/client';

const client = createClient({
  host: process.env.REDIS_HOST || '127.0.0.1',
  port: 6379,
});
client.on('connect', () => {
  console.log('Client connected...');
});
client.connect();

export default client;
