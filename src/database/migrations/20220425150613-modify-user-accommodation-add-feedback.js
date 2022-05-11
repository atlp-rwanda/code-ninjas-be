export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('UserAccommodations', 'feedback', {
      type: Sequelize.STRING,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('UserAccommodations', 'feedback');
  },
};
