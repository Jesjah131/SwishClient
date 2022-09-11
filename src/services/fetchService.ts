import { Root } from "../interfaces/payments";

export async function fetchUntil(
  request?: Request,
  init?: RequestInit
): Promise<Root> {
  return await fetch(
    "https://yg3fkagcth.execute-api.eu-north-1.amazonaws.com/payments",
    { method: "GET" }
  ).then((response: Response) => {
    if (response.ok) {
      return response.json();
    } else {
    }
  });
}
