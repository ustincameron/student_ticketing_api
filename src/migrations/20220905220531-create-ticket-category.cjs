'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('TicketCategories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      orderBy: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      active: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
       .then(function () {
         queryInterface.sequelize.query("insert into \"TicketCategories\" (name, description, \"orderBy\", active, \"createdAt\", \"updatedAt\") values ('General', 'General Questions', 10, true, NOW(), NOW())");
         queryInterface.sequelize.query("insert into \"TicketCategories\" (name, description, \"orderBy\", active, \"createdAt\", \"updatedAt\") values ('Accounting', 'Accounting & Billing Questions', 9, true, NOW(), NOW())");
         queryInterface.sequelize.query("insert into \"TicketCategories\" (name, description, \"orderBy\", active, \"createdAt\", \"updatedAt\") values ('Maintenance', 'Maintenance Requests', 8, true, NOW(), NOW())");
         queryInterface.sequelize.query("insert into \"TicketCategories\" (name, description, \"orderBy\", active, \"createdAt\", \"updatedAt\") values ('Emergency', 'Plumbing Leaks, etc.', 7, true, NOW(), NOW())");
         queryInterface.sequelize.query("insert into \"TicketCategories\" (name, description, \"orderBy\", active, \"createdAt\", \"updatedAt\") values ('Utilities', 'Questions about Utilities.', 6, true, NOW(), NOW())");
         queryInterface.sequelize.query("insert into \"TicketCategories\" (name, description, \"orderBy\", active, \"createdAt\", \"updatedAt\") values ('Other', 'All Other matters.', 5, true, NOW(), NOW())");
       });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('TicketCategories');
  }
};