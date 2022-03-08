import models from '../database/models';

const User = models.User;

const createUser = async (data, res) => {
    const user = await User.create(data);
    return user;
}

export default createUser;