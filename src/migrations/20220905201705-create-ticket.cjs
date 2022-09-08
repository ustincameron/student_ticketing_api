'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tickets', {
      id: {
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        type: Sequelize.UUID
      },
      studentID: {
        type: Sequelize.UUID
      },
      subject: {
        type: Sequelize.STRING
      },
      categoryID: {
        type: Sequelize.INTEGER
      },
      priority: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      orderBy: {
        type: Sequelize.INTEGER
      },
      location: {
        type: Sequelize.STRING
      },
      resolved: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      resolvedAt: {
        type: Sequelize.DATE,
        defaultValue: null
      },
      resolvedBy: {
        type: Sequelize.UUID,
        defaultValue: null
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
    await queryInterface.dropTable('Tickets');
  }
};