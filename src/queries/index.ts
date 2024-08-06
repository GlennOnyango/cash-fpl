import axios from "axios";

const local_url = process.env.NEXT_PUBLIC_NEXT_BACKEND_URL;

export async function getLimits(currencyId: string) {
  //check if token is available

  return axios
    .get(`${local_url}/api/limits?currencyId=${currencyId}`, {
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 30000,
    })
    .then((res) => res.data);
}
