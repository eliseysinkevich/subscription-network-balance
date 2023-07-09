'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.sequelize.query(`WITH RECURSIVE a AS (
      SELECT login AS base_login,
        source AS base_source,
        login,
        source,
        balance_usd
      FROM account
      UNION
      SELECT a.base_login,
        a.base_source,
        b.login,
        b.source,
        b.balance_usd
      FROM a
        JOIN subscription s ON s.r_login = a.login AND s.r_source = a.source
        JOIN account b ON b.login = s.login AND b.source = s.source
    )
    UPDATE account b
    SET balance_usd_sub = (
        SELECT sum(a.balance_usd)
        FROM a
        WHERE b.login = a.base_login AND b.source = a.base_source
      ),
        subscribers_count = (
        SELECT count(*)
        FROM a
        WHERE b.login = a.base_login AND b.source = a.base_source
      );`);
  },

  async down(queryInterface) {
    await queryInterface.sequelize.query(`UPDATE account SET balance_usd_sub = 0, subscribers_count = 0;`);
  }
};
