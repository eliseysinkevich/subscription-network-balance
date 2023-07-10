'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.addIndex('account', {
        fields: ['login', 'source'],
        unique: true,
        name: 'idx_account_login_source'
      }, { transaction });

      await queryInterface.addConstraint('subscription', {
        type: 'FOREIGN KEY',
        name: 'fk_subscription_account',
        fields: ['login', 'source'],
        references: {
          table: 'account',
          fields: ['login', 'source']
        }
      }, { transaction });

      await queryInterface.addConstraint('subscription', {
        type: 'FOREIGN KEY',
        name: 'fk_subscription_r_account',
        fields: ['r_login', 'r_source'],
        references: {
          table: 'account',
          fields: ['login', 'source']
        }
      }, { transaction });
    });
  },

  async down(queryInterface) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.removeConstraint('subscription', 'fk_subscription_account', { transaction });
      await queryInterface.removeConstraint('subscription', 'fk_subscription_r_account', { transaction });
      await queryInterface.removeIndex('account', 'idx_account_login_source', { transaction });
    });
  }
};
