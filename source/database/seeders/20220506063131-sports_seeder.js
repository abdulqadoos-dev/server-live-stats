const {role: RoleModal} = require("../../app/models");
const SportModal = require('./../../app/models/index').sport
'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const data = [
      {
        id: 1,
        name: 'football',
        description: 'This is football sports.',
        icon: '/images/football.png',
        matchTime: 90,
        matchHalfTime: 45,
        noPlayerRequired: 11,
        minNoPlayers: 7,
        maxNoPlayers: 11
      }
    ];
    for (const sport of data) {
      await SportModal.upsert(sport)
    }

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('sports', null, {})

  }
};
