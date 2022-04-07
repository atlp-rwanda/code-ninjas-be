import roles from '../../helpers/roles';

export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Roles',
      [
        {
          name: roles.REQUESTER,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: roles.MANAGER,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: roles.ADMIN,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: roles.SUPER_ADMIN,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Roles', null, {});
  },
};
