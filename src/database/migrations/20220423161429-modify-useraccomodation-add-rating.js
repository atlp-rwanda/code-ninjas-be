export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('UserAccommodations', 'rating', {
      type: Sequelize.DECIMAL(10, 1),
      validate: { min: 0, max: 5 },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('UserAccommodations', 'rating');
  },
};
