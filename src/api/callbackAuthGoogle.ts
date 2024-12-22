import axios from "axios";

type callbackParam = {
  token: string;
};

export default async function callbackAuthGoogle({ token }: callbackParam) {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/google`,
    {
      token,
    },
    {
      headers: {
        Accept: "application/json",
      },
    }
  );

  return response;
}
