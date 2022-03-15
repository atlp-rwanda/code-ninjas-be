module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'example@example.com',
        userName: 'testUser1',
        password: 'password',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: 'andela',
        lastName: 'kigali',
        email: 'andela@andela.com',
        userName: 'testUser2',
        password: 'password2',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
};
export async function down(queryInterface) {
  return queryInterface.bulkDelete('Users', null, {});
}
