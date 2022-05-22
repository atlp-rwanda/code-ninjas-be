import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class ChatMessage extends Model {
    static associate(models) {
      ChatMessage.belongsTo(models.User, {
        foreignKey: 'userId',
      });
      ChatMessage.belongsTo(models.Room, {
        foreignKey: 'userId',
      });
    }
  }

  ChatMessage.init(
    {
      room: {
        type: DataTypes.STRING,
        default: 'Barefoot Nomad',
        allowNull: false,
      },
      message: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: 'ChatMessage',
    }
  );
  return ChatMessage;
};
