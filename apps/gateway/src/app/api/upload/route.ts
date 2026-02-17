import axios from "axios";

export async function POST(req: Request, res: Response) {
  const response = await axios({
    method: "POST",
    url: `${process.env.NEXT_PUBLIC_VIDEO_UPLOAD_HOST}/upload`,
    data: req,
    headers: {
      'Content-Type': req.headers.get('content-type'),
      'File-Name': req.headers.get('file-name')
    },
    responseType: "stream"
  });
  response.data.pipe(res);
}
