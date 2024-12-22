"use client"
import Link from "next/link";
import Header from "@/app/layouts/header";
import React, { useState, useEffect } from 'react';
import IconToko from "@/app/components/icon/toko";
import IconSuperSeller from "@/app/components/icon/super-seller";
import IconLocations from "@/app/components/icon/location";
import IconHistory from "@/app/components/icon/history";
import IconWarna from "@/app/components/icon/warna";
import { useParams, useSearchParams } from "next/navigation";
import IconBankCard from "@/app/components/icon/bank-card";
import IconCalender from "@/app/components/icon/calender";
import FileUploadPengembalian from "@/app/components/modul-ulasan/file-upload-pengembalian";
import { Inter } from "next/font/google";
import Image from "next/image";
import { ExclamationCircle } from 'react-bootstrap-icons'
import { CheckCircleFill } from 'react-bootstrap-icons'
import IconCheckedGradation from "@/app/components/icon/checked-gradation";
import IconTruck from "@/app/components/icon/truck";


const DetailPesanan = () => {
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
    const p = searchParams.get('p'); 

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

    let { komplain } = useParams();

    if (Array.isArray(komplain)) {
        komplain = komplain[0]; // If `toko` is an array, use the first element
    }
    
    return (
      <>
        <Header title="Komplain Barang" children={undefined} />
        {ada ? ( <div className="z-10 h-[200vh] top-0 left-0 right-0 bottom-0 absolute bg-black opacity-50"></div>) : null}
        <div className="px-4 font-nunito absolute py-20 mb-20 items-center w-[400px] left-1/2 -translate-x-1/2">
            
            {q === "selesai" ? (
                <>
                <div className="flex justify-center items-center py-10">
                <IconCheckedGradation></IconCheckedGradation>
                </div>

                <div className="justify-center flex-col items-center text-center mb-6">
                    <h2 className="!font-nunito font-semibold text-xl">Pengajuan Disetujui</h2>
                    <p className="!font-nunito font-light text-xs pt-3 leading-tight">Komplain barangmu disetujui oleh seller, silahkan lengkapi data berikut ini</p>
                </div>
                </>
            ) : ('')}
            
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

            {q === "selesai" ? ( 
            <>
            <div className="relative items-center p-4 text-sm transition-all duration-200 rounded-lg cursor-pointer text-black-80 border-white-30 w-full bg-white border-2 border-gray-200 mt-3">
                <div className="flex flex-row justify-start">
                    <div className="align-top mt-2">
                        <IconLocations></IconLocations>
                    </div>
                    <div className="items-center pl-4">
                        <p className="text-base text-black-80 font-bold">Alamat Toko Anugerah</p>
                        <p>Rue. Maison de La Culture</p>
                        <p>Saint Martin d-Heres</p>
                        <p>Grenoble</p>
                        <p>38100</p>
                    </div>
                </div>
                <div className="flex flex-row justify-start items-center mt-4">
                    <div className="align-top">
                        <IconToko></IconToko>
                    </div>
                    <div className="pl-2">
                        <p className="text-base text-black-80 font-bold">+62871-0988-9777</p>
                    </div>
                </div>
            </div>

            <div className={`${isResi ? 'hidden' : ''} flex flex-col text-left h-fit mb-3 gap-2`}>
                <div className="flex items-center space-x-2 px-2 pt-4">
                    <p className="font-semibold text-md text-black">Pilih Provider Pengiriman</p>
                </div>
            </div>

            <div className={`${isResi ? 'hidden' : ''} relative w-full`}>
                <div
                    className="border border-gray-400 p-4 rounded-lg flex justify-between items-center cursor-pointer"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <span className={`${selectedOption ? 'text-gray-900' : 'text-gray-500'}`}>
                    {selectedOption || "Pilih Provider"}
                    </span>
                    <span className="text-gray-500">
                    {isOpen ? '▲' : '▼'}
                    </span>
                </div>
                {isOpen && (
                    <div className="absolute top-full left-0 w-full border border-gray-300 rounded bg-white mt-1 z-10">
                    {options.map((option, index) => (
                        <div className="flex flex-row items-center justify-between p-4" onClick={() => handleSelect(option)}>
                            <div
                                key={option}
                                className="cursor-pointer hover:bg-gray-100">
                                {option}
                            </div>
                            <div className=" bg-white w-fit h-fit rounded-md">
                                <img src={`/image/provider/${img[index]}`} alt={option} className="w-10" />
                            </div>
                        </div>
                    ))}
                    </div>
                )}
            </div>

            <div className={`${isResi ? 'hidden' : ''} flex flex-col text-left h-fit mb-3 gap-2`}>
                <div className="flex items-center space-x-2 px-2 pt-4">
                    <p className="font-semibold text-md text-black">Input Nomor Resi</p>
                </div>
            </div>

            <div className={`${isResi ? 'hidden' : ''} flex flex-col items-left p-4 mb-3 bg-gray-100 rounded-lg shadow-sm w-full max-w-md`}>
                <label className="text-xs text-gray-500 mr-4 mb-2">Nomor Resi</label>
                <div className="flex flex-row items-center justify-between w-full">
                    <input
                        value={inputValue}
                        onChange={handleChange}
                        type="text"
                        className="bg-transparent text-black font-semibold outline-none"
                    />
                    <button onClick={handleResi} className="bg-white rounded-md w-fit h-fit text-xs font-semibold border-2 border-gray-300 px-2 py-1">Masukkan</button>
                </div>
            </div>
            
            <div className={` ${isResi ? '' : 'hidden'} mt-3 flex flex-col items-left p-4 bg-gray-100 rounded-lg shadow-sm w-full max-w-md`}>
                <label className="text-sm text-gray-500 mr-4 mb-2">Nomor Resi</label>
                <div className="flex flex-row items-center justify-between w-full">
                    <div>
                        <input
                            type="text"
                            value={inputValue}
                            readOnly
                            className="flex-grow bg-transparent text-black font-semibold outline-none"
                        />
                    </div>
                    <div className=" bg-white w-fit h-fit rounded-md">
                        <img src="/image/provider/jnt.png" alt="J&T Express" className="w-10" />
                    </div>
                </div>
            </div>

            <div className="flex flex-col text-left h-fit mb-3 gap-2">
                <div className="flex items-center space-x-2 px-2 pt-4">
                    <p className="font-semibold text-md text-black">Foto Bukti Pengiriman</p>
                </div>
                <div className="w-full flex flex-row">
                    <FileUploadPengembalian maxFiles={1}  w={'[360px]'} h={'[300px]'} onFilesChange={handleFilesChange} />
                </div>
                {p === "retur" ? (  
                <Link href={`/transaksi/retur/${komplain}?q=pending`}>
                    <button type="button" className="mt-[10px] w-full h-[42px] rounded-md bg-[#51D7B1] flex justify-center items-center text-[#fff]">
                        Antarkan
                    </button>
                </Link>
                ) : ('')}

                {p === "refund" ? (  
                <Link href={`/transaksi/refund/${komplain}?q=pending`}>
                    <button type="button" className="mt-[10px] w-full h-[42px] rounded-md bg-[#51D7B1] flex justify-center items-center text-[#fff]">
                        Antarkan
                    </button>
                </Link>
                ) : ('')}
            </div>
            </>
            ) : ('')}

            {/* Bukti kerusakan */}
            {q === "pending" ? (
                <div className="relative border-x-2 border-2 border-gray-200 items-center pt-3 text-sm transition-all duration-200 rounded-md cursor-pointer text-black-80 border-white-30 w-full max-w-[444px] bg-white mt-3">
                    {/* --- Header toko ----- */}
                    <div className="flex text-left h-fit mb-3">
                        <div className="flex items-center space-x-2 pl-4">
                            <p className="font-semibold text-sm text-black">Foto Bukti Kerusakan</p>
                        </div>
                    </div>

                    {/* --- Body toko ----- */}
                    <div className="p-5 border-t-2 border-gray-300 bg-gray-100 flex justify-start">
                        <div className="w-full flex flex-row">
                            <div className="justify-between items-center grid grid-cols-2 gap-5">
                                <div className="w-[150px] h-[150px] rounded-md bg-[#D3D3D3] flex items-center justify-center">
                                    <img src="/image/image.png" className="w-full rounded-md"></img>
                                </div>

                                <div className="w-[150px] h-[150px] rounded-md bg-[#D3D3D3] flex items-center justify-center">
                                    <img src="/image/image.png" className="w-full rounded-md"></img>
                                </div>

                                <div className="w-[150px] h-[150px] rounded-md bg-[#D3D3D3] flex items-center justify-center">
                                    <img src="/image/image.png" className="w-full rounded-md"></img>
                                </div>

                                <div className="w-[150px] h-[150px] rounded-md bg-[#D3D3D3] flex items-center justify-center">
                                    <img src="/image/image.png" className="w-full rounded-md"></img>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : ('')}
            
        </div>
      </>
    );
  };
  
  export default DetailPesanan;


