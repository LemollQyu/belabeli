"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useRouter, useParams } from "next/navigation";
import dynamic from "next/dynamic";

const Navigasi = () => {
  const pathname = usePathname();

  const params = useParams();
  const productSlug = params.product;

  const [selectId, setSelectId] = useState<string>("");
  const [active, setActive] = useState(false);

  const segments = pathname.split("/").filter(Boolean);
  const dynamicSegment = segments.slice(1);

  console.log(decodeURIComponent(dynamicSegment[0]));

  const handleClickId = (e: any) => {
    e.preventDefault();
    if (e.target.id == "1") {
      console.log("1");
      setActive(true);
      setSelectId("1");
    } else if (e.target.id == "2") {
      console.log("2");
      setActive(false);
      setSelectId("2");
    } else if (e.target.id == "3") {
      console.log("3");
      setSelectId("3");
      setActive(false);
    } else if (e.target.id == "4") {
      console.log("4");
      setSelectId("4");
      setActive(false);
    }
  };

  return (
    <>
      <div
        onClick={handleClickId}
        className={`w-full sm:w-[400px] z-20 h-[50px] rounded-t-3xl mx-auto border-t border-x  fixed bottom-0 left-1/2 -translate-x-1/2 flex items-center justify-between px-5 bg-white ${
          // pathname === "/authentikasi" ||
          // pathname === "/authentikasi/login" ||
          // pathname === "/authentikasi/registrasi" ||
          // pathname == "/authentikasi/lupa-sandi" ||
          // pathname == "/authentikasi/lupa-sandi/sandi-baru" ||
          // pathname == "/authentikasi/lupa-sandi/kode-otp" ||
          // pathname == "/callback-google" ||
          // pathname == "/coba" ||
          // pathname == "/address-list" ||
          // pathname == "/address-data" ||
          // pathname == "/address-form" ||
          // pathname == "/pin-location" ||
          // pathname == "/laman-pembayaran" ||
          // pathname == "/pin-location" ||
          // pathname == "/lacak-pesanan" ||
          // pathname == "/general-settings" ||
          // pathname == "/pengaturan/tambah-alamat" ||
          // pathname == "/pengaturan/tambah-alamat/address-form" ||
          // pathname == "/pengaturan/rekening-bank" ||
          // pathname == "/pengaturan/tambah-rekening" ||
          // pathname == "/pengaturan/verif-otp" ||
          // pathname == "/pengaturan/keamanan-akun" ||
          // pathname == "/pengaturan/notifikasi" ||
          // pathname == "/pengaturan/privasi" ||
          // pathname == "/pengaturan/versi" ||
          // pathname == "/pesanan" ||
          // pathname == "/pembayaran" ||
          // pathname == "/pengaturan/tema-tampilan" ||
          // pathname == "/user-settings/profile" ||
          // pathname == "/user-settings/profile/kode-otp" ||
          // pathname == "/user-settings/ulasan" ||
          // pathname == "/user-settings/pin-location" ||
          // pathname == "/user-settings/riwayat-pencarian" ||
          // pathname == "/user-settings/ulasan/edit" ||
          // pathname == "/user-settings/terakhir-dilihat" ||
          // pathname == "/user-settings/toko-diikuti" ||
          // pathname == "/user-settings/live-chat" ||
          // pathname == "/user-settings/pusat-bantuan" ||
          // pathname == "/user-settings/pusat-bantuan/bantuan" ||
          // pathname == "/user-settings/hapus-akun" ||
          // pathname == "/user-settings/hapus-akun/kata-sandi" ||
          // pathname == "/user-settings/hapus-akun/kode-otp" ||
          // pathname == "/user-settings/hapus-akun/hapus" ||
          // pathname == "/seller/informasi-toko" ||
          // pathname == "/seller/dashboard" ||
          // pathname == "/seller/verif-seller/setup-toko" ||
          // pathname == "/seller/verif-seller" ||
          // pathname == "/seller/dashboard/setup-toko/pusat-bantuan" ||
          // pathname == "/seller/dashboard/setup-toko/live-chat" ||
          // pathname == "/seller/informasi-toko/kode-otp" ||
          // pathname == "/seller/verif-seller/setup-toko/pin-location" ||
          // pathname == "/seller/verif-seller/verifikasi" ||
          // pathname == "/seller/dashboard/setup-toko" ||
          // pathname == "/seller/dashboard/setup-toko/operasional-toko/atur-jam" ||
          // pathname == "/seller/dashboard/setup-toko/operasional-toko" ||
          // pathname == "/seller/dashboard/setup-toko/pengikut-toko" ||
          // pathname == "/seller/dashboard/setup-toko/rekening-bank" ||
          // pathname == "/seller/dashboard/setup-toko/rekening-bank/tambah-qris" ||
          // pathname == "/seller/dashboard/setup-toko/alamat-toko" ||
          // pathname == "/seller/dashboard/setup-toko/layanan-pengiriman" ||
          // pathname == "/seller/dashboard/setup-toko/notifikasi" ||
          // pathname == "/seller/dashboard/setup-toko/edukasi-seller" ||
          // pathname == "/seller/dashboard/setup-toko/edukasi-seller/manajemen-produk" ||
          // pathname == "/seller/dashboard/setup-toko/hapus-toko" ||
          // pathname == "/seller/dashboard/setup-toko/hapus-toko/kata-sandi" ||
          // pathname == "/seller/dashboard/setup-toko/hapus-toko/kode-otp" ||
          // pathname == "/seller/dashboard/kelola-produk" ||
          // pathname == "/seller/dashboard/manajemen-diskon/tambah-voucher" ||
          // pathname == "/seller/dashboard/manajemen-diskon/tambah-harga" ||
          // pathname == "/seller/dashboard/manajemen-diskon" ||
          // pathname == "/seller/dashboard/manajemen-diskon/tambah-voucher/lihat-voucher" ||
          // pathname == "/seller/dashboard/manajemen-diskon/tambah-voucher/lihat-voucher/voucher" ||
          // pathname == "/seller/dashboard/manajemen-diskon/tambah-harga/pilih-produk" ||
          // pathname == "/seller/dashboard/manajemen-diskon/tambah-harga/pilih-produk/lihat-harga" ||
          // pathname == "/seller/dashboard/manajemen-diskon/tambah-harga/pilih-produk/lihat-harga/harga" ||
          // pathname == "/seller/dashboard/manajemen-diskon/tambah-flashsale" ||
          // pathname == "/seller/dashboard/manajemen-diskon/tambah-flashsale/pilih-produk" ||
          // pathname == "/seller/dashboard/manajemen-diskon/tambah-flashsale/pilih-produk/lihat-harga" ||
          // pathname == "/seller/dashboard/manajemen-diskon/tambah-flashsale/pilih-produk/lihat-harga/flashsale" ||
          // pathname == "/seller/dashboard/super-seller" ||
          // pathname == "/seller/dashboard/super-seller/informasi-akun" ||
          // pathname == "/seller/dashboard/notifikasi" ||
          // pathname == "/seller/dashboard/notifikasi/perlu-dikirim" ||
          // pathname == "/seller/dashboard/notifikasi/perlu-dikirim/detail" ||
          // pathname == "/seller/dashboard/notifikasi/selesai" ||
          // pathname == "/seller/dashboard/notifikasi/selesai/detail" ||
          // pathname == "/seller/dashboard/notifikasi/negosiasi" ||
          // pathname == "/seller/dashboard/notifikasi/negosiasi/detail" ||
          // pathname == "/seller/dashboard/notifikasi/dana-masuk" ||
          // pathname == "/seller/dashboard/notifikasi/dana-masuk/detail" ||
          // pathname == "/seller/dashboard/notifikasi/dikomplain" ||
          // pathname == "/seller/dashboard/notifikasi/dikomplain/detail" ||
          // pathname == "/seller/dashboard/notifikasi/dikomplain/rincian" ||
          // pathname == "/seller/dashboard/notifikasi/dikomplain/rincian/konfirmasi" ||
          // pathname == "/seller/dashboard/notifikasi/dikomplain/rincian/konfirmasi/detail" ||
          // pathname == "/seller/dashboard/notifikasi/diulas" ||
          // pathname == "/seller/dashboard/notifikasi/diulas/detail" ||
          // pathname == "/seller/dashboard/notifikasi/diulas/detail/ulasan-produk" ||
          // pathname == "/seller/dashboard/ulasan-produk" ||


          // pathname == "/seller/dashboard/setup-toko/rekening-bank/tambah-rekening" ||
          // pathname == "/seller/dashboard/setup-toko/alamat-toko/address-form" ||
          // pathname == "/seller/dashboard/setup-toko/alamat-toko/address-form/pin-location" ||

          // pathname == `/product/${dynamicSegment}` ||
          // pathname == "/modul-ulasan" ||
          // pathname == "/beri-ulasan" ||
          // pathname == "/coba2" ||
          // pathname == `/modul-ulasan/ulasan` ||
          // pathname == `/${productSlug}/beri-ulasan`
          pathname == "/" ||
          pathname == "/feed" ||
          pathname == "/user-settings" ||
          pathname == "/transaksi/keranjang"
            ? ""
            : "hidden"
        }`}
      >
        {/* icon home */}
        <Link
          href={"/"}
          className="w-[50px] z-10 h-full flex flex-col items-center justify-center  gap-[1px]"
          id="1"
        >
          {active ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 18 21"
              fill="none"
              className={`${selectId == "1" && "-translate-y-[2px]"} `}
            >
              <path
                d="M18 17.9998C18 18.5521 17.5523 18.9998 17 18.9998H1C0.44772 18.9998 0 18.5521 0 17.9998V7.48883C0 7.18024 0.14247 6.88893 0.38606 6.69948L8.3861 0.477247C8.7472 0.196387 9.2528 0.196387 9.6139 0.477247L17.6139 6.69948C17.8575 6.88893 18 7.18024 18 7.48883V17.9998Z"
                fill="#51D7B1"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              id="1"
            >
              <path
                d="M21 20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V9.48907C3 9.18048 3.14247 8.88917 3.38606 8.69972L11.3861 2.47749C11.7472 2.19663 12.2528 2.19663 12.6139 2.47749L20.6139 8.69972C20.8575 8.88917 21 9.18048 21 9.48907V20ZM19 19V9.97815L12 4.53371L5 9.97815V19H19Z"
                fill="black"
              />
            </svg>
          )}

          <h1
            id="1"
            className={`${
              selectId == "1" && "-translate-y-[1px] text-[#51D7B1]"
            } font-nunitoBold text-[8px]`}
          >
            Home
          </h1>
        </Link>
        {/* tutup home */}
        {/* icon feed */}
        <Link
          href={"/feed"}
          id="2"
          className="w-[50px] h-full flex flex-col items-center justify-center  gap-[1px] z-10"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 64 64"
            width="24"
            height="24"
            id="2"
            className={`${selectId == "2" && "-translate-y-[2px]"} `}
          >
            <rect
              x="8"
              y="12"
              width="48"
              height="36"
              rx="4"
              ry="4"
              fill={selectId == "2" ? `#51D7B1` : `white`}
              stroke={selectId == "2" ? `#51D7B1` : `black`}
              strokeWidth="5"
              id="2"
            />

            <polygon
              id="2"
              points="26,22 26,42 42,32"
              fill={selectId == "2" ? `white` : `black`}
            />

            <line
              id="2"
              x1="24"
              y1="12"
              x2="16"
              y2="4"
              stroke={selectId == "2" ? `#51D7B1` : `black`}
              strokeWidth="5"
            />
            <line
              id="2"
              x1="40"
              y1="12"
              x2="48"
              y2="4"
              stroke={selectId == "2" ? `#51D7B1` : `black`}
              strokeWidth="5"
            />
          </svg>
          <h1
            id="2"
            className={`${
              selectId == "2" && "-translate-y-[1px] text-[#51D7B1]"
            } font-nunitoBold text-[8px]`}
          >
            Feed
          </h1>
        </Link>
        {/* tutup icon feed */}

        {/* icon keranjang */}
        <Link
          href={"/transaksi/keranjang"}
          id="3"
          className="w-[50px] h-full flex flex-col items-center justify-center  gap-[1px] z-10"
        >
          {selectId == "3" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              className={`${selectId == "3" && "-translate-y-[2px]"} `}
            >
              <path
                d="M4.00436 5.41686L0.761719 2.17422L2.17593 0.76001L5.41857 4.00265H20.6603C21.2126 4.00265 21.6603 4.45037 21.6603 5.00265C21.6603 5.09997 21.6461 5.19678 21.6182 5.29L19.2182 13.29C19.0913 13.713 18.7019 14.0027 18.2603 14.0027H6.00436V16.0027H17.0044V18.0027H5.00436C4.45207 18.0027 4.00436 17.5549 4.00436 17.0027V5.41686ZM5.50436 22.0027C4.67593 22.0027 4.00436 21.3311 4.00436 20.5027C4.00436 19.6742 4.67593 19.0027 5.50436 19.0027C6.33279 19.0027 7.00436 19.6742 7.00436 20.5027C7.00436 21.3311 6.33279 22.0027 5.50436 22.0027ZM17.5044 22.0027C16.6759 22.0027 16.0044 21.3311 16.0044 20.5027C16.0044 19.6742 16.6759 19.0027 17.5044 19.0027C18.3328 19.0027 19.0044 19.6742 19.0044 20.5027C19.0044 21.3311 18.3328 22.0027 17.5044 22.0027Z"
                fill="#51D7B1"
              />
            </svg>
          ) : (
            <svg
              id="3"
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M4.00436 6.41662L0.761719 3.17398L2.17593 1.75977L5.41857 5.00241H20.6603C21.2126 5.00241 21.6603 5.45013 21.6603 6.00241C21.6603 6.09973 21.6461 6.19654 21.6182 6.28976L19.2182 14.2898C19.0913 14.7128 18.7019 15.0025 18.2603 15.0025H6.00436V17.0025H17.0044V19.0025H5.00436C4.45207 19.0025 4.00436 18.5547 4.00436 18.0025V6.41662ZM6.00436 7.00241V13.0025H17.5163L19.3163 7.00241H6.00436ZM5.50436 23.0025C4.67593 23.0025 4.00436 22.3309 4.00436 21.5025C4.00436 20.674 4.67593 20.0025 5.50436 20.0025C6.33279 20.0025 7.00436 20.674 7.00436 21.5025C7.00436 22.3309 6.33279 23.0025 5.50436 23.0025ZM17.5044 23.0025C16.6759 23.0025 16.0044 22.3309 16.0044 21.5025C16.0044 20.674 16.6759 20.0025 17.5044 20.0025C18.3328 20.0025 19.0044 20.674 19.0044 21.5025C19.0044 22.3309 18.3328 23.0025 17.5044 23.0025Z"
                fill="black"
              />
            </svg>
          )}
          <h1
            id="3"
            className={`${
              selectId == "3" && "-translate-y-[1px] text-[#51D7B1]"
            } font-nunitoBold text-[8px]`}
          >
            Keranjang
          </h1>
        </Link>
        {/* tutup icon keranjang */}

        {/* icon profile */}
        <Link
          href={"/user-settings"}
          id="4"
          className="w-[50px] h-full flex flex-col items-center justify-center  gap-[1px] z-10"
        >
          {selectId == "4" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className={`${selectId == "4" && "-translate-y-[2px]"} `}
            >
              <path
                d="M20 22H4V20C4 17.2386 6.23858 15 9 15H15C17.7614 15 20 17.2386 20 20V22ZM12 13C8.68629 13 6 10.3137 6 7C6 3.68629 8.68629 1 12 1C15.3137 1 18 3.68629 18 7C18 10.3137 15.3137 13 12 13Z"
                fill="#51D7B1"
              />
            </svg>
          ) : (
            <svg
              id="4"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M20 22H18V20C18 18.3431 16.6569 17 15 17H9C7.34315 17 6 18.3431 6 20V22H4V20C4 17.2386 6.23858 15 9 15H15C17.7614 15 20 17.2386 20 20V22ZM12 13C8.68629 13 6 10.3137 6 7C6 3.68629 8.68629 1 12 1C15.3137 1 18 3.68629 18 7C18 10.3137 15.3137 13 12 13ZM12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
                fill="black"
              />
            </svg>
          )}
          <h1
            id="4"
            className={`${
              selectId == "4" && "-translate-y-[1px] text-[#51D7B1]"
            } font-nunitoBold text-[8px]`}
          >
            Profile
          </h1>
        </Link>

        {/* tutup icon profile */}
      </div>
    </>
  );
};

export default Navigasi;
