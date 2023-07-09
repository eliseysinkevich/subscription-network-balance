'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.sequelize.query(`CREATE TABLE \`account\` (
        \`login\` bigint(20) unsigned NOT NULL COMMENT 'account',
        \`source\` int(10) unsigned NOT NULL,
        \`balance_usd\` double DEFAULT '0' COMMENT 'account balance',
        \`balance_usd_sub\` double DEFAULT '0' COMMENT 'subscription network balance',
        PRIMARY KEY (\`source\`, \`login\`)
      ) ENGINE=InnoDB;`, { transaction });

      await queryInterface.sequelize.query(`CREATE TABLE \`subscription\` (
        \`login\` bigint(20) unsigned NOT NULL COMMENT 'trader account',
        \`source\` int(10) unsigned NOT NULL COMMENT 'trader source',
        \`r_login\` bigint(20) unsigned NOT NULL COMMENT 'investor account',
        \`r_source\` int(10) unsigned NOT NULL COMMENT 'investor source',
        PRIMARY KEY (\`source\`,\`login\`,\`r_source\`,\`r_login\`),
        KEY \`r_idx\` (\`r_source\`,\`r_login\`,\`source\`,\`login\`)
      ) ENGINE=InnoDB;`, { transaction });
    });
  },

  async down(queryInterface) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.sequelize.query('DROP TABLE `subscription`;', { transaction });
      await queryInterface.sequelize.query('DROP TABLE `account`;', { transaction });
    });
  }
};
