'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('TripRequests', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      requesterId: {
        type: Sequelize.INTEGER
      },
      managerId: {
        type: Sequelize.INTEGER
      },
      departure_place: {
        type: Sequelize.STRING
      },
      destination: {
        type: Sequelize.STRING
      },
      departureDate: {
        type: Sequelize.DATE
      },
      returnDate: {
        type: Sequelize.DATE
      },
      travel_reason: {
        type: Sequelize.STRING
      },
      accomodationId: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('TripRequests');
  }
};