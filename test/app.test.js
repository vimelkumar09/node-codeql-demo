import request from 'supertest';
import { app, server } from '../src/index.js';

describe('CodeQL Demo Application', () => {
  afterAll((done) => {
    server.close(done);
  });

  test('GET / should return health check', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.body.ok).toBe(true);
    expect(response.body.message).toBe('CodeQL Demo Application');
  });

  test('POST /debug-login should accept login data', async () => {
    const response = await request(app)
      .post('/debug-login')
      .send({ user: 'testuser', password: 'testpass' });
    expect(response.status).toBe(200);
    expect(response.body.ok).toBe(true);
  });

  test('GET /ping should return ping results', async () => {
    const response = await request(app).get('/ping?host=127.0.0.1');
    expect(response.status).toBe(200);
  });
});
