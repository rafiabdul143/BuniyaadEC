import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { createTestApp } from '../../helpers/test-app';
import { cleanTestDatabase } from '../../helpers/test-database';
import { createTestUser, getAuthToken } from '../../helpers/test-auth';

describe('Profiles Integration Tests', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const testApp = await createTestApp();
    app = testApp.app;
    await app.init();
  });

  beforeEach(async () => {
    // Clean only integration profile/test users
    const prisma = app.get(require('../../../src/prisma/prisma.service').PrismaService);
    await cleanTestDatabase(prisma);
  });

  afterAll(async () => {
    await app.close();
  });

  it('TEST 1: Authenticated user creates profile successfully (201)', async () => {
    const user = await createTestUser(app, { email: 'user1@example.com' });
    const token = await getAuthToken(app, 'user1@example.com', 'Password123!');

    const res = await request(app.getHttpServer())
      .post('/users/me/profile')
      .set('Authorization', `Bearer ${token}`)
      .send({
        username: 'rafi123',
        phone: '+919999999999',
        bio: 'Software Developer',
        profileImageUrl: 'https://example.com/avatar.jpg',
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.userId).toBe(user.id);
    expect(res.body.username).toBe('rafi123');
  });

  it('TEST 2: Unauthenticated user cannot create profile (401)', async () => {
    const res = await request(app.getHttpServer())
      .post('/users/me/profile')
      .send({ username: 'rafi123' });

    expect(res.status).toBe(401);
  });

  it('TEST 3: Authenticated user retrieves own profile successfully (200)', async () => {
    const user = await createTestUser(app, { email: 'user2@example.com' });
    const token = await getAuthToken(app, 'user2@example.com', 'Password123!');

    await request(app.getHttpServer())
      .post('/users/me/profile')
      .set('Authorization', `Bearer ${token}`)
      .send({ username: 'rafi_dev' });

    const res = await request(app.getHttpServer())
      .get('/users/me/profile')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.username).toBe('rafi_dev');
  });

  it('TEST 4: Unauthenticated user cannot retrieve profile (401)', async () => {
    const res = await request(app.getHttpServer()).get('/users/me/profile');
    expect(res.status).toBe(401);
  });

  it('TEST 5: Authenticated user updates own profile successfully (200)', async () => {
    const user = await createTestUser(app, { email: 'user3@example.com' });
    const token = await getAuthToken(app, 'user3@example.com', 'Password123!');

    await request(app.getHttpServer())
      .post('/users/me/profile')
      .set('Authorization', `Bearer ${token}`)
      .send({ username: 'oldusername', bio: 'Old Bio' });

    const res = await request(app.getHttpServer())
      .patch('/users/me/profile')
      .set('Authorization', `Bearer ${token}`)
      .send({ bio: 'Updated Bio' });

    expect(res.status).toBe(200);
    expect(res.body.bio).toBe('Updated Bio');
    expect(res.body.username).toBe('oldusername');
  });

  it('TEST 6: Duplicate username conflict handling (409)', async () => {
    await createTestUser(app, { email: 'user4a@example.com' });
    const tokenA = await getAuthToken(app, 'user4a@example.com', 'Password123!');

    await request(app.getHttpServer())
      .post('/users/me/profile')
      .set('Authorization', `Bearer ${tokenA}`)
      .send({ username: 'uniqueuser' });

    await createTestUser(app, { email: 'user4b@example.com' });
    const tokenB = await getAuthToken(app, 'user4b@example.com', 'Password123!');

    const res = await request(app.getHttpServer())
      .post('/users/me/profile')
      .set('Authorization', `Bearer ${tokenB}`)
      .send({ username: 'UNIQUEUSER' });

    expect(res.status).toBe(409);
  });

  it('TEST 7: Invalid username format rejection (400)', async () => {
    const user = await createTestUser(app, { email: 'user5@example.com' });
    const token = await getAuthToken(app, 'user5@example.com', 'Password123!');

    const res = await request(app.getHttpServer())
      .post('/users/me/profile')
      .set('Authorization', `Bearer ${token}`)
      .send({ username: 'rafi@123' });

    expect(res.status).toBe(400);
  });

  it('TEST 8: Reserved username rejection (400)', async () => {
    const user = await createTestUser(app, { email: 'user6@example.com' });
    const token = await getAuthToken(app, 'user6@example.com', 'Password123!');

    const res = await request(app.getHttpServer())
      .post('/users/me/profile')
      .set('Authorization', `Bearer ${token}`)
      .send({ username: 'admin' });

    expect(res.status).toBe(400);
  });

  it('TEST 9: Profile creation attempted twice by same user (409)', async () => {
    const user = await createTestUser(app, { email: 'user7@example.com' });
    const token = await getAuthToken(app, 'user7@example.com', 'Password123!');

    await request(app.getHttpServer())
      .post('/users/me/profile')
      .set('Authorization', `Bearer ${token}`)
      .send({ username: 'firstcreate' });

    const res = await request(app.getHttpServer())
      .post('/users/me/profile')
      .set('Authorization', `Bearer ${token}`)
      .send({ username: 'secondcreate' });

    expect(res.status).toBe(409);
  });

  it('TEST 10: Invalid update payload validation (400)', async () => {
    const user = await createTestUser(app, { email: 'user8@example.com' });
    const token = await getAuthToken(app, 'user8@example.com', 'Password123!');

    await request(app.getHttpServer())
      .post('/users/me/profile')
      .set('Authorization', `Bearer ${token}`)
      .send({ username: 'validuser' });

    const res = await request(app.getHttpServer())
      .patch('/users/me/profile')
      .set('Authorization', `Bearer ${token}`)
      .send({ profileImageUrl: 'not-a-valid-url' });

    expect(res.status).toBe(400);
  });

  it('TEST 11: Username normalization (whitespace & case)', async () => {
    const user = await createTestUser(app, { email: 'user9@example.com' });
    const token = await getAuthToken(app, 'user9@example.com', 'Password123!');

    const res = await request(app.getHttpServer())
      .post('/users/me/profile')
      .set('Authorization', `Bearer ${token}`)
      .send({ username: '  Rafi_123  ' });

    expect(res.status).toBe(201);
    expect(res.body.username).toBe('rafi_123');
  });

  it('TEST 12: Sensitive fields are not exposed in response', async () => {
    const user = await createTestUser(app, { email: 'user10@example.com' });
    const token = await getAuthToken(app, 'user10@example.com', 'Password123!');

    const res = await request(app.getHttpServer())
      .post('/users/me/profile')
      .set('Authorization', `Bearer ${token}`)
      .send({ username: 'safeuser' });

    expect(res.status).toBe(201);
    expect(res.body).not.toHaveProperty('passwordHash');
    expect(res.body).not.toHaveProperty('refreshTokenHash');
  });

  it('TEST 13: Profile ownership isolation (IDOR/BOLA prevention)', async () => {
    await createTestUser(app, { email: 'usera@example.com' });
    const tokenA = await getAuthToken(app, 'usera@example.com', 'Password123!');

    await createTestUser(app, { email: 'userb@example.com' });
    const tokenB = await getAuthToken(app, 'userb@example.com', 'Password123!');

    await request(app.getHttpServer())
      .post('/users/me/profile')
      .set('Authorization', `Bearer ${tokenA}`)
      .send({ username: 'usera_profile', bio: 'Bio A' });

    await request(app.getHttpServer())
      .post('/users/me/profile')
      .set('Authorization', `Bearer ${tokenB}`)
      .send({ username: 'userb_profile', bio: 'Bio B' });

    await request(app.getHttpServer())
      .patch('/users/me/profile')
      .set('Authorization', `Bearer ${tokenB}`)
      .send({ bio: 'Bio B Updated' });

    const getA = await request(app.getHttpServer())
      .get('/users/me/profile')
      .set('Authorization', `Bearer ${tokenA}`);

    expect(getA.body.bio).toBe('Bio A');
  });

  it('TEST 14: Empty PATCH payload rejection (400)', async () => {
    const user = await createTestUser(app, { email: 'user14@example.com' });
    const token = await getAuthToken(app, 'user14@example.com', 'Password123!');

    await request(app.getHttpServer())
      .post('/users/me/profile')
      .set('Authorization', `Bearer ${token}`)
      .send({ username: 'user14_profile' });

    const res = await request(app.getHttpServer())
      .patch('/users/me/profile')
      .set('Authorization', `Bearer ${token}`)
      .send({});

    expect(res.status).toBe(400);
  });
});