"use client"
import Link from "next/link";
import Header from "@/app/layouts/header";
import Navigasi from "@/app/layouts/_navbar";
import Checklist from "@/app/components/icon/checklist";

const Obrolan = () => {

    return (
    <>
    <Header title="Annas Rahman" children={undefined}/>
        <div className="px-4 font-nunito absolute py-20 items-center w-[400px] left-1/2 -translate-x-1/2">
            <div className="w-full max-w-md mx-auto pt-2 text-center">
                <button className="bg-gray-100 px-3 py-2 text-gray-500 text-sm rounded-lg">Hari ini</button>
            </div>

            <div>
                <div className="flex justify-end mb-2">
                    <div className="flex flex-wrap justify-start items-center max-w-xs bg-green-100 py-2 px-4 rounded-lg shadow-lg">
                        <p className="text-sm text-gray-800">Halo!</p>
                        <span className="flex flex-wrap items-center justify-end text-xs text-gray-400 text-right w-full gap-1">
                            <p>9:30</p> 
                            <Checklist></Checklist>
                        </span>
                    </div>
                </div>

                <div className="flex justify-end mb-2">
                    <div className="flex flex-wrap justify-start items-center max-w-xs bg-green-100 py-2 px-4 rounded-lg shadow-lg">
                        <p className="text-sm text-gray-800"> Permisi untuk produk kaos kremlin ukuran XL warna kuning apakah masih ada?</p>
                        <span className="flex flex-wrap items-center justify-end text-xs text-gray-400 text-right w-full gap-1">
                            <p>9:30</p> 
                            <Checklist></Checklist>
                        </span>
                    </div>
                </div>

                <div className="flex justify-start mb-2">
                    <div className="flex flex-wrap justify-start items-center max-w-xs bg-gray-100 py-2 px-4 rounded-lg shadow-lg">
                        <p className="text-sm text-gray-800">Halo!</p>
                        <span className="flex flex-wrap items-center justify-end text-xs text-gray-400 text-right w-full gap-1">
                            <p>9:30</p> 
                            <Checklist></Checklist>
                        </span>
                    </div>
                </div>

                <div className="flex justify-start mb-2">
                    <div className="flex flex-wrap justify-start items-center max-w-xs bg-gray-100 py-2 px-4 rounded-lg shadow-lg">
                        <p className="text-sm text-gray-800"> Permisi untuk produk kaos kremlin ukuran XL warna kuning apakah masih ada?</p>
                        <span className="flex flex-wrap items-center justify-end text-xs text-gray-400 text-right w-full gap-1">
                            <p>9:30</p> 
                            <Checklist></Checklist>
                        </span>
                    </div>
                </div>
            </div>


        </div>
        <div className='fixed inset-x-0 bottom-10 z-10 block m-auto bg-white max-w-[400px]'>
            <div className="p-4 flex items-center">
                <div className="flex items-center border border-gray-400 rounded-2xl w-full">
                    <input 
                        type="text" 
                        className="bg-transparent flex-1 p-4 text-sm focus:outline-none font-nunito" 
                        placeholder="Tulis pesan anda..." 
                        />
                    <span className="p-2 text-gray-500">
                        <svg width="12" height="20" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.983 14V7C3.983 5.888 4.888 4.987 6 4.992C7.106 4.996 8 5.894 8 7V15.5C8 17.433 6.433 19 4.5 19C2.567 19 1 17.433 1 15.5V15M1 15.05V6C1 3.239 3.239 1 6 1C8.761 1 11 3.239 11 6V13" stroke="#51D7B1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </span>
                </div>
                <div className="flex items-center">
                    <button className="ml-2 p-3 bg-[#51D7B1] rounded-full text-white focus:outline-none">
                        <svg width="21" height="18" viewBox="0 0 21 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M1.29113 0.309093C1.15257 0.250848 0.999712 0.235577 0.85237 0.26526C0.705028 0.294944 0.570004 0.368212 0.464808 0.475564C0.359611 0.582916 0.289096 0.719399 0.262407 0.867312C0.235718 1.01523 0.254087 1.16775 0.315131 1.30509L3.40813 8.25009H11.0001C11.199 8.25009 11.3898 8.32911 11.5305 8.46976C11.6711 8.61042 11.7501 8.80118 11.7501 9.00009C11.7501 9.19901 11.6711 9.38977 11.5305 9.53042C11.3898 9.67108 11.199 9.75009 11.0001 9.75009H3.40813L0.315131 16.6951C0.254087 16.8324 0.235718 16.985 0.262407 17.1329C0.289096 17.2808 0.359611 17.4173 0.464808 17.5246C0.570004 17.632 0.705028 17.7052 0.85237 17.7349C0.999712 17.7646 1.15257 17.7493 1.29113 17.6911L20.2911 9.69109C20.427 9.63375 20.543 9.53762 20.6245 9.41471C20.7061 9.29181 20.7495 9.14759 20.7495 9.00009C20.7495 8.8526 20.7061 8.70838 20.6245 8.58548C20.543 8.46257 20.427 8.36644 20.2911 8.30909L1.29113 0.309093Z" fill="white"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </>
    )
}

export default Obrolan;


