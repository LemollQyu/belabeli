"use server";

import { cookies } from "next/headers";

export default async function getRefreshToken() {
  const cookieStore = cookies();
  const accesToken = cookieStore.get("refresh-token");

  return accesToken;
}
