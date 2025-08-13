process.env.DB_FILE = ':memory:';

const request = require('supertest');
const app = require('../server');

describe('Issue Tracker API', () => {
  it('lists empty issues initially', async () => {
    const res = await request(app).get('/api/issues');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('creates an issue', async () => {
    const res = await request(app).post('/api/issues').send({
      title: 'Test issue',
      description: 'Reproduce a bug',
      priority: 'high'
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('Test issue');
    expect(res.body.resolved).toBe(false);
    global.createdId = res.body.id;
  });

  it('lists created issues', async () => {
    const res = await request(app).get('/api/issues');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('toggles resolved status', async () => {
    const res = await request(app).patch(`/api/issues/${global.createdId}`).send({});
    expect(res.statusCode).toBe(200);
    expect(res.body.resolved).toBe(true);
  });

  it('deletes an issue', async () => {
    const res = await request(app).delete(`/api/issues/${global.createdId}`);
    expect(res.statusCode).toBe(204);
  });
});
