'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('sports', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      description: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      icon: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      matchTime: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      matchHalfTime: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      noPlayerRequired: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      minNoPlayers: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      maxNoPlayers: {
        allowNull: false,
        type: Sequelize.INTEGER,
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

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('sports')
  }
};
