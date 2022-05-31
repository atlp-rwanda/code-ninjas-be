module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn('Users', 'gender', {
        type: Sequelize.ENUM,
        values: ['male', 'female', 'prefer not say'],
        allowNull: true,
      }),
      queryInterface.addColumn('Users', 'dob', {
        type: Sequelize.DATEONLY,
        allowNull: true,
      }),
      queryInterface.addColumn('Users', 'nationality', {
        type: Sequelize.STRING,
        defaultValue: 'rwandan',
        allowNull: true,
      }),
      queryInterface.addColumn('Users', 'department', {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      queryInterface.addColumn('Users', 'preferredLanguage', {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn('Users', 'preferredCurrency', {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      queryInterface.addColumn('Users', 'address', {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      queryInterface.addColumn('Users', 'lineManager', {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      queryInterface.addColumn('Users', 'phoneNumber', {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn('Users', 'maritalStatus', {
        type: Sequelize.ENUM,
        values: ['Single', 'Married', 'Widowed'],
        defaultValue: 'Single',
        allowNull: true,
      }),
      queryInterface.addColumn('Users', 'imageUrl', {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      queryInterface.addColumn('Users', 'imageId', {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      queryInterface.addColumn('Users', 'isComplete', {
        type: Sequelize.BOOLEAN(),
        defaultValue: false,
      }),
    ]);
  },
  async down(queryInterface) {
    // logic for reverting the changess
    return Promise.all([
      queryInterface.removeColumn('Users', 'gender'),
      queryInterface.removeColumn('Users', 'dob'),
      queryInterface.removeColumn('Users', 'nationality'),
      queryInterface.removeColumn('Users', 'department'),
      queryInterface.removeColumn('Users', 'preferredLanguage'),
      queryInterface.removeColumn('Users', 'preferredCurrency'),
      queryInterface.removeColumn('Users', 'address'),
      queryInterface.removeColumn('Users', 'lineManager'),
      queryInterface.removeColumn('Users', 'phoneNumber'),
      queryInterface.removeColumn('Users', 'maritalStatus'),
      queryInterface.removeColumn('Users', 'imageUrl'),
      queryInterface.removeColumn('Users', 'imageId'),
      queryInterface.removeColumn('Users', 'isComplete'),
    ]);
  },
};
