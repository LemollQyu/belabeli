import { NextRequest, NextResponse } from "next/server";
import authMiddleware from "./middleware/authMiddleware";

// Middleware utama tanpa config
export function mainMiddleware(req: NextRequest) {
  // Logika middleware utama jika diperlukan

  //   contoh
  //   const role = roleMiddleware(req, ["/authentikasi/lupa-sandi"]);

  //   if (role) {
  //     return role;
  //   }

  return NextResponse.next();
}

// Gunakan authMiddleware di sini
export default authMiddleware(
  mainMiddleware,
  // kalo semisal belum login  url ini nggak bisa diakses
  [
    "/user-settings",
    "/keranjang",
    "/address-list",
    "/pembayaran",
    "/address-form",
    "/edit-address",
    "/homepage/notifikasi",
  ],
  // kalo ini semisal udah login url ini nggak bisa diakses
  ["/authentikasi/login"]

  // mainMiddleware,
  // ["/keranjang"], ["/authentikasi"]
);

// export default authMiddleware(
//   mainMiddleware,
//   // kalo semisal belum login  url ini nggak bisa diakses
//   ["/keranjang"],
//   // kalo ini semisal udah login url ini nggak bisa diakses
//   ["/authentikasi"]
// )
