module.exports = {
  up(queryInterface, Sequelize) {
    queryInterface.bulkInsert('Users', [
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'example@example.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: 'andela',
        lastName: 'kigali',
        email: 'andela@andela.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down(queryInterface, Sequelize) {
    queryInterface.bulkDelete('Users', null, {});
  },
};
