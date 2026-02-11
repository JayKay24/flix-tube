"use client";

import Link from "next/link";
import { ChangeEvent, useRef } from "react";
import axios from 'axios';

export default function Index() {
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleUploadFiles = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (event.target.files) {
      for (let i = 0; i < event.target.files.length; i++) {
        handleUploadFile(event.target.files[i]);
      }
    }
  };

  const handleUploadFile = async (file: File) => {
    const uploadRoute = `${process.env.NEXT_PUBLIC_VIDEO_UPLOAD_HOST}/upload`;
    try {
      await axios({
        method: 'POST',
        url: uploadRoute,
        data: file,
        headers: {
          'Content-Type': file.type,
          'File-Name': file.name
        },
      });

      if (resultsRef.current) {
        resultsRef.current.innerHTML += `<div>${file.name}</div>`;
      }
    } catch (error) {
      console.error(`Error uploading file: ${error}`);
      if (resultsRef.current) {
        resultsRef.current.innerHTML += `<div>Error uploading file: ${file.name}</div>`;
      }
    }
  };

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
          <Link className="ml-4 border-b-2 border-blue-600" href="/upload">
            Upload
          </Link>
          <Link className="ml-4" href="/history">
            History
          </Link>
        </div>
      </div>
      <div className="m-4">
        <h1>Upload videos</h1>
        <div className="m-4">
          <form className="upload-form">
            <p>Click the button and choose videos to upload.</p>
            <input
              className="mt-2"
              type="file"
              id="uploadInput"
              accept="video/*"
              onChange={handleUploadFiles}
              placeholder="Upload videos"
            />
          </form>
          <div id="results" className="mt-4" ref={resultsRef}>
            <div>Uploaded:</div>
          </div>
        </div>
      </div>
    </div>
  );
}