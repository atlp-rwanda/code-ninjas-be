import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Room.belongsTo(models.Accommodation, { foreignKey: 'accommodationId' });
    }
  }
  Room.init(
    {
      type: DataTypes.ENUM(
        'Single',
        'Double',
        'Triple',
        'Quad',
        'Queen',
        'King',
        'Studio',
        'Twin'
      ),
      number: DataTypes.STRING,
      price: DataTypes.DECIMAL,
      currency: DataTypes.STRING,
      isAvailable: DataTypes.BOOLEAN,
      accommodationId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Room',
    }
  );
  return Room;
};
