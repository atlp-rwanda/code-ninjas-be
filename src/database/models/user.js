import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class User extends Model {
    static associate() {}
  }
  User.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
      userName: DataTypes.STRING,
      password: DataTypes.STRING,
      isVerified: DataTypes.BOOLEAN,
      facebookId: DataTypes.STRING,
      googleId: DataTypes.STRING,
      age: DataTypes.INTEGER,
      gender: DataTypes.ENUM(['male', 'female', 'prefer not say']),
      dob: DataTypes.DATEONLY,
      nationality: DataTypes.STRING,
      department: DataTypes.STRING,
      preferredLanguage: DataTypes.STRING,
      preferredCurrency: DataTypes.STRING,
      address: DataTypes.STRING,
      lineManager: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      maritalStatus: DataTypes.ENUM(['single', 'married', 'widowed']),
      isComplete: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};
