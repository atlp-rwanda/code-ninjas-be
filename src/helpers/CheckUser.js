import models from '../database/models';
const User = models.User;

export const checkUser = async (params) => {
  return await User.findOne({ where: params });
};
