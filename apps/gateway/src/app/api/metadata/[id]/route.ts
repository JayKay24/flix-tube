import axios from "axios";
import { Readable } from "node:stream";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const response = await axios({
    method: "GET",
    url: `${process.env.NEXT_PUBLIC_METADATA_HOST}/video/${id}`,
    responseType: "stream"
  });

  return new Response(Readable.toWeb(response.data) as ReadableStream);
}