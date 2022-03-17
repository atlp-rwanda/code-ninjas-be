export async function up(queryInterface) {
    return queryInterface.bulkInsert('Users', [{
        userName: 'Johnny',
        email: 'john.doe@andela.com',
        firstName: 'John',
        lastName: 'Doe',
        password: 'Password@2022',
        createdAt: new Date(),
        updatedAt: new Date(),
    }, ]);
}
export async function down(queryInterface) {
    return queryInterface.bulkDelete('Users', null, {});
}