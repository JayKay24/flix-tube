import axios from "axios"

export async function GET(res: Response) {
  const response = await axios({
    method: "GET",
    url: `${process.env.NEXT_PUBLIC_HISTORY_HOST}/viewed`,
    responseType: "stream"
  });
  response.data.pipe(res);
}