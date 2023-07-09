const request = require('supertest');
const app = require('../app');

const { Subscription } = require('../models');

describe('POST /unsubscribe', () => {
  beforeEach(async () => {
    await Subscription.create({
      login: 60000000000060839n,
      source: 203,
      r_login: 60000000000060840n,
      r_source: 203
    });
  });

  it('should unsubscribe', async () => {
    const res = await request(app)
      .post('/unsubscribe')
      .send({
        login: 60000000000060839n,
        source: 203,
        r_login: 60000000000060840n,
        r_source: 203
      });
    expect(res.statusCode).toBe(204);
  });

  it('should fail because login is not passed', async () => {
    const res = await request(app)
      .post('/unsubscribe')
      .send({
        source: 203,
        r_login: 60000000000060840n,
        r_source: 203
      });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('One of required parameters login, source, r_login, r_source is not passed');
  });

  afterEach(async () => {
    await Subscription.destroy({
      where: {
        login: 60000000000060839n,
        source: 203,
        r_login: 60000000000060840n,
        r_source: 203
      }
    });
  });
});
