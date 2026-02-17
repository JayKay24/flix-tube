import axios from "axios";
import { Readable } from "node:stream";

export async function POST(req: Request) {
  const response = await axios({
    method: "POST",
    url: `${process.env.NEXT_PUBLIC_VIDEO_UPLOAD_HOST}/upload`,
    data: req.body ? Readable.fromWeb(req.body as any) : null,
    headers: {
      'Content-Type': req.headers.get('content-type') ?? '',
      'File-Name': req.headers.get('file-name') ?? ''
    },
    responseType: "stream"
  });
  return new Response(Readable.toWeb(response.data) as ReadableStream);
}
