export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UserAccommodations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
      },
      accommodationId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Accommodation',
          key: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
      },
      like: {
        type: Sequelize.BOOLEAN,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('UserAccommodations');
  },
};
