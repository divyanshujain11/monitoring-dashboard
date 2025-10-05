const request = require('supertest');
const app = require('../app');

describe('GET /metrics', () => {
  it('returns metrics JSON with required keys', async () => {
    const res = await request(app).get('/metrics');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('cpu_percent');
    expect(typeof res.body.cpu_percent).toBe('number');
    expect(res.body).toHaveProperty('latency_ms');
    expect(typeof res.body.latency_ms).toBe('number');
    expect(res.body).toHaveProperty('active_users');
    expect(res.body).toHaveProperty('request_count');
    expect(res.body).toHaveProperty('timestamp');
  });
});
