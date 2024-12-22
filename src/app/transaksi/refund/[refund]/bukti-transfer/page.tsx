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
import IconPendingGradation from "@/app/components/icon/pending-graduation";
import IconUser from "@/app/components/icon/user";


const BuktiTransfer = () => {
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

    let { refund } = useParams();

    if (Array.isArray(refund)) {
        refund = refund[0]; // If `toko` is an array, use the first element
      }
    
    return (
      <>
        <Header title="Bukti Transfer" children={undefined} />
        {ada ? ( <div className="z-10 h-[200vh] top-0 left-0 right-0 bottom-0 absolute bg-black opacity-50"></div>) : null}
        <div className="px-4 font-nunito absolute py-20 mb-20 items-center w-[400px] left-1/2 -translate-x-1/2">
            <div className="w-full h-full">
                <img src="/image/bukti/image.jpg"></img>
            </div>
            <Link href={`/transaksi/riwayat?q=pengembalian`}>
                <button type="button" className="mt-[10px] w-full h-[42px] rounded-md bg-[#51D7B1] flex justify-center items-center text-[#fff]">
                    Selesai
                </button>
            </Link>
        </div>
      </>
    );
  };
  
export default BuktiTransfer;