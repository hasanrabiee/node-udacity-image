import request from 'supertest';
import express from 'express';
import { app } from '../server';

describe('GET /api/resize', () => {
  it('should return 200 and the resized image when valid parameters are provided', async () => {
    const response = await request(app)
      .get('/api/resize')
      .query({ filename: 'fjord', width: 100, height: 200 });

    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toContain('image');
  });

  it('should return 400 if width or height is missing', async () => {
    const response = await request(app)
      .get('/api/resize')
      .query({ filename: 'fjord', width: 100 });

    expect(response.status).toBe(400);
  });

  it('should return 400 if width or height is non-numeric', async () => {
    const response = await request(app)
      .get('/api/resize')
      .query({ filename: 'fjord', width: 'abc', height: 200 });

    expect(response.status).toBe(400);
  });

  it('should return 400 if filename format is invalid', async () => {
    const response = await request(app)
      .get('/api/resize')
      .query({ filename: 'fjord$', width: 100, height: 200 });

    expect(response.status).toBe(400);
  });

  it('should return 404 if the image does not exist', async () => {
    const response = await request(app)
      .get('/api/resize')
      .query({ filename: 'nonexistent', width: 100, height: 200 });

    expect(response.status).toBe(400);
  });
});
