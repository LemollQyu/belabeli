import { cookies } from "next/headers";

type AccountFromCookies = {
  email: string;
  phone: string;
  username: string;
};

export default async function getAccount(): Promise<AccountFromCookies | null> {
  const cookieStore = cookies();
  const email = cookieStore.get("email");
  const phone = cookieStore.get("phone");
  const username = cookieStore.get("username");

  // Pastikan semua cookie ada sebelum mengakses nilainya
  if (!email || !phone || !username) {
    return null; // Jika salah satu cookie tidak ditemukan
  }

  const result: AccountFromCookies = {
    email: email.value,
    phone: phone.value,
    username: username.value,
  };

  return result;
}
