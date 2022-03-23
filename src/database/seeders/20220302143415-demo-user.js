<<<<<<< HEAD
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
=======
'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('Users', [{
                firstName: 'John',
                lastName: 'Doe',
                email: 'example@example.com',
                userName : 'testUser1',
                password : 'password',
                userId: uuidv4(),
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                firstName: 'andela',
                lastName: 'kigali',
                email: 'andela@andela.com',
                userName : 'testUser2',
                password : 'password2',
                userId: uuidv4(),
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    },
};
>>>>>>> d2535b9 (#181414755 Added Feature Of User Registration)
