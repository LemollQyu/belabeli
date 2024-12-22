"use client";

import Link from "next/link";

const DetailPengembalianRetur = () => {

  return (
  <>
    <div className="relative items-center py-3 text-sm transition-all duration-200 rounded-md cursor-pointer text-black-80 border-white-30 w-full max-w-[444px] bg-gray-100 mt-3">
        {/* --- Header toko ----- */}
        <div className="flex items-center justify-between">
            <div className="flex items-center pl-4">
                <p className="text-base text-black-80 font-bold">Pesanan Diretur</p>
            </div>
        </div>

        {/* --- Body toko ----- */}
        <div className="mt-2 p-3 border-t-2 flex flex-wrap justify-start">
            <div className="flex flew-wrap w-full mt-3">
                <button className="bg-white w-1/2 text-black h-fit p-2 text-[10px] font-light leading-tight rounded-tl-lg text-lef"> ID Pemesanan </button>
                <button className="bg-gray-200 text-gray-500 w-full h-fit p-2 text-[10px] font-light leading-tight rounded-tr-lg text-center border-l-0"> ID 1270511324 </button>
            </div>
            <div className="flex flew-wrap w-full">
                <button className="bg-white w-1/2 border-t-[1px] border-gray-200 text-black h-fit p-2 text-[10px] font-light leading-tight text-lef"> Metode Pembayaran </button>
                <button className="bg-gray-300 text-gray-700 w-full h-fit p-2 text-[10px] font-light leading-tight text-center border-l-0"> QRIS </button>
            </div>
            <div className="flex flew-wrap w-full">
                <button className="bg-white w-1/2 border-t-[1px] border-gray-200 text-black h-fit p-2 text-[10px] font-light leading-tight text-lef"> Tanggal Order </button>
                <button className="bg-gray-200 text-gray-700 w-full h-fit p-2 text-[10px] font-light leading-tight text-center border-l-0"> 2 Oktober 2024 </button>
            </div>
            <div className="flex flew-wrap w-full">
                <button className="bg-white w-1/2 border-t-[1px] border-gray-200 text-black h-fit p-2 text-[10px] font-light leading-tight text-lef"> Tanggal Pengiriman </button>
                <button className="bg-gray-300 text-gray-700 w-full h-fit p-2 text-[10px] font-light leading-tight text-center border-l-0"> 3 Oktober 2024 </button>
            </div>
            <div className="flex flew-wrap w-full">
                <button className="bg-white w-1/2 border-t-[1px] border-gray-200 text-black h-fit p-2 text-[10px] font-light leading-tight text-lef"> Tanggal Diretur </button>
                <button className="bg-gray-200 text-gray-700 w-full h-fit p-2 text-[10px] font-light leading-tight text-center border-l-0"> 4 Oktober 2024 </button>
            </div>
            <div className="flex flew-wrap w-full">
                <button className="bg-white w-1/2 border-t-[1px] border-gray-200 text-black h-fit p-2 text-[10px] font-light leading-tight text-lef"> Status Pesanan </button>
                <button className="bg-gray-300 text-green-500 w-full h-fit p-2 text-[10px] font-light leading-tight text-center border-l-0"> Retur </button>
            </div>
            <div className="flex flew-wrap w-full">
                <button className="bg-white w-1/2 border-t-[1px] border-gray-200 text-black h-fit p-2 text-[10px] font-light leading-tight text-lef"> Provider Pengiriman </button>
                <button className="bg-gray-200 text-green-500 w-full h-fit p-2 text-[10px] font-light leading-tight text-center border-l-0"> JNT </button>
            </div>
            <div className="flex flew-wrap w-full">
            
                <button className="bg-white w-1/2 border-t-[1px] border-gray-200 text-black h-fit p-2 text-[10px] font-light leading-tight text-lef"> Nomor Resi </button>
                <button className="bg-gray-300 text-green-500 w-full h-fit p-2 text-[10px] font-light leading-tight text-center border-l-0"> 
                    <Link href={`/lacak-pesanan`}>
                        <span className="underline"> {`JXHASIIQWO990`} </span>
                    </Link>
                </button>
            </div>
            <div className="flex flew-wrap w-full">
                <button className="bg-white w-1/2 border-t-[1px] border-gray-200 text-black h-fit p-2 text-[10px] font-light leading-tight text-lef"> Biaya Ongkir </button>
                <button className="bg-gray-200 text-gray-700 w-full h-fit p-2 text-[10px] font-light leading-tight text-center border-l-0"> Rp 12.000 </button>
            </div>
            <div className="flex flew-wrap w-full justify-between">
                <button className="bg-white w-1/2 border-t-[1px] rounded-bl-lg border-gray-200 text-black h-fit p-2 text-[10px] font-light leading-tight text-lef"> Invoice </button>
                <button className="bg-gray-300 text-blue-500 w-full rounded-br-lg h-fit p-2 text-[10px] font-light leading-tight text-center border-l-0"> Lihat </button>
            </div>
        </div>
    </div>
    </>
  );
};

export default DetailPengembalianRetur;