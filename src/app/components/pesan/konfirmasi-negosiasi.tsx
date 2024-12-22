"use client";

import IconBankCard from "../icon/bank-card";
import IconCalender from "../icon/calender";
import IconWarna from "../icon/warna";

const KonfirmasiNegosiasi = () => {

  return (
  <>
    <div className="flex flex-col justify-end mb-2 bg-green-100 rounded-lg shadow-lg">
        <div className="flex items-center justify-start h-fit">
            <div className="flex items-center space-x-2 p-3 ">
                <p className="font-light text-sm text-black">Order ID: 1270511324</p>
            </div>
        </div>
        <div className="p-3 border-t-2 flex justify-start gap-3">
            <div className="w-2/6"> 
                <img className="object-cover w-full h-[100px] rounded-md" src="/image/image.png"></img>
            </div>
            <div className="w-4/6"> 
                <h3 className="font-semibold mb-1 text-sm">Sepatu Anak Sekolah SMP Semua Ukuran | Murah dan Berkualitas.</h3>
                
                <div className="flex flex-wrap items-center mb-1">
                    <IconWarna></IconWarna>
                    <p className="mx-2 text-xs font-semibold">Varian :</p>
                    <p className="text-xs font-light">Putih, 34</p>
                </div>

                <div className="flex flex-wrap items-center mb-1">
                    <p className="text-base text-black-80 font-bold">Rp 580.000</p>
                </div>
            </div>
        </div>
        <div className="flex justify-center text-sm w-full px-3 py-2 rounded-b-lg">
            <button className="bg-green-500 py-2 px-2 w-full h-fit text-white rounded-md">Konfirmasi Ke Seller</button>
        </div>
    </div>
  </>
  );
};

export default KonfirmasiNegosiasi;
