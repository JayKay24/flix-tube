import axios from "axios";

export async function GET(res: Response) {
  const response = await axios({
    method: "GET",
    url: `${process.env.NEXT_PUBLIC_METADATA_HOST}/video`,
    responseType: "stream"
  });
  response.data.pipe(res);
}
