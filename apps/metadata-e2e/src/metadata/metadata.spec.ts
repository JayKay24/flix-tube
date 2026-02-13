import axios from 'axios';
import { loadFixture } from '../fixtures/loadFixtures';

describe('GET /api', () => {
  it('should return a message', async () => {
    const res = await axios.get(`/api`);

    expect(res.status).toBe(200);
    expect(res.data).toEqual({ message: 'Hello API' });
  });
});

describe('GET /video/:id', () => {
  beforeEach(async () => {
    await loadFixture('metadata', 'metadata.json');
  });

  it('should return a single video metadata object when a valid ID is provided', async () => {
    const videoId = '5ea234a1c34230004592eb32'; // ID from our fixture

    const res = await axios.get(`/video/${videoId}`);
    const { data } = res;

    expect(res.status).toBe(200);
    expect(data).toHaveProperty('name', 'SampleVideo_1280x720_1mb.mp4');
    expect(data).toHaveProperty('_id', videoId);
    expect(data).toHaveProperty('url', `http://localhost:3333/videos/${videoId}`);
  });
});
