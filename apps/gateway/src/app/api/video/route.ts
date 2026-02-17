import axios from "axios";
import { Readable } from "node:stream";

export async function GET() {
  const response = await axios({
    method: "GET",
    url: `${process.env.NEXT_PUBLIC_METADATA_HOST}/video`,
    responseType: "stream"
  });
  
  // Convert the Node.js stream (Axios) to a Web Stream for the Response
  return new Response(Readable.toWeb(response.data) as ReadableStream);
}
