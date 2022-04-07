import { Role, User } from '../database/models';

export const createOne = async (data) => {
  const created = await Role.create(data);
  return created;
};

export const findRole = async (data) => {
  const found = await Role.findOne({ where: { name: data.name } });
  return found;
};
export const FindRolesAndCount = async (data) => {
  const foundRoles = await Role.findAndCountAll(data);
  return foundRoles;
};

export const findRoleById = async (query) => {
  const role = await Role.findOne({ where: { id: query.id } });
  return role;
};

export const changeRole = async (userRole, userId) => {
  const changes = await User.update(
    { roleId: userRole },
    {
      where: { id: userId },
    }
  );
  return changes;
};
export const deleteOne = async (data) => {
  const deleted = await Role.destroy({ where: { id: data } });
  return deleted;
};

export const findAllRoles = async () => {
  const role = await Role.findAll();
  return role;
};

export const findAllUsers = async () => {
  const users = await User.findAll({
    attributes: ['id', 'userName', 'email'],
  });
  return users;
};

export const findIdUser = async (Email) => {
  const user = await User.findOne({ where: { email: Email } });
  return user;
};

export const checkUserById = async (userId, role) => {
  const user = await User.findOne({
    where: { id: userId },
    include: [{ model: role, attributes: ['id', 'name'] }],
  });
  return user;
};

export const updateRole = async (data, id) => {
  const result = await Role.update(data, { where: { id } });
  return result;
};
