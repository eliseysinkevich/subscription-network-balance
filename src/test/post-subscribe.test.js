const request = require('supertest');
const app = require('../app');

describe('POST /subscribe', () => {
  it('should subscribe', async () => {
    const res = await request(app).post('/subscribe');
    expect(res.statusCode).toBe(201);
  });
});