"use client"

import { useState } from "react";
import axios from "axios";

interface IHistoryItem {
  videoId: string;
  _id: string;
}

function useHistory() {
  const [history, setHistory] = useState<IHistoryItem[]>([]);

  async function fetchHistory(url: string) {
    try {
      const response = await axios.get<IHistoryItem[]>(url);
      setHistory(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  return { history, fetchHistory };
}

export { useHistory };
