import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class UserComment extends Model {
    static associate(models) {
      // define association here
    }
  }
  UserComment.init(
    {
      message: DataTypes.STRING,
      dateCreated: {
        type: 'date',
        default: Date.now,
      },
    },
    {
      sequelize,
      modelName: 'UserComment',
    }
  );

  return UserComment;
};
