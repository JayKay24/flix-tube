import axios from "axios"
import { Readable } from "node:stream";

export async function GET() {
  const response = await axios({
    method: "GET",
    url: `${process.env.NEXT_PUBLIC_HISTORY_HOST}/viewed`,
    responseType: "stream"
  });

  return new Response(Readable.toWeb(response.data) as ReadableStream);
}