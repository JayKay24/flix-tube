import axios from 'axios';
// import { loadFixture } from '@flix-tube/mongodb-fixtures';

describe('GET /api', () => {
  it('should return a message', async () => {
    const res = await axios.get('/');

    expect(res.status).toBe(200);
    expect(res.data).toEqual({ message: 'Hello API' });
  });
});

// describe('GET /video', () => {
//   beforeEach(async () => {
//     await loadFixture('video-streaming', 'metadata/videos.js');
//   });

//   it('should return a video stream when a valid ID is provided', async () => {
//     const videoId = '5d9e690ad76fe06a3d7ae416'; // ID from our fixture

//     const res = await axios.get(`/video?id=${videoId}`, {
//       responseType: 'stream',
//     });

//     expect(res.status).toBe(200);
//     expect(res.headers['content-type']).toEqual('video/mp4');
//   });
// });
