'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TripRequest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TripRequest.init({
    requesterId: DataTypes.INTEGER,
    managerId: DataTypes.INTEGER,
    departure_place: DataTypes.STRING,
    destination: DataTypes.STRING,
    departureDate: DataTypes.DATE,
    returnDate: DataTypes.DATE,
    travel_reason: DataTypes.STRING,
    accomodationId: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'TripRequest',
  });
  return TripRequest;
};