const RoleModal = require('./../../app/models/index').role
'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
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
                name: 'fan'
            },
            {
                id: 2,
                name: 'team'
            }
        ];
        for (const role of data) {
            await RoleModal.upsert(role)
        }
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete('roles', null, {})
    }
};
