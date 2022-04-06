module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('TripRequests', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      requesterId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
      },
      managerId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
      },
      departure_place: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Locations',
          key: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
      },
      destination: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Locations',
          key: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
      },
      departureDate: {
        type: Sequelize.DATEONLY,
      },
      returnDate: {
        type: Sequelize.DATEONLY,
      },
      travel_reason: {
        type: Sequelize.STRING,
      },
      accomodationId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Accommodation',
          key: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
      },
      multiCityTripId: {
        type: Sequelize.INTEGER,
      },
      status: {
        type: Sequelize.ENUM('pending', 'approved', 'rejected'),
        defaultValue: 'pending',
      },
      tripType: {
        type: Sequelize.ENUM('one-way', 'return', 'multiCity'),
        defaultValue: 'one-way',
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
    await queryInterface.dropTable('TripRequests');
  },
};
