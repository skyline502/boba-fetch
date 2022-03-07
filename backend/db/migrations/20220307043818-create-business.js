'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Businesses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ownerId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Users'}
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(50)
      },
      address: {
        allowNull: false,
        type: Sequelize.STRING(256),
        unique: true
      },
      city: {
        allowNull: false,
        type: Sequelize.STRING(100)
      },
      state: {
        allowNull: false,
        type: Sequelize.STRING(2)
      },
      zipCode: {
        allowNull: false,
        type: Sequelize.STRING(5)
      },
      phone: {
        allowNull: false,
        type: Sequelize.STRING(10),
        unique: true
      },
      businessImg: {
        type: Sequelize.STRING
      },
      description: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Businesses');
  }
};
