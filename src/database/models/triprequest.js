const { Model } = require('sequelize');

export default (sequelize, DataTypes) => {
  class TripRequest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      TripRequest.belongsTo(models.Accommodation, {
        foreignKey: {
          name: 'accomodationId',
        },
      });
      TripRequest.belongsTo(models.Location, {
        foreignKey: {
          name: 'departure_place',
        },
        as: 'departurePlace',
      });
      TripRequest.belongsTo(models.Location, {
        foreignKey: {
          name: 'destination',
        },
        as: 'Destination',
      });
      TripRequest.belongsTo(models.User, {
        foreignKey: {
          name: 'requesterId',
        },
      });

      TripRequest.belongsTo(models.User, {
        foreignKey: {
          name: 'managerId',
        },
        as: 'manager',
      });
    }
  }
  TripRequest.init(
    {
      requesterId: DataTypes.INTEGER,
      managerId: DataTypes.INTEGER,
      departure_place: DataTypes.INTEGER,
      destination: DataTypes.INTEGER,
      departureDate: DataTypes.DATEONLY,
      returnDate: DataTypes.DATEONLY,
      travel_reason: DataTypes.STRING,
      accomodationId: DataTypes.INTEGER,
      status: DataTypes.ENUM('pending', 'approved', 'rejected'),
    },
    {
      sequelize,
      modelName: 'TripRequest',
    }
  );
  return TripRequest;
};