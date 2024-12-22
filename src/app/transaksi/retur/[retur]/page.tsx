"use client"
import Link from "next/link";
import Header from "@/app/layouts/header";
import React, { useState, useEffect } from 'react';
import IconWarna from "@/app/components/icon/warna";
import { useParams, useSearchParams } from "next/navigation";
import FileUploadPengembalian from "@/app/components/modul-ulasan/file-upload-pengembalian";
import IconCheckedGradation from "@/app/components/icon/checked-gradation";
import IconTruck from "@/app/components/icon/truck";
import IconLocations from "@/app/components/icon/location";


const Retur = () => {
    const [selectedOption, setSelectedOption] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [isResi, setISResi] = useState(false);
    const [agreed, setAgreed] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);
    const [uploadedFiles, setUploadedFiles] = useState<(File | null)[]>([]);
    const [ada, setAda] = useState<boolean>(false);
    const [tinggiSyaratDiscount, setTinggiSyaratDiscount] =
    useState<string>("h-0 opacity-0");

    const [tinggiPengajuanDikirim, setTinggiPengajuanDikirim] =
    useState<string>("h-0 opacity-0");

    function konfirmasiSnK() {
        setAgreed(prevAgreed => !prevAgreed); // Toggle the agreed state
    }

    const searchParams = useSearchParams();
    const q = searchParams.get('q'); 

    const handleFilesChange = (files: (File | null)[]) => {
        setUploadedFiles(files);
    };

    function handleCloseSyaratDiscount() {
        setAda(false);
        setTinggiSyaratDiscount("h-0 opacity-0");
    }

    function handleDiscount(e: any) {
        e.preventDefault();
        setTinggiSyaratDiscount("h-[440px] opacity-100");
        setAda(true);
      }
    
    function handlePengajuanDikirim(e: any){
        e.preventDefault();
        setTinggiSyaratDiscount("h-0 opacity-0");
        setTinggiPengajuanDikirim("h-[440px] opacity-100");
        setAda(true);
    }

    function handleClosePengajuanDikirim() {
        setAda(false);
        setTinggiPengajuanDikirim("h-0 opacity-0");
    }

    const options = ["JNT", "JNE", "SiCepat", "POS Indonesia"];
    const img = ["jnt.png", "jne.png", "sicepat.png", "pos.png"]; 

    const handleSelect = (option: React.SetStateAction<string>) => {
        setSelectedOption(option);
        setIsOpen(false);
        setIsDisabled(false);
    };

    function handleResi(){
        setISResi(true)
    }

    const [inputValue, setInputValue] = useState('');

    const handleChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setInputValue(event.target.value); // Update state with the input's current value
    };

    let { retur } = useParams();

    if (Array.isArray(retur)) {
        retur = retur[0]; // If `toko` is an array, use the first element
      }
    
    return (
      <>
        <Header title="Retur Barang" children={undefined} />
        {ada ? ( <div className="z-10 h-[200vh] top-0 left-0 right-0 bottom-0 absolute bg-black opacity-50"></div>) : null}
        <div className="px-4 font-nunito absolute py-20 mb-20 items-center w-[400px] left-1/2 -translate-x-1/2">
            
            {q === "proses" ? (
                <>
                <div className="flex justify-center items-center py-10">
                <IconCheckedGradation></IconCheckedGradation>
                </div>

                <div className="justify-center flex-col items-center text-center mb-6">
                    <h2 className="!font-nunito font-semibold text-xl">Proses Retur Kamu Hampir Selesai</h2>
                    <p className="!font-nunito font-light text-xs pt-3 leading-tight">Pesanan mu telah diantar oleh penjual, harap menunggu sambil memantau pelacakan paket</p>
                </div>    
                </>
            ) : ('')}

            {q === "selesai" ? (
                <>
                <div className="flex justify-center items-center py-10">
                <IconCheckedGradation></IconCheckedGradation>
                </div>

                <div className="justify-center flex-col items-center text-center mb-6">
                    <h2 className="!font-nunito font-semibold text-xl">Pengembalian Sukses</h2>
                    <p className="!font-nunito font-light text-xs pt-3 leading-tight">Pengembalian dengan retur telah berhasil</p>
                </div>

                <div className="relative items-center pt-3 text-sm transition-all duration-200 rounded-md cursor-pointer text-black-80 border-white-30 w-full max-w-[444px] bg-gray-100 mt-3">
                {/* --- Header toko ----- */}
                <div className="flex items-center justify-between h-fit">
                    <div className="flex items-center space-x-2 pl-4">
                        <p className="font-light text-sm text-black">Order ID: 1270511324</p>
                    </div>
                    <div className="pr-4">
                        
                    </div>
                </div>

                {/* --- Body toko ----- */}
                <div className="mt-2 p-3 border-t-2 flex justify-start gap-3">
                    <div className="w-2/6"> 
                        <img className="object-cover w-full h-[100px] rounded-md" src="/image/image.png"></img>
                    </div>
                    <div className="w-4/6"> 
                        <h3 className="font-semibold mb-1 text-sm">Sepatu Anak Sekolah SMP Semua Ukuran | Murah dan Berkualitas.</h3>
                        
                        <div className="flex flex-wrap items-center mb-1">
                            <IconTruck></IconTruck>
                            <p className="ml-3 mr-2 text-xs font-semibold">Standar :</p>
                            <p className="text-xs font-light">(Semarang, Gresik)</p>
                        </div>

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
                </div>

                <div className="flex flex-col text-left h-fit mb-3 gap-2">
                <div className="flex items-center space-x-2 px-2 pt-4">
                    <p className="font-semibold text-md text-black">Dikembalikan Ke-</p>
                </div>
                <div className="relative items-center p-4 text-sm transition-all duration-200 rounded-lg cursor-pointer text-black-80 border-white-30 w-full bg-white border-2 border-gray-200 mt-3">
                    <div className="flex flex-row justify-start">
                        <div className="align-top mt-2">
                            <IconLocations></IconLocations>
                        </div>
                        <div className="items-center pl-4">
                            <p className="text-base text-black-80 font-bold">Rumah Saya</p>
                            <p>Rue. Federico Garcia Lorca</p>
                            <p>Saint Martin d-Heres</p>
                            <p>Grenoble</p>
                            <p>38100</p>
                        </div>
                    </div>
                </div>
                <Link href={`/transaksi/riwayat?q=pengembalian`}>
                    <button type="button" className="mt-[10px] w-full h-[42px] rounded-md bg-[#51D7B1] flex justify-center items-center text-[#fff]">
                        Selesai
                    </button>
                </Link>
            </div>
                </>
            ) : ('')}
            
            
            {q === "proses" ? ( 
            <>
            <div className="relative items-center pt-3 text-sm transition-all duration-200 rounded-md cursor-pointer text-black-80 border-white-30 w-full max-w-[444px] bg-gray-100 mt-3">
                {/* --- Header toko ----- */}
                <div className="flex items-center justify-between h-fit">
                    <div className="flex items-center space-x-2 pl-4">
                        <p className="font-light text-sm text-black">Order ID: 1270511324</p>
                    </div>
                    <div className="pr-4">
                        
                    </div>
                </div>

                {/* --- Body toko ----- */}
                <div className="mt-2 p-3 border-t-2 flex justify-start gap-3">
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
                            <IconTruck></IconTruck>
                            <p className="ml-3 mr-2 text-xs font-semibold">Standar :</p>
                            <p className="text-xs font-light">(Semarang, Gresik)</p>
                        </div>

                        <div className="flex flex-wrap items-center mb-1">
                            <p className="text-base text-black-80 font-bold">Rp 580.000</p>
                        </div>
                    </div>
                    
                </div>
            </div>

            <Link href={`/lack-pesanan`}>
            <div className="mt-5 border rounded-lg px-4 justify-between">
                <div className="p-1 text-blue-600 font-nunito text-[10px] text-center font-medium mt-2">
                    Barangmu sedang diantar ke alamat kamu
                </div>
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
            </div>
            </Link>

            <div className="flex flex-row gap-2 justify-center mt-5">
                <svg
                width="18"
                height="20"
                viewBox="0 0 18 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-gray-500"
                >
                <path
                    d="M3.9998 4V1C3.9998 0.44772 4.44752 0 4.9998 0H16.9998C17.5521 0 17.9998 0.44772 17.9998 1V15C17.9998 15.5523 17.5521 16 16.9998 16H13.9998V18.9991C13.9998 19.5519 13.5499 20 12.993 20H1.00666C0.45059 20 0 19.5554 0 18.9991L0.00259995 5.00087C0.00269995 4.44811 0.45264 4 1.00942 4H3.9998ZM2.00242 6L2.00019 18H11.9998V6H2.00242ZM5.9998 4H13.9998V14H15.9998V2H5.9998V4ZM4 9H10V11H4V9ZM4 13H10V15H4V13Z"
                    fill="#AFAFAF"
                />
                </svg>
                <p className="font-semibold">Nomor Resi : 10921921029023 (JNT)</p>
            </div>

            <div className="flex flex-col text-left h-fit mb-3 gap-2 mt-5 border-t-2 border-gray-300">
                <div className="flex items-center space-x-2 px-2 pt-4">
                    <p className="font-semibold text-md text-black">Foto Bukti Pengiriman</p>
                </div>
                <div className="w-full flex flex-row">
                   <img src="/image/resi.png" className="w-full h-[300px] object-cover rounded-md"></img>
                </div>
                <Link href={`/transaksi/retur/${retur}?q=selesai`}>
                    <button type="button" className="mt-[10px] w-full h-[42px] rounded-md bg-[#51D7B1] flex justify-center items-center text-[#fff]">
                        Pesanan Diterima
                    </button>
                </Link>
            </div>
            </>
            ) : ('')}

            {/* Bukti kerusakan */}
            {q === "pending" ? (
                <>
                <div className="relative items-center pt-3 text-sm transition-all duration-200 rounded-md cursor-pointer text-black-80 border-white-30 w-full max-w-[444px] bg-gray-100 mt-3">
                    {/* --- Header toko ----- */}
                    <div className="flex items-center justify-between h-fit">
                        <div className="flex items-center space-x-2 pl-4">
                            <p className="font-light text-sm text-black">Order ID: 1270511324</p>
                        </div>
                        <div className="pr-4">
                            
                        </div>
                    </div>

                    {/* --- Body toko ----- */}
                    <div className="mt-2 p-3 border-t-2 flex justify-start gap-3">
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
                                <IconTruck></IconTruck>
                                <p className="ml-3 mr-2 text-xs font-semibold">Standar :</p>
                                <p className="text-xs font-light">(Semarang, Gresik)</p>
                            </div>

                            <div className="flex flex-wrap items-center mb-1">
                                <p className="text-base text-black-80 font-bold">Rp 580.000</p>
                            </div>
                        </div>
                        
                    </div>
                </div>
            
                <Link href={`/lack-pesanan`}>
                <div className="mt-5 border rounded-lg px-4 justify-between">
                    <div className="p-1 text-blue-600 font-nunito text-[10px] text-center font-medium mt-2">
                        Barangmu sedang diantar ke alamat penjual
                    </div>
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
                </div>
                </Link>

                <div className="flex flex-row gap-2 justify-center mt-5">
                    <svg
                    width="18"
                    height="20"
                    viewBox="0 0 18 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-gray-500"
                    >
                    <path
                        d="M3.9998 4V1C3.9998 0.44772 4.44752 0 4.9998 0H16.9998C17.5521 0 17.9998 0.44772 17.9998 1V15C17.9998 15.5523 17.5521 16 16.9998 16H13.9998V18.9991C13.9998 19.5519 13.5499 20 12.993 20H1.00666C0.45059 20 0 19.5554 0 18.9991L0.00259995 5.00087C0.00269995 4.44811 0.45264 4 1.00942 4H3.9998ZM2.00242 6L2.00019 18H11.9998V6H2.00242ZM5.9998 4H13.9998V14H15.9998V2H5.9998V4ZM4 9H10V11H4V9ZM4 13H10V15H4V13Z"
                        fill="#AFAFAF"
                    />
                    </svg>
                    <p className="font-semibold">Nomor Resi : 10921921029023 (JNT)</p>
                </div>
            </>
            ) : ('')}
            
        </div>
      </>
    );
  };
  
  export default Retur;


