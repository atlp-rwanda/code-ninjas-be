const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      firstName: DataTypes.STRING(24),
      lastName: DataTypes.STRING(24),
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
      userName: DataTypes.STRING(24),
      password: DataTypes.STRING,
      isVerified: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};
