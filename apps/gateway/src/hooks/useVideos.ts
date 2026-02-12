"use client"

import { useState } from "react";
import axios from "axios";

interface IVideo {
  _id: string;
  url: string;
  name: string;
};

function useVideos() {
  const [videos, setVideos] = useState<IVideo[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchVideos(url: string) {
    setIsLoading(true);
    try {
      const response = await axios.get<IVideo[]>(url);
      setVideos(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return { videos, fetchVideos, isLoading };
}

export { useVideos };
