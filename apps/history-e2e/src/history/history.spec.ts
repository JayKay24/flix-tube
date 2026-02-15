import axios from 'axios';
import { loadFixture } from '@flix-tube/mongodb-fixtures';

describe('GET /', () => {
  it('should return a message', async () => {
    const res = await axios.get('/');

    expect(res.status).toBe(200);
    expect(res.data).toEqual({ message: 'Hello API' });
  });
});

describe('GET /viewed', () => {
  beforeEach(async () => {
    await loadFixture('history', 'history/vieweds.js');
  });

  it('should return a message', async () => {
    const res = await axios.get('/viewed');
    const { data } = res;
    const videoId = '5ea234a1c34230004592eb32';

    expect(res.status).toBe(200);
    expect(data.length).toBe(1);
    expect(data[0].videoId).toBe(videoId);
  });
});