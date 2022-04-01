export async function up(queryInterface) {
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
    {
      userName: 'Johnny',
      email: 'vwlixyakslqavbonkw@kvhrw.com',
      password: '$2b$10$bQUIGi5mWZ8NRFMN3.VjgOiV1fPTYExzxwhOpL.m/bgD6tiLS2hxm',
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
