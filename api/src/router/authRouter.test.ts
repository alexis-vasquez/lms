import request from 'supertest';
import { app } from '@/app';

jest.mock('jsonwebtoken', () => ({
  verify: (token: string) => {
    if (token !== 'correct token') throw new Error('Invalid token');
  },
  sign: jest.fn().mockReturnValue('correct token'),
}));

jest.mock('@/database/models', () => ({
  User: {
    findOne: jest.fn((query) => {
      if (query.where.email !== 'test@lms.com') return undefined;
      return {
        id: 1,
        email: 'test@lms.com',
        password: '12345678',
        role: 'admin',
      };
    }),
  },
}));

jest.mock('bcryptjs', () => ({
  compare: jest.fn((password: string) => {
    if (password !== '12345678') return false;
    return true;
  }),
}));

describe('Auth Router', () => {
  describe('Authentication', () => {
    test('It should validate existing token', async () => {
      const response = await request(app).get('/api/auth/');
      expect(response.headers['content-type']).toMatch(/application\/json/);
      expect(response.statusCode).toBe(401);
      expect(response.body.error).toBe('Missing token');
    });

    test('It should validate wrong token', async () => {
      const response = await request(app)
        .get('/api/auth/')
        .set({ Authorization: 'wrong token' });
      expect(response.headers['content-type']).toMatch(/application\/json/);
      expect(response.statusCode).toBe(403);
      expect(response.body.error).toBe('Invalid token');
    });

    test('It should validate correct token', async () => {
      const response = await request(app)
        .get('/api/auth/')
        .set({ Authorization: 'correct token' });
      expect(response.headers['content-type']).toMatch(/application\/json/);
      expect(response.statusCode).toBe(200);
      expect(response.body.token).toBe('correct token');
    });
  });

  describe('Login', () => {
    test('It should require all fields when login', async () => {
      const response = await request(app).post('/api/auth/login').send({});
      expect(response.statusCode).toBe(400);
      expect(response.body.error).toBe('Missing fields: email, password');
    });

    test('It should require missing fields when login', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({ email: 'test@test.com' });
      expect(response.statusCode).toBe(400);
      expect(response.body.error).toBe('Missing fields: password');
    });

    test('It should return invalid email message', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({ email: 'test@test.com', password: '12345678' });
      expect(response.statusCode).toBe(401);
      expect(response.body.error).toBe('User not found');
    });

    test('It should return invalid password message', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({ email: 'test@lms.com', password: '123456' });
      expect(response.statusCode).toBe(401);
      expect(response.body.error).toBe('Invalid password');
    });

    test('It should login with correct credentials', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({ email: 'test@lms.com', password: '12345678' });
      expect(response.statusCode).toBe(200);
      expect(response.body.token).toBe('correct token');
    });
  });
});
