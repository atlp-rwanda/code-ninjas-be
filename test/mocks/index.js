export const user = {
  UserName: 'kevi',
  Email: 'didas@andela.com',
  Password: 'Andelahfghfh',
  FirstName: 'JohnS',
  LastName: 'DoeS',
  googleId: '123456789',
  facebookId: '123456789',
};

export const invalidPasswordUser = {
  userName: 'kevi',
  email: 'example@email.com',
  password: 'Andelahfghfh',
  firstName: 'JohnS',
  lastName: 'DoeS',
};

export const invalidUsernameUser = {
  userName: 'ke',
  email: 'example@email.com',
  password: 'Andelahfghfh',
  firstName: 'JohnS',
  lastName: 'DoeS',
};

export const invalidEmailUser = {
  userName: 'kevi',
  email: 'didas@andela',
  password: 'Andela@2022',
  firstName: 'JohnS',
  lastName: 'DoeS',
};

export const invalidFirstNameUser = {
  userName: 'kevi',
  email: 'example@email.com',
  password: 'Andelahfghfh',
  firstName: 'Jo',
  lastName: 'DoeS',
};

export const invalidLastNameUser = {
  userName: 'kevi',
  email: 'example@email.com',
  password: 'Andelahfghfh',
  firstName: 'JohnS',
  lastName: 'DS',
};

export const dbInitUser = {
  userName: 'kevinNew',
  email: process.env.TEST_REAL_EMAIL,
  password: 'Password@2022',
  firstName: 'JohnS',
  lastName: 'DoeS',
};
export const dummyEmailUser = {
  userName: 'kevinNew',
  email: 'you@test.com',
  password: 'Password@2022',
  firstName: 'JohnS',
  lastName: 'DoeS',
};

export const realUser = {
  userName: 'kevinNew',
  email: process.env.TEST_REGISTER_EMAIL,
  password: 'Password@2022',
  firstName: 'JohnS',
  lastName: 'DoeS',
};

export const realUserWithId = {
  userId: '1',
  userName: 'kevinNew',
  email: process.env.TEST_REAL_EMAIL,
  password: 'Password@2022',
  firstName: 'JohnS',
  lastName: 'DoeS',
};

export const modelData = {
  firstName: realUserWithId.firstName,
  lastName: realUserWithId.lastName,
  email: realUserWithId.email,
  userName: realUserWithId.userName,
  password: realUserWithId.password,
};

export const credentials = {
  userName: 'Johnny',
  email: process.env.TEST_INIT_EMAIL,
  password: 'Password@2022',
  firstName: 'John',
  lastName: 'Doe',
};

export const User = {
  FirstName: 'JaneD',
  LastName: 'DoeS',
  Email: 'admin@admin.com',
  UserName: 'DoeS',
  Password: 'password',
  RoleId: '4',
};

export const saveUser = {
  firstName: 'JaneD',
  lastName: 'DoeS',
  email: 'itiswasp@gmail.com',
  userName: 'DoeS',
  password: 'Password@2022',
};

export const admin = {
  email: 'admin@admin.com',
  password: 'password',
};

export const data = {
  RoleId: '3',
  Email: 'newcheck@gmail.com',
};
