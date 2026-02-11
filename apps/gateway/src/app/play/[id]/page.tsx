"use client"

import { useMetadata } from "@/hooks/useMetadata";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function Index() {
  const { fetchVideoMetadata, videoMetadata } = useMetadata();
  const { id } = useParams<{id: string}>();

  useEffect(() => {
    (async () => {
      await fetchVideoMetadata(`${process.env.NEXT_PUBLIC_METADATA_HOST}/video/${id}`);
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
          <Link className="ml-4" href="/history">
            History
          </Link>
        </div>
      </div>
      <div className="m-4">
        <h1>Playing {videoMetadata?.name}</h1>
        <div className="m-4">
          <video controls autoPlay muted>
            <source src={videoMetadata?.url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
}