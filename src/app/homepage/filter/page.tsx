"use client"
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import CategoryBar from "@/app/components/pencarian/category-bar";
import Header from '@/app/layouts/header';
import Link from 'next/link';
import getCategory from '@/api/getCategory';
import axios from 'axios';
import CategoryBarProvince from '@/app/components/pencarian/category-province';
import CategoryPrice from '@/app/components/pencarian/category-price';
interface Category {
    id: number;
    name: string;
}
interface Provinsi {
    text: string;
}
const Filter = () => {
    const [kategori, setKategori] = useState<Category[]>([]);
    const [provinsi, setDataProvince] = useState<Provinsi[]>([]);
    const [search, setSearchParam] = useState('');

    const router = useRouter();

    useEffect(() => {
        const fetchKategori = async () => {
            try {
                const dataCategory = await getCategory();
                console.log(dataCategory);
                setKategori(dataCategory.data); // Pass the full objects (id and name)
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        fetchKategori();
    }, []);

    useEffect(() => {
        async function fetchData() {
          const response = await axios.get(
            "https://alamat.thecloudalert.com/api/provinsi/get/"
          );
          setDataProvince(response.data.result);
        }
    
        fetchData();
      }, []);
    

    const handleBack = (e: React.MouseEvent) => {
        e.preventDefault();
        router.back();
    };

    function goToFilter() {
        localStorage.removeItem("minMaxPrice");
        localStorage.removeItem("category");
        localStorage.removeItem("province");
        localStorage.removeItem('selectedLocations');
        window.location.replace('/homepage/filter');
    }

    useEffect(() => {
        // Run the function every 3 seconds
        const interval = setInterval(() => {
            getSearchParam();
        }, 500);
    
        // Cleanup the interval on component unmount
        return () => clearInterval(interval);
    }, []);
    
    function getSearchParam() {
        const category = localStorage.getItem("category");
        const province = localStorage.getItem("province");
        const minMaxPrice = localStorage.getItem("minMaxPrice");
    
        const params = [];
    
        if (category) params.push(category);
        if (province) params.push(province);
        if (minMaxPrice) params.push(minMaxPrice);
    
        const searchParam = params.join("&");
        setSearchParam(searchParam);
    }

    return (
        <>
            <Header title="Filter Pencarian" children={undefined} />
            <div className="flex flex-wrap">
                <div className="scrollbar-hide px-4 font-nunito absolute p-6 top-20 bottom-10 bg-white items-center w-[400px] left-1/2 -translate-x-1/2 overflow-y-scroll">
                    <div className="pt-100">
                        <CategoryBar title="Kategori" array={kategori} />
                        <CategoryBarProvince title="Lokasi" array={provinsi}></CategoryBarProvince>
                        <CategoryPrice></CategoryPrice>
                    </div>
                    <div className="flex flex-wrap justify-evenly mt-5">
                        <button type="button" onClick={goToFilter} className="px-11 py-2 bg-[#FDFDFD] text-[#1C785E] border-[1px] border-[#25A07D] text-xs rounded-md">Atur Ulang</button>
                        <Link href={`/homepage/pencarian/search?${search}`}>
                            <button className="px-14 py-2 bg-[#25A07D] text-[#FDFDFD] text-xs rounded-md">Pakai</button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Filter;
function setLoadingProvince(arg0: boolean) {
    throw new Error('Function not implemented.');
}

function setDataProvince(result: any) {
    throw new Error('Function not implemented.');
}

