"use client";

import stockProduct from "@/api/seller/kelola-produk/getStockProduct";
import AturStokBox from "@/app/components/seller/atur-stok-box";
import Popup from "@/app/components/seller/popup";
import StokBox from "@/app/components/seller/stok-box";
import Header from "@/app/layouts/header";
import LayoutUtama from "@/app/layouts/layout-utama";
import { useRouter } from "next/navigation";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";

interface Product {
  brand: string;
  created_at: string;
  description: string;
  gaya: string;
  id: number;
  informasi_penting: string;
  jenis_barang: string;
  keamanan_produk: string;
  merchants_id: number;
  name: string;
  panduan_ukuran_img: string | null;
  publish: boolean;
  slug: string;
  status_products_id: string;
  updated_at: string;
  users_id: string;
  weight: string;
}

const AturStock = () => {
  const getStoredProduct = (): Product | null => {
    const data = localStorage.getItem("productData");
    return data ? JSON.parse(data) : null;
  };

  const [product, setProduct] = useState<Product | null>(null);
  const [stock, setStock] = useState(null);

  useEffect(() => {
    const storedProduct = getStoredProduct();
    if (storedProduct) {
      setProduct(storedProduct);
    }
  }, []);

  console.log("data yang lempar = ", product);

  useEffect(() => {
    async function fecthData() {
      const response = await stockProduct({ productId: product?.id });

      if (response.data != null) {
        console.log("ada");
        console.log(response);
      } else {
        console.log("nggak ada data");
      }
    }

    fecthData();
  }, [product]);

  return (
    <LayoutUtama>
      <Header title="Atur Stok" children={undefined} />
      <div className="container mx-auto px-4 pt-24 pb-8 font-nunito">
        <div className="grid grid-cols-3 gap-3">
          <StokBox itemName="Stok 1"></StokBox>
          <AturStokBox itemName="Tambah Baru"></AturStokBox>
        </div>
      </div>
    </LayoutUtama>
  );
};

export default AturStock;
