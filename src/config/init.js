import bcrypt from 'bcrypt';
import models from '../database/models';
import UserService from '../services/user.service';

const { User, Role } = models;
const { createUser } = UserService;

export const rolesScript = async () => {
  const rolesObj = [
    { id: 1, name: 'requester' },
    { id: 2, name: 'manager' },
    { id: 3, name: 'admin' },
    { id: 4, name: 'superAdmin' },
  ];
  const roles = await Role.findAll();
  if (roles.length === 0) {
    await Role.bulkCreate(rolesObj);
    return console.log('Roles added');
  }
  console.log('Roles already available');
};

const adminScript = async () => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(
    process.env.ADMIN_ACCOUNT_PASSWORD,
    salt
  );

  const admin = await User.findOne({
    where: { email: process.env.ADMIN_ACCOUNT_EMAIL },
  });

  if (!admin) {
    await rolesScript();

    createUser({
      firstName: process.env.ADMIN_ACCOUNT_FIRSTNAME,
      lastName: process.env.ADMIN_ACCOUNT_LASTNAME,
      email: process.env.ADMIN_ACCOUNT_EMAIL,
      userName: process.env.ADMIN_ACCOUNT_USERNAME,
      password: hashedPassword,
      roleId: process.env.ADMIN_ACCOUNT_ROLEID,
      isVerified: true,
    });
    console.log('Admin Registered Successfully');
  } else {
    console.log('Admin Already Registered');
  }
};

(async () => {
  await adminScript();
})();

export default adminScript;
