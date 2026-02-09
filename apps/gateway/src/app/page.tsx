"use client"

import { useEffect } from 'react';
import { useVideos } from '../hooks/useVideos';

export default function Index() {
  const { videos, fetchVideos } = useVideos();

  useEffect(() => {
    (async () => {
      await fetchVideos('http://metadata/video');
    })()
  }, []);
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.tailwind file.
   */
  return (
    <div className="flex flex-col">
      <div className="border-b-2 bg-gray-100">
        <div className="nav flex flex-row items-center mt-1 p-2">
          <div className="text-xl font-bold">
            FlixTube
          </div>
          <div className="ml-16 border-b-2 border-blue-600">
            <a href="/">Videos</a>
          </div>
        </div>
      </div>
      <div className="m-4">
        <h1>Videos</h1>
        <div id="video-list" className="m-4">
          {
            videos.length > 0 ? (
                videos.map((video) => (
                  <div className="mt-1" key={video._id}>
                    <a href={`/video?id=${video._id}`}>
                      {video.videoPath}
                    </a>
                  </div>
                ))
              ) : ( 
                <div>No videos uploaded yet.</div> 
              )
          }
        </div>
      </div>
    </div>
  );
}
