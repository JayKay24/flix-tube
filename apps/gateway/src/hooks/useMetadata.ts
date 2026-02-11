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

  async function fetchVideoMetadata(url: string) {
    try {
      const response = await axios.get<IVideoMetadata>(url);
      setVideoMetadata(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  return { videoMetadata, fetchVideoMetadata };
}

export { useMetadata };