import request from 'supertest';
import app from '../../src/app';

describe('User', () => {
  it('should be able to register', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        name: 'Caue',
        email: 'caue@almeida.com',
        password_hash: '123',
      });

    expect(response.body).toHaveProperty('id');
  });
});
