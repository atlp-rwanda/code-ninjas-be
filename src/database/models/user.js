'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    User.init({
        firstName: DataTypes.STRING(24),
        lastName: DataTypes.STRING(24),
        email: {
            type: DataTypes.STRING,
            unique: true,
        },
        userName: DataTypes.STRING(24),
        password: DataTypes.STRING,
        roleId: DataTypes.STRING,
        isVerified: DataTypes.BOOLEAN,
    }, {
        sequelize,
        modelName: 'User',
    });
    return User;
};