import axios from "axios";

export async function GET({ params }: { params: Promise<{ id: string }> }, res: Response) {
  const { id } = await params;
  const response = await axios({
    method: "GET",
    url: `${process.env.NEXT_PUBLIC_METADATA_HOST}/video/${id}`,
    responseType: "stream"
  });
  response.data.pipe(res);
}