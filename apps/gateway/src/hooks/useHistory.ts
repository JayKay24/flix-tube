"use client"

import { useState } from "react";
import axios from "axios";

interface IHistoryItem {
  videoId: string;
  _id: string;
}

function useHistory() {
  const [history, setHistory] = useState<IHistoryItem[]>([]);

  async function fetchHistory(urlPath: string) {
    try {
      const response = await axios.get<IHistoryItem[]>(urlPath);
      setHistory(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  return { history, fetchHistory };
}

export { useHistory };
export type { IHistoryItem };
