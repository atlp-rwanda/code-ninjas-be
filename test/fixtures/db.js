import { User } from '../../src/database/models';
import redisClient from '../../src/database/redis';
import Protection from '../../src/helpers/encryption';

const userOnePassword = 'JohnDoe@2022';
const userOne = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@email.com',
  password: Protection.hashPassword(userOnePassword),
  userName: 'AnonymousJoe',
  createdAt: new Date(),
  updatedAt: new Date(),
};

const setupDatabase = async () => {
  await User.create(userOne);
};

const clearDatabase = async () => {
  await User.destroy({ where: {} });
  await redisClient.keys(`${process.env.NODE_ENV}:*`, (error, result) => {
    if (error) return error;
    const pipeline = redisClient.pipeline();
    result.forEach((key) => pipeline.del(key));
    return pipeline.exec((err, res) => {
      if (err) return err;
      return res;
    });
  });
};

export { userOne, userOnePassword, setupDatabase, clearDatabase };
