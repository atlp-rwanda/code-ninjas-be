import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class UserAccommodation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserAccommodation.init(
    {
      like: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      rating: {
        type: DataTypes.DECIMAL(10, 1),
        validate: { min: 0, max: 5 },
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      accommodationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'UserAccommodation',
    }
  );
  return UserAccommodation;
};
