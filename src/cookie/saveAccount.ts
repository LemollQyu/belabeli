"use server";

import { cookies } from "next/headers";

type token = {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  token_type: string;
  username: string;
  email: string;
  phone: string;
};

export default async function saveAccount(token: token) {
  const exp = 7200;
  cookies().set("access-token", token.access_token, { maxAge: exp });
  cookies().set("refresh-token", token.refresh_token, { maxAge: exp });
  cookies().set("username", token.username, { maxAge: exp });
  cookies().set("email", token.email, { maxAge: exp });
  cookies().set("phone", token.phone, { maxAge: exp });
}
