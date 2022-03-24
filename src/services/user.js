import Models from '../database/models/index';

const { User } = Models;
class userServices {
  static async findUser(param) {
    const user = await User.findOne({ where: param });
    return user;
  }
}

export default userServices;
