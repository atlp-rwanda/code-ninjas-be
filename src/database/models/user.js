import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
      User.hasOne(models.Role, {
        foreignKey: 'id',
        onDelete: 'CASCADE',
      });
    }
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
      roleId: { type: DataTypes.STRING, defaultValue: 1 },
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};
