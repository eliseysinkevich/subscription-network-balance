const request = require('supertest');
const app = require('../app');

describe('GET /rating', () => {
  it('should return accounts', async () => {
    const res = await request(app).get('/rating');
    expect(res.statusCode).toBe(200);
  });
});
