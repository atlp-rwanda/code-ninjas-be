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

      User.hasMany(models.UserAccommodation, {
        foreignKey: 'userId',
      });
      User.hasMany(models.ChatMessage, {
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
      imageUrl: {
        type: DataTypes.STRING,
        defaultValue: '',
      },
      imageId: {
        type: DataTypes.STRING,
        defaultValue: '',
      },
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
