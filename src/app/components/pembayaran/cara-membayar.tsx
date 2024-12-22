import { useState } from "react";

const paymentMethods = [
  {
    name: "Transfer Melalui ATM",
    description:
      "Cara pertama transfer virtual account beda bank adalah melalui mesin ATM terdekat. Caranya sebagai berikut:\n1. Masukkan kartu ATM\n2. Masukkan 6 digit PIN ATM\n3. Pilih menu Transaksi Lainnya > Transfer > Antar Bank Online\n4. Masukkan Kode Bank dan Nomor Virtual Account tujuan\n5. Pastikan nominal yang muncul di layar sudah sesuai dengan nominal di invoice\n6. Pilih OK atau YES\n7. Transaksi Selesai",
  },
  {
    name: "Transfer Melalui Internet Banking",
    description:
      'Cara pertama transfer virtual account beda bank adalah melalui internet banking. Caranya sebagai berikut:\n1. Login ke dalam akun Internet Banking\n2. Pilih "Transfer" dan pilih "Transfer Virtual Account".\n3. Masukkan Kode Virtual Accountnya\n4. Setelah selesai memasukkan Kode Virtual Account, tekan Lanjutkan\n5. Muncul layar konfirmasi jumlah total pembayaran, jika sudah benar tekan Ya.\n6. Selesai.',
  },
  {
    name: "Transfer Melalui Mobile Banking",
    description:
      "Cara pertama transfer virtual account beda bank adalah melalui mobile banking di smartphone. Caranya sebagai berikut:\n1. Buka aplikasi m-banking di smartphone.\n2. Masukkan username dan password.\n3. Pilih menu Transfer > Bank Lain Dalam Negeri\n4. Masukkan Kode Bank dan Nomor Virtual Account tujuan\n5. Masukkan nominal yang harus dibayarkan.\n6. Layar akan menunjukkan konfirmasi. Apabila telah sesuai, pilih Lanjutkan / Kirim.\n7. Masukkan PIN transaksi.\n8. Selesai.",
  },
];

const CaraMembayar = () => {
  return (
    <div className="px-4 font-nunito">
      {/* Cara Membayar */}
      <div className="rounded-[12px] border w-full mx-auto space-y-6 py-4 border-gray-200 bg-[#FDFDFD] shadow-[0_0_4px_rgba(0,0,0,0.25)]">
        <div className="ml-4 text-start text-[#0e0e0e] text-base font-bold font-['Nunito'] leading-[15px]">
          Cara Membayar
        </div>
        {paymentMethods.map((method) => (
          <Details
            key={method.name}
            title={method.name}
            description={method.description}
          />
        ))}
      </div>
    </div>
  );
};

// Komponen untuk Collapsible Section
const Details = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="px-4">
      <div className="rounded-[12px] border border-grey-500 w-full mx-auto space-y-6 p-2">
        <button
          className="px-2 w-full text-left flex justify-between items-center text-sm font-semibold py-2 border-gray-200"
          onClick={() => setOpen(!open)}
        >
          {title}
          <span>
            {open ? (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.9997 10.8284L7.04995 15.7782L5.63574 14.364L11.9997 8L18.3637 14.364L16.9495 15.7782L11.9997 10.8284Z"
                  fill="#0F0F0F"
                />
              </svg>
            ) : (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.9999 13.1716L16.9496 8.2218L18.3638 9.636L11.9999 16L5.63586 9.636L7.05006 8.2218L11.9999 13.1716Z"
                  fill="#0F0F0F"
                />
              </svg>
            )}
          </span>
        </button>
        {open && (
          <div className="text-black text-sm ml-2">
            {/* Menampilkan instruksi pembayaran sesuai metode */}
            {description.split("\n").map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CaraMembayar;
