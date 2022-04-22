import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Location extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Location.belongsTo(models.Country, { foreignKey: 'countryId' });
      Location.hasMany(models.TripRequest, {
        foreignKey: 'departure_place',
        onDelete: 'CASCADE',
      });
      Location.hasMany(models.TripRequest, {
        foreignKey: 'destination',
        onDelete: 'CASCADE',
      });
      Location.hasMany(models.Accommodation, {
        as: 'Accommodations',
        foreignKey: 'locationId',
        onDelete: 'CASCADE',
      });
    }
  }
  Location.init(
    {
      city: DataTypes.STRING,
      countryId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Location',
    }
  );
  return Location;
};
