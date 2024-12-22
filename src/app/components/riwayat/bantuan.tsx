import { useRouter } from 'next/navigation'
import React, { useState, useEffect }  from 'react';
import Link from 'next/link';
import IconBantuanAsk from "@/app/components/icon/bantuan-ask";
import IconBantuanBubble from "@/app/components/icon/bantuan-bubble";
import IconArrowRight from "@/app/components/icon/arrow-right";
import IconInfo from "@/app/components/icon/info";
import IconHistory from "@/app/components/icon/history";

interface HeaderProps {
    komplain?: boolean; // Make the title prop optional
}

const Bantuan: React.FC<HeaderProps> = ({komplain}) => {

    return (
        <>
        <div className="relative items-center py-3 text-sm transition-all duration-200 rounded-md cursor-pointer text-black-80 border-white-30 w-full max-w-[444px] bg-gray-100 mt-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center pl-4">
                        <p className="text-base text-black-80 font-bold">Butuh Bantuan?</p>
                    </div>
                </div>

                <div className="my-2 p-3 border-t-2 flex flex-col gap-y-3 justify-start">
                    <Link href={`/pesan/marketplace/anugrah-store`}>
                    <div className="flex items-center pl-4 justify-between">
                        <div className="flex flex-wrap gap-x-2">
                            <IconBantuanBubble></IconBantuanBubble>
                            <p className="text-sm text-black-80 font-bold">Hubungi Penjual</p>
                        </div>
                        <IconArrowRight></IconArrowRight>
                    </div>
                    </Link>
                    
                    {komplain && (
                        <>
                        <Link href={`/transaksi/komplain/98129012`}>
                        <div className="flex items-center pl-4 justify-between">
                            <div className="flex flex-wrap gap-x-2">
                                <IconInfo></IconInfo>
                                <p className="text-sm text-black-80 font-bold">Ajukan Komplain</p>
                            </div>
                            <IconArrowRight></IconArrowRight>
                        </div>
                        </Link>
                        </>
                    )}
                    
                    <Link href={`/pusat-bantuan`}>
                    <div className="flex items-center pl-4 justify-between">
                        <div className="flex flex-wrap gap-x-2">
                            <IconBantuanAsk></IconBantuanAsk>
                            <p className="text-sm text-black-80 font-bold">Pusat Bantuan</p>
                        </div>
                        <IconArrowRight></IconArrowRight>
                    </div>
                    </Link>
                </div>
            </div>
        </>
    )

}

export default Bantuan;