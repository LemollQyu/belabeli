"use client"
import React, { useEffect, useState } from "react";
import LayoutUtama from "@/app/layouts/layout-utama";
import Header from "@/app/layouts/header";
import getTokoYangDiikuti from "@/api/settings/getTokoYangDiikuti";
import postTokoYangDiikuti from "@/api/settings/postTokoYangDiikuti";

interface Store {
  id:string;
  usersId:string;
  merchantId:string;
  name: string;
  logo: string;
  isSuperSeller: boolean;
  isUserFollow:boolean;
}

const TokoDiikuti = () => {   

  const [stores, setStores] = useState<Store[]>([]); // Use an empty array as the initial state

  const toggleFollowStatus = async (id:string) => {
    try {
      console.log(id)
      const response = await postTokoYangDiikuti({ merchantId: id })
      // Handle response
        const result = response.data;
        console.log('Follow status updated:', result);
        window.location.reload()
    } catch (error) {
      // Handle errors (network, server issues, etc.)
      console.error('Error toggling follow status:', error);
    } finally {
      // Clean up or stop loading
      console.log('Follow toggle action completed.');
    }
  };
  
  
  useEffect(() => {
    async function fetchFollowedStores() {
      try {
        const response = await getTokoYangDiikuti(); // Assume this fetches API response
        console.log("Fetched followed stores data", response.data);
        const initialStores: Store[] = response.data.map((item: any) => ({
          id: item.id,
          usersId: item.users_id,
          merchantId: item.uuid,
          name: item.name,
          logo: item.logo,
          isSuperSeller: item.super_seller,
          isUserFollow: item.is_user_follow,
        }));
  
        // Set the transformed data into the state
        setStores(initialStores);
      } catch (error) {
        console.error("Failed to fetch followed stores data", error);
      }
    }
  
    fetchFollowedStores();
  }, []);
  

  return (
    <LayoutUtama>
      <Header title="Toko Yang Diikuti" children={undefined} />
      {/* Kontainer Utama */}
      <div className="container w-full max-w-[400px] mx-auto p-4 font-nunito mt-20">
        {/* Daftar Toko */}
      <div className="px-2 py-2 space-y-4">
        {stores.length ? 
        stores.map((store, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-2 bg-white rounded-md shadow-sm"
          >
            <div className="flex items-center space-x-2">
              {/* Ikon Profil Toko */}
              <img
                src={store.logo}
                alt={store.name}
                className="w-10 h-10 rounded-full bg-gray-300"
              />

              {/* Label SS untuk Super Seller */}
              {store.isSuperSeller && (
                <div className="w-7 h-4 flex items-center justify-center bg-teal-500 text-white text-[10px] font-bold rounded-md">
                  SS
                </div>
              )}

              {/* Informasi Toko */}
              <div>
                <div className="text-sm font-semibold">{store.name}</div>
              </div>
            </div>

            {/* Tombol Ikuti / Diikuti */}
            <button
              onClick={() => toggleFollowStatus(store.id)}
              className={`px-4 py-1 text-xs font-semibold rounded-md ${
                store.isUserFollow
                  ? "text-teal-500 border border-teal-500"
                  : "text-gray-500 border border-gray-500"
              }`}
            >
              {store.isUserFollow ? 'Diikuti' : "Ikuti"}
            </button>
          </div>
        ))
        : 
        
        <span className="text-black items-center justify-center w-full flex mt-20">Belum ada toko yang diikuti</span>
        }
        </div>
      </div>
    </LayoutUtama>
  );
};

export default TokoDiikuti;
