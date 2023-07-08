const request = require('supertest');
const app = require('../app');

describe('POST /unsubscribe', () => {
  it('should unsubscribe', async () => {
    const res = await request(app).post('/unsubscribe');
    expect(res.statusCode).toBe(204);
  });
});