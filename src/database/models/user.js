import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
      User.belongsTo(models.Role, {
        foreignKey: 'roleId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
      User.hasMany(models.TripRequest, {
        foreignKey: 'requesterId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
      User.hasMany(models.TripRequest, {
        foreignKey: 'managerId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
      User.belongsToMany(models.Accommodation, {
        through: models.UserAccommodation,
        foreignKey: 'userId',
      });

      User.belongsToMany(models.TripRequest, {
        through: models.UserTripRequest,
        foreignKey: 'userId',
      });

      User.hasMany(models.UserTripRequest, {
        foreignKey: 'userId',
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
