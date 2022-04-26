export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Accommodation',
      [
        {
          name: 'Lemigo Hotel',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Accommodation', null, {});
  },
};
