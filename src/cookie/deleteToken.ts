"use server";

import { cookies } from "next/headers";

export default async function deleteToken() {
  cookies().delete("access-token");
  cookies().delete("refresh-token");
  cookies().delete("username");
  cookies().delete("email");
  cookies().delete("phone");
}
