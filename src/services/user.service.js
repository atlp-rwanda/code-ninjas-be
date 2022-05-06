import { User } from '../database/models';

class UserService {
  static createUser = async (data) => {
    const user = await User.create(data);
    return user;
  };

  static findUser = async (searchParams) => {
    const user = await User.findOne({ where: searchParams });

    if (!user) {
      throw new Error('User not found');
    }

    if (user.id) {
      return user;
    }

    throw new Error();
  };

  static checkUser = async (params) => {
    const user = await User.findOne({ where: params });

    if (user) {
      throw new Error('Found');
    }
    return user;
  };

  static checkManager = async (params) => {
    const manager = await User.findOne({ where: params });
    return manager;
  };
}

export default UserService;
