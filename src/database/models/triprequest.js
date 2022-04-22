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
          name: 'accommodationId',
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
        as: 'requester',
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
      accommodationId: DataTypes.INTEGER,
      multiCityTripId: DataTypes.STRING,
      status: DataTypes.ENUM('pending', 'approved', 'rejected'),
      tripType: DataTypes.ENUM('one-way', 'return', 'multiCity'),
    },
    {
      sequelize,
      modelName: 'TripRequest',
    }
  );
  return TripRequest;
};
