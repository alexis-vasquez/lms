import { app } from '@src/app';
import request from 'supertest';

describe('Auth Router', () => {
  test('It should response the POST method in login', async () => {
    const response = await request(app).post('/api/auth/login');
    expect(response.statusCode).toBe(200);
    expect(response.body).toBe('login');
  });
});
