import adminScript from '../../src/config/init';
import { User, Role, Country } from '../../src/database/models';
import redisClient from '../../src/database/redis';
import Protection from '../../src/helpers/encryption';
import { getToken } from '../../src/helpers/token';

const userOnePassword = 'JohnDoe@2022';
const userOne = {
  id: 1,
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@email.com',
  password: Protection.hashPassword(userOnePassword),
  userName: 'AnonymousJoe',
  createdAt: new Date(),
  updatedAt: new Date(),
  roleId: 1,
};

const adminPassword = process.env.ADMIN_ACCOUNT_PASSWORD;
const admin = {
  id: 2,
  firstName: process.env.ADMIN_ACCOUNT_FIRSTNAME,
  lastName: process.env.ADMIN_ACCOUNT_LASTNAME,
  email: process.env.ADMIN_ACCOUNT_EMAIL,
  userName: process.env.ADMIN_ACCOUNT_USERNAME,
  password: Protection.hashPassword(adminPassword),
  createdAt: new Date(),
  updatedAt: new Date(),
  roleId: 3,
};

const setupDatabase = async () => {
  await adminScript();
  const usersData = [admin, userOne];
  await User.bulkCreate(usersData);
  const usersTokens = usersData.map((user) => {
    const tokenObject = getToken(
      { id: user.id, email: user.email },
      parseInt(process.env.TOKEN_EXPIRE, 10),
      Date.now()
    );
    user.token = tokenObject.token;
    tokenObject.userId = user.id;
    return tokenObject;
  });
  const pipeline = redisClient.pipeline();
  usersTokens.forEach((token) =>
    pipeline.set(
      `${process.env.NODE_ENV}:user-${token.userId}-access-${token.tokenId}`,
      token.token,
      'EX',
      process.env.TOKEN_EXPIRE
    )
  );
  await pipeline.exec((error, result) => {
    if (error) console.log(error);
  });
};

const clearDatabase = async () => {
  await User.destroy({ where: {} });
  await Role.destroy({ where: {} });
  await Country.destroy({ where: {} });
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

export { userOne, userOnePassword, admin, setupDatabase, clearDatabase };
