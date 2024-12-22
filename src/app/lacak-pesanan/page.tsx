"use client"
import { useRouter } from 'next/navigation'
import LayoutUtama from '../layouts/layout-utama'
import Header from '../layouts/header'

const LacakPesanan = () => {
  const router = useRouter()

  return (
    <>
    {/* <LayoutUtama> */}
    <Header title="Lacak Pesanan" children={undefined}/>
    <div className="w-full max-w-[400px] mx-auto py-4 space-y-6 px-4 font-nunito">
      {/* Status akhir */}
      <div className="mt-20 border rounded-lg px-4 justify-between">
        <div className="p-2 flex items-center justify-center">
          <svg
            width="400"
            height="30"
            viewBox="0 0 268 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20 3L22 7V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V7.00353L4 3H20ZM12 10L8 14H11V18H13V14H16L12 10ZM18.764 5H5.236L4.237 7H19.764L18.764 5Z"
              fill="#51D7B1"
            />
            <path
              d="M34 12L112 12"
              stroke="#A8EBD8"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
            <path
              d="M220.965 19C220.722 20.6961 219.263 22 217.5 22C215.737 22 214.278 20.6961 214.035 19H213V7C213 6.44772 213.448 6 214 6H228C228.552 6 229 6.44772 229 7V9H232L235 13.0557V19H232.965C232.722 20.6961 231.263 22 229.5 22C227.737 22 226.278 20.6961 226.035 19H220.965ZM227 8H215V16.0505C215.635 15.4022 216.521 15 217.5 15C218.896 15 220.101 15.8175 220.663 17H226.337C226.504 16.647 226.73 16.3264 227 16.0505V8ZM229 14H233V13.715L230.992 11H229V14ZM229.5 20C230.153 20 230.709 19.5826 230.915 19C230.97 18.8436 231 18.6753 231 18.5C231 17.6716 230.328 17 229.5 17C228.672 17 228 17.6716 228 18.5C228 18.6753 228.03 18.8436 228.085 19C228.291 19.5826 228.847 20 229.5 20ZM219 18.5C219 17.6716 218.328 17 217.5 17C216.672 17 216 17.6716 216 18.5C216 18.6753 216.03 18.8436 216.085 19C216.291 19.5826 216.847 20 217.5 20C218.153 20 218.709 19.5826 218.915 19C218.97 18.8436 219 18.6753 219 18.5Z"
              fill="#51D7B1"
            />
            <path
              d="M118 12L196 12"
              stroke="#A8EBD8"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
            <path
              d="M265 20C265 20.5523 264.552 21 264 21H248C247.448 21 247 20.5523 247 20V9.48907C247 9.18048 247.142 8.88917 247.386 8.69972L255.386 2.47749C255.747 2.19663 256.253 2.19663 256.614 2.47749L264.614 8.69972C264.858 8.88917 265 9.18048 265 9.48907V20ZM263 19V9.97815L256 4.53371L249 9.97815V19H263Z"
              fill="#51D7B1"
            />
          </svg>
        </div>
        <div className="p-1 font-nunito text-[10px] text-center font-medium mb-2">
          Barangmu sudah sampai tujuan
        </div>
      </div>

      {/* Timeline Pesanan */}
      <div className="rounded-[40px] space-y-6 px-6 py-10 bg-[rgba(234,251,238,0.44)]">
      {[
          {
            status: 'Pesanan di proses oleh penjual',
            date: '27 Juli 2024, 14.50 WIB',
            desc: 'Pesanan di proses oleh penjual',
          },
          {
            status: 'Pesanan telah diserahkan ke jasa kirim',
            date: '28 Juli 2024, 14.50 WIB',
            desc: 'Pesanan di proses oleh penjual',
          },
          {
            status: 'Pesanan tiba di lokasi transit',
            date: '29 Juli 2024, 14.50 WIB',
            desc: 'Pesanan di proses oleh penjual',
          },
          {
            status: 'Pesanan tiba di lokasi sortir Semarang',
            date: '30 Juli 2024, 14.50 WIB',
            desc: 'Pesanan di proses oleh penjual',
          },
          {
            status: 'Pesanan tiba di lokasi tujuan',
            date: '30 Juli 2024, 17.50 WIB',
            desc: 'Pesanan di proses oleh penjual',
          },
        ].map((item, index) => (
          <div key={index} className="relative flex items-start gap-3">
            {/* Garis vertikal */}
            <div className="absolute top-0 left-2.5 h-full w-px bg-dashed bg-[#A8EBD8]"></div>
            {/* Bulatan status */}
            <div className="relative z-10 w-[21px] h-[21px] bg-[#2EC99D] rounded-full"></div>
            {/* Informasi status */}
            <div className="flex flex-col gap-2">
              <div className="text-[#2ec99d] text-sm font-semibold">
                {item.status}
              </div>
              <div className="text-[#1c785e] text-xs">{item.date}</div>
              <div className="text-[#1c785e] text-xs">{item.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
    {/* </LayoutUtama> */}
    </>
  );
};

export default LacakPesanan
