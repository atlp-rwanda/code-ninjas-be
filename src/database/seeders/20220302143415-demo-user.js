export async function up(queryInterface) {
  return queryInterface.bulkInsert('Users', [
    {
      userName: 'Johnny',
      email: 'john.doe@andela.com',
      password: '$2b$10$LqCj3dIDNt5k2Sf9KDXg3eYcJXG81WnVWmQr0EMIDcwzRUrw8IPAW',
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
