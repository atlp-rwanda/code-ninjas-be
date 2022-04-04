import models from '../database/models';

const { User } = models;

const checkUser = async (params) => {
  return User.findOne({ where: params });
};
export default checkUser;
