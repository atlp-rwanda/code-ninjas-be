import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Country extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Country.hasMany(models.Location, {
        foreignKey: 'countryId',
        onDelete: 'CASCADE',
      });
    }
  }
  Country.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Country',
    }
  );
  return Country;
};
