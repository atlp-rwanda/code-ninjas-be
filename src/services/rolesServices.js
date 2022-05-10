import models from '../database/models';

const { User, Role } = models;
const isSuperAdmin = async (email, userId) => {
  const user = await User.findOne({
    where: { email: `${email}`, id: userId },
  });
  if (user) {
    if (user.dataValues.roleId === 4) {
      return true;
    }
    return false;
  }
  return false;
};
const isAdmin = async (email, userId) => {
  const user = await User.findOne({
    where: { email: `${email}`, id: userId },
  });
  if (user) {
    if (user.dataValues.roleId === 3) {
      return true;
    }
    return false;
  }
  return false;
};
const getUserRole = async (userId) => {
  const user = await User.findOne({
    where: {
      id: userId,
    },
  });
  const userRoleName = await Role.findOne({
    where: { id: user.dataValues.roleId },
  });
  return userRoleName.dataValues.roleName;
};
const findByName = async (roleName) => {
  const role = await Role.findOne({ where: { roleName } });
  return role;
};

const isManager = async (email, userId) => {
  const user = await User.findOne({
    where: { email: `${email}`, id: userId },
  });
  if (!user) return false;
  if (user.dataValues.roleId === 2) return true;
  return false;
};
export { isSuperAdmin, findByName, isAdmin, getUserRole, isManager };
