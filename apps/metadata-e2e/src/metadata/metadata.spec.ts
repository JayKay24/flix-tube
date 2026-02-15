import axios from 'axios';
import { loadFixture } from '@flix-tube/mongodb-fixtures';

describe('GET /', () => {
  it('should return a message', async () => {
    const res = await axios.get('/');

    expect(res.status).toBe(200);
    expect(res.data).toEqual({ message: 'Hello API' });
  });
});

describe('GET /video', () => {
  beforeEach(async () => {
    await loadFixture('metadata', 'metadata/videos.js');
  });

  it('should return a list of videos when the db is populated', async () => {
    const res = await axios.get('/video');
    const { data } = res;

    expect(res.status).toBe(200);
    expect(data).toHaveLength(1);
    expect(data[0]).toHaveProperty('name', 'SampleVideo_1280x720_1mb.mp4');
  });
});

describe('GET /video/:id', () => {
  beforeEach(async () => {
    await loadFixture('metadata', 'metadata/videos.js');
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
