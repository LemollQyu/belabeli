"use client";

import Link from "next/link";
import IconLocations from "../icon/location";
import IconWarna from "../icon/warna";

const DikembalikanRefund = () => {

  return (
  <>
    {/* --- Card toko status : pengembalian retur----- */}
    <div className="relative items-center py-3 text-sm transition-all duration-200 rounded-md cursor-pointer text-black-80 border-white-30 w-full max-w-[444px] bg-gray-100 mt-3">
        {/* --- Header toko ----- */}
        <Link href={'/toko/anugrah-store'} >
        <div className="flex items-center justify-between h-[38px]">
            <div className="flex items-center space-x-2 pl-4">
                <svg width="25" height="20" viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.5 9.535V15.1665H18.3333V16.8332H1.66665V15.1665H2.49998V9.535C1.49499 8.86234 0.833313 7.71667 0.833313 6.4165C0.833313 5.72722 1.02034 5.06335 1.361 4.49772L3.62106 0.583171C3.76992 0.325337 4.04503 0.166504 4.34275 0.166504H15.6572C15.9549 0.166504 16.2301 0.325337 16.3789 0.583171L18.6312 4.4846C18.9796 5.06335 19.1666 5.72722 19.1666 6.4165C19.1666 7.71667 18.505 8.86234 17.5 9.535ZM15.8333 10.1436C15.6965 10.1588 15.5575 10.1665 15.4166 10.1665C14.3674 10.1665 13.3991 9.7315 12.7083 9.01084C12.0176 9.7315 11.0492 10.1665 9.99998 10.1665C8.95073 10.1665 7.9824 9.7315 7.29165 9.01084C6.6009 9.7315 5.63257 10.1665 4.58331 10.1665C4.44248 10.1665 4.30345 10.1588 4.16665 10.1436V15.1665H15.8333V10.1436ZM4.82385 1.83317L2.79663 5.34418C2.60339 5.6652 2.49998 6.03225 2.49998 6.4165C2.49998 7.56709 3.43272 8.49984 4.58331 8.49984C5.44245 8.49984 6.20387 7.97509 6.51814 7.19109C6.79781 6.49336 7.78548 6.49336 8.06515 7.19109C8.3794 7.97509 9.14081 8.49984 9.99998 8.49984C10.8591 8.49984 11.6206 7.97509 11.9348 7.19109C12.2145 6.49336 13.2021 6.49336 13.4818 7.19109C13.7961 7.97509 14.5575 8.49984 15.4166 8.49984C16.5672 8.49984 17.5 7.56709 17.5 6.4165C17.5 6.03225 17.3966 5.6652 17.1956 5.33105L15.1761 1.83317H4.82385Z" fill="#878787"/>
                </svg>
                <label className="text-xs text-white font-semibold bg-[#09CBCA] border-teal-400 px-3 py-1 rounded-md">
                SS
                </label>
                <p className="text-base text-black-80 font-bold">Anugrah Shoes</p>
            </div>
            <div className="pr-4">
                <button className="h-6 w-24 rounded-md border-2 border-[#EE443F] bg-[#FCDAD9] text-[#EE443F] text-[10px] font-bold">Refund</button>
            </div>
        </div>
        </Link>
        {/* --- Body toko ----- */}
        <div className="mt-2 p-3 border-t-2 flex justify-start gap-3">
            <div className="w-2/6"> 
                <img className="object-cover w-full h-[100px] rounded-md" src="/image/image.png"></img>
            </div>
            <div className="w-4/6">
                <Link href={'/transaksi/detail/89912891?q=pengembalian-retur'}>
                <h3 className="font-semibold mb-1 text-sm">Sepatu Anak Sekolah SMP Semua Ukuran | Murah dan Berkualitas.</h3>
                <div className="flex flex-wrap items-center mb-1 mt-4">
                    <IconLocations></IconLocations>
                    <p className="text-xs">Semarang, Sampangan</p>
                </div>
                <div className="flex flex-wrap items-center mb-1">
                    <IconWarna></IconWarna>
                    <span className="text-xs">Warna Merah</span>
                </div>
                <div className="mb-1 mt-4 text-base font-bold flex items-center justify-between">
                    <span>Total</span><span>Rp700.000</span>
                </div>
                </Link> 
            </div>
        </div>

        <div className="w-full px-3">
            <Link href={`/product/sepatu`}>
                <button type="button" className="w-full rounded-md bg-[#51D7B1] p-2 text-white font-medium text-sm text-center"> Beli Lagi 
                </button>
            </Link>
        </div>
    </div>
{/* --- End card toko status : dibatalkan --- */}
  </>
  );
};

export default DikembalikanRefund;
