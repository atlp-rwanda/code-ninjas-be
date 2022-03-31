import models from '../database/models';

const { User } = models;

const checkUser = async (params) => {
  const user = await User.findOne({ where: params });
  return user;
};

export default checkUser;
