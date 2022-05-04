import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Accommodation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Accommodation.belongsTo(models.Location, {
        foreignKey: 'locationId',
      });
      Accommodation.hasMany(models.Room, {
        foreignKey: 'accommodationId',
        onDelete: 'CASCADE',
      });
      Accommodation.belongsToMany(models.User, {
        through: models.UserAccommodation,
        foreignKey: 'accommodationId',
      });
    }
  }
  Accommodation.init(
    {
      name: DataTypes.STRING,
      type: DataTypes.ENUM(
        'Hotel',
        'Motel',
        'Apartment',
        'Resort',
        'Boutique',
        'Bed & Breakfast',
        'Lodge',
        'Guest house'
      ),
      description: DataTypes.STRING,
      address: DataTypes.STRING,
      images: DataTypes.ARRAY(DataTypes.STRING),
      amenities: DataTypes.ARRAY(DataTypes.STRING),
      geoCoordinates: DataTypes.JSONB,
      locationId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Accommodation',
    }
  );
  return Accommodation;
};
