import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class UserTripRequest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserTripRequest.belongsTo(models.User, {
        foreignKey: 'userId',
      });
      UserTripRequest.belongsTo(models.TripRequest, {
        foreignKey: 'tripRequestId',
      });
    }
  }
  UserTripRequest.init(
    {
      comment: DataTypes.STRING,
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      tripRequestId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'UserTripRequest',
    }
  );
  return UserTripRequest;
};
