import bcrypt from 'bcrypt';
import models from '../database/models';
import UserService from '../services/user.service';

const { User } = models;
const { createUser } = UserService;

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

adminScript();

export default adminScript;
