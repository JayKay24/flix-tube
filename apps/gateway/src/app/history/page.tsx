"use client"

import { useHistory } from "@/hooks/useHistory";
import Link from "next/link"
import { useEffect } from "react";

export default function Index() {
  const { fetchHistory, history } = useHistory();

  useEffect(() => {
    (async () => {
      await fetchHistory(`${process.env.NEXT_PUBLIC_HISTORY_HOST}/viewed`);
    })()
  }, []);

  return (
    <div className="flex flex-col">
      <div className="border-b-2 bg-gray-100">
        <div className="nav flex flex-row items-center mt-1 p-2">
          <div className="text-xl font-bold">
            FlixTube
          </div>
          <Link className="ml-16" href="/">
            Videos
          </Link>
          <Link className="ml-4" href="/upload">
            Upload
          </Link>
          <Link className="ml-4 border-b-2 border-blue-600" href="/history">
            History
          </Link>
        </div>
      </div>
      <div className="m-4">
        <h1>Viewing history</h1>
        <div className="m-4">
          <table>
            <tr>
              <th className="border-b-2 p-1 px-2">Video Id</th>
            </tr>
            {
              history.map((historyItem) => (
                <tr className="mt-1" key={historyItem._id}>
                  <td className="border-2 p-1 px-2">
                    {historyItem.videoId}
                  </td>
                </tr>
              ))
            }
          </table>
        </div>
      </div>
    </div>
  );
}