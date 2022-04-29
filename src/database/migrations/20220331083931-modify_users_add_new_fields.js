export default {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn('Users', 'facebookId', {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      queryInterface.addColumn('Users', 'googleId', {
        type: Sequelize.STRING,
        allowNull: true,
      }),
    ]);
  },

  down(queryInterface, Sequelize) {
    // logic for reverting the changess
    return Promise.all([
      queryInterface.removeColumn('Users', 'facebookId'),
      queryInterface.removeColumn('Users', 'googleId'),
    ]);
  },
};
