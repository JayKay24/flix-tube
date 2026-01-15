export default async function http_client(req: Request): Promise<Response> {
  return await fetch(req)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response;
    })
    .catch((error) => {
      throw error;
    });
}