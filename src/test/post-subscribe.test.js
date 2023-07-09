const request = require('supertest');
const app = require('../app');
const { Subscription } = require('../models');

describe('POST /subscribe', () => {
  beforeEach(async () => {
    await Subscription.destroy({
      where: {
        login: 60000000000060839n,
        source: 203,
        r_login: 60000000000064844n,
        r_source: 203
      }
    });
  });

  it('should subscribe', async () => {
    const res = await request(app)
      .post('/subscribe')
      .send({
        login: 60000000000060839n,
        source: 203,
        r_login: 60000000000064844n,
        r_source: 203
      });
    expect(res.statusCode).toBe(201);
  });
});