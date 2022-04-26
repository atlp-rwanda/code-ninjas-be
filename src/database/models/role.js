import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Role extends Model {
    static associate(models) {
      // define association here
      Role.belongsTo(models.User, { onDelete: 'cascade' });
    }
  }
  Role.init(
    {
      name: {
        type: DataTypes.ENUM('admin', 'requester', 'manager', 'superAdmin'),
      },
    },
    {
      sequelize,
      modelName: 'Role',
    }
  );
  return Role;
};
