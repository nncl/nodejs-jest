import request from 'supertest';
import bcrypt from 'bcryptjs';
import app from '../../src/app';

import truncate from '../util/truncate';
import User from '../../src/app/models/User';

describe('User', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should encrypt user password when a new user is created', async () => {
    const user = await User.create({
      name: 'Caue',
      email: 'caue@almeida.com',
      password: '123',
    });

    const compareHash = await bcrypt.compare('123', user.password_hash);

    expect(compareHash).toBe(true);
  });

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

  it('should NOT register duplicated e-mails', async () => {
    await request(app)
      .post('/users')
      .send({
        name: 'Caue',
        email: 'caue@almeida.com',
        password_hash: '123',
      });

    const response = await request(app)
      .post('/users')
      .send({
        name: 'Caue',
        email: 'caue@almeida.com',
        password_hash: '123',
      });

    expect(response.status).toBe(400);
  });
});
