'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('account', 'subscribers_count', {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      comment: 'network subscribers count'
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('account', 'subscribers_count');
  }
};
