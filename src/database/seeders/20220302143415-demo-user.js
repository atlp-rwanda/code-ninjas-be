'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('Users', [{
                firstname: 'John',
                lastname: 'Doe',
                email: 'example@example.com',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                firstname: 'andela',
                lastname: 'kigali',
                email: 'andela@andela.com',
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