"use client"

import { useState } from "react";
import axios from "axios";

interface IVideo {
  _id: string;
  videoPath: string;
};

function useVideos() {
  const [videos, setVideos] = useState<IVideo[]>([]);

  async function fetchVideos(urlPath: string) {
    try {
      const response = await axios.get<IVideo[]>(urlPath);
      setVideos(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  return { videos, fetchVideos };
}

export { useVideos };
export type { IVideo };
