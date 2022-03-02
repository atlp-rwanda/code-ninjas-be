import models from '../database/models';
const User = models.User;

class UserController {
    static getAllUsers = async(req, res) => {
        User.findAll().then((data) => {
            res.send(data);
        });
    };
}
export default UserController;