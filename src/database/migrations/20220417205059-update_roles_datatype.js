module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.sequelize
        .query('DROP TYPE IF EXISTS "enum_Roles_name" cascade;')
        .then(() =>
          queryInterface.addColumn('Roles', 'name', {
            type: Sequelize.ENUM('admin', 'requester', 'manager', 'superAdmin'),
          })
        ),
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Roles', 'name');
    return queryInterface.sequelize.query('DROP TYPE "enum_Roles_name";');
  },
};
