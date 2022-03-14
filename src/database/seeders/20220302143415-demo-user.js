export async function up(queryInterface) {
  return queryInterface.bulkInsert('Users', [
    {
      username: 'Johnny',
      email: 'john.doe@andela.com',
      firstName: 'John',
      lastName: 'Doe',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
}
export async function down(queryInterface) {
  return queryInterface.bulkDelete('Users', null, {});
}
