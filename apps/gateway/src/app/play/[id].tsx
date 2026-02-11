import Link from "next/link";

export default function Index() {
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
        <h1>Playing</h1>
      </div>
    </div>
  );
}