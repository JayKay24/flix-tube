"use client"

import { useState } from "react";
import axios from "axios";

interface IVideoMetadata {
  id: string;
  name: string;
  url: string;
};

function useMetadata() {
  const [videoMetadata, setVideoMetadata] = useState<IVideoMetadata | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchVideoMetadata(url: string) {
    setIsLoading(true);
    try {
      const response = await axios.get<IVideoMetadata>(url);
      setVideoMetadata(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return { videoMetadata, fetchVideoMetadata, isLoading };
}

export { useMetadata };