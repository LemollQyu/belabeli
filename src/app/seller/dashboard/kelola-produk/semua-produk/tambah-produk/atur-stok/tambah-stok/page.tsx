"use client";
import React, { useEffect, useRef, useState } from "react";
import Header from "@/app/layouts/header";
import LayoutUtama from "@/app/layouts/layout-utama";
import { useRouter } from "next/navigation";
import { Check, CheckCircle, Plus } from "react-bootstrap-icons";
import Popup from "@/app/components/seller/popup";
import TambahRekeningComponent from "@/app/seller/dashboard/setup-toko/rekening-bank/tambah-rekening/page";
import TambahStokChildren from "@/app/components/seller/tambah-stok";
import PopupDoubleOptions from "@/app/components/seller/popup-doubleoptions";

import variantProduct from "@/api/seller/kelola-produk/getVariantProduct";

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

interface VariationItem {
  id: number;
  name: string;
  show_image: number;
  variation_item: {
    id: number;
    name: string;
  }[];
}

const TambahStok = ({ numFiles }: { numFiles: number }) => {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showUploadSection, setShowUploadSection] = useState(false); // Mengatur apakah tampilan berubah
  const [productPhotoFile, setProductPhotoFile] = useState<File | null>(null);
  const productPhotoInputRef = useRef<HTMLInputElement | null>(null);
  const [limitUpload, setLimitUpload] = useState<number>(5);
  const [num1, setNum1] = useState(1);
  const [num2, setNum2] = useState(1);

  const [dataVarian, setDataVarian] = useState<VariationItem>(null);

  const [appeared, setAppeared] = useState(false);
  const [items, setItems] = useState([]);

  const [bgColorSecond, setBgColorSecond] = useState(true);
  const [appearedSecond, setAppearedSecond] = useState(true);
  const [itemsSecond, setItemsSecond] = useState([]);

  const getStoredProduct = (): Product | null => {
    const data = localStorage.getItem("productData");
    return data ? JSON.parse(data) : null;
  };

  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const storedProduct = getStoredProduct();
    if (storedProduct) {
      setProduct(storedProduct);
    }
  }, []);

  console.log("data yang lempar = ", product);

  const handleClick = () => {
    setAppeared(!appeared);
  };

  const handleSimpan = () => {
    // Menyiapkan data untuk disimpan
    const data = {
      variation_items_id: [892, 893], // Update sesuai ID variasi aktual
      harga: formData.harga,
      harga_nego: formData.harga_nego,
      stock_produk: formData.stok,
    };

    console.log("Data yang akan disimpan:", data);

    // Tambahkan logika pengiriman data ke backend jika diperlukan
    // Contoh: axios.post('/api/save', data)
  };

  // Fungsi untuk menangani perubahan file
  const handleProductPhotoChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setProductPhotoFile(file);
    }
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleButtonClick = () => {
    setLimitUpload((prev) => (prev > 0 ? prev - 1 : prev));
  };
  const [showPopup, setShowPopup] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isPopupTambahEtalaseVisible, setIsPopupTambahEtalaseVisible] =
    useState(false);
  const [formData, setFormData] = useState({
    kategori: "",
    kategori2: "",
    harga: 0,
    harga_nego: 0,
    stok: 0,
  });

  const handleSelectOption = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const popupOptions = {
    warna: [
      "Merah",
      "Kuning",
      "Hijau",
      "Biru",
      "Hitam",
      "Navy",
      "Beige",
      "Sand",
      "Tosca",
      "Army",
    ],
    ukuran: ["XS", "S", "M", "L", "XL", "XXL"],
  };

  const [popup, setPopup] = useState({
    isOpen: false,
    type: "",
  });

  const [popup2, setPopup2] = useState({
    isOpen: false,
    type: "",
  });

  const handleOpenPopup = () => setShowPopup(true);
  const handleClosePopup = () => {
    setShowPopup(false);
    setIsPopupVisible(false);
  };
  const handlePopup = () => {
    setIsPopupVisible((prev) => !prev);
  };

  const handleTambahEtalasePopup = () => {
    setIsPopupTambahEtalaseVisible(true);
    setShowPopup(false);
    setIsPopupVisible(false);
  };

  const handleClosePopupTambahEtalase = () => {
    setIsPopupTambahEtalaseVisible(false);
  };

  useEffect(() => {
    async function fecthData() {
      const response = await variantProduct({ productId: product?.id });

      if (response.data != null) {
        setDataVarian(response.data?.data);
      } else {
        console.log("data tidak ada | null");
      }
    }

    fecthData();
  }, [product]);

  console.log("data variasi = ", dataVarian);

  return (
    <LayoutUtama>
      <Header title="Stok Produk" children={undefined} />
      <div className="container mx-auto p-4 font-nunito pt-[74px] flex flex-col min-h-screen">
        <div className="bg-[#51D7B1] text-white text-sm p-4 font-semibold flex items-center gap-2">
          Tambah Stok Produk
        </div>
        <div className="p-4 bg-white">
          <div className=" bg-[#F7F7F9] rounded-lg p-3">
            <div>
              {/* Satu kotak div */}
              <div className="flex flex-row justify-between items-center px-2">
                <label
                  htmlFor="namaProduk"
                  className="text-xs font-medium text-black flex px-1 w-1/2"
                >
                  Variasi Item
                </label>
                <div className="flex w-full">
                  <button
                    type="button"
                    onClick={() => setPopup({ isOpen: true, type: "kategori" })}
                    className="w-full border border-gray-300 bg-white w-18 rounded-md p-1.5 text-left text-xs justify-between flex items-center focus:outline-none"
                  >
                    {formData.kategori || "Pilih Kategori"}
                    {/* SVG Icon */}
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-2"
                    >
                      <path
                        d="M8.00042 8.78077L11.3003 5.48096L12.2431 6.42376L8.00042 10.6664L3.75781 6.42376L4.70062 5.48096L8.00042 8.78077Z"
                        fill="black"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div>
                {appeared ? (
                  <>
                    {/* Border */}
                    <div className="mx-auto my-2 border border-[#A9A9A9] w-full"></div>
                    {/* Crossed closed box */}
                    <div className="flex text-right justify-end w-full items-end p-2">
                      <svg
                        onClick={handleClick}
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        className="cursor-pointer"
                      >
                        <path
                          d="M6.99976 5.46871L12.362 0.106445L13.8941 1.63851L8.53181 7.00076L13.8941 12.3629L12.362 13.895L6.99976 8.53281L1.63754 13.895L0.105469 12.3629L5.46771 7.00076L0.105469 1.63851L1.63754 0.106445L6.99976 5.46871Z"
                          fill="black"
                        />
                      </svg>
                    </div>
                    {/* Satu kotak div */}
                    <div className="flex flex-row justify-between items-center px-2">
                      <label
                        htmlFor="namaProduk"
                        className="text-xs font-medium text-black flex px-1 w-1/2"
                      >
                        Variasi Item
                      </label>
                      <div className="flex w-full">
                        <button
                          type="button"
                          onClick={() =>
                            setPopup2({ isOpen: true, type: "kategori2" })
                          }
                          className="w-full border border-gray-300 bg-white w-18 rounded-md p-1.5 text-left text-xs justify-between flex items-center focus:outline-none"
                        >
                          {formData.kategori2 || "Pilih Kategori"}
                          {/* SVG Icon */}
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="mr-2"
                          >
                            <path
                              d="M8.00042 8.78077L11.3003 5.48096L12.2431 6.42376L8.00042 10.6664L3.75781 6.42376L4.70062 5.48096L8.00042 8.78077Z"
                              fill="black"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  ""
                )}
              </div>
              {!appeared ? (
                <div className="mt-2 p-2">
                  <button
                    onClick={handleClick}
                    className="border border-black w-full flex flex-wrap justify-center bg-white hover:bg-grey-100 text-black font-semibold p-1 rounded-md focus:ring-2 focus:ring-gray-300 focus:outline-none disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    <Plus size={20}></Plus>
                  </button>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>

          <div className="p-2">
            <h3 className="font-semibold px-3 my-2"> Harga Produk </h3>
            <div className="flex flex-row justify-between items-center p-2">
              <label
                htmlFor="namaProduk"
                className="text-xs font-medium text-black flex px-1 w-1/2"
              >
                Harga
              </label>
              <div className="flex w-full">
                <input
                  type="number"
                  min={0}
                  placeholder="Masukkan nominal"
                  value={formData.harga || ""} // Pastikan state awal terisi default (misalnya 0 atau "")
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      harga: parseInt(e.target.value, 10) || 0,
                    }))
                  }
                  className="w-full border border-gray-300 bg-white rounded-md p-1.5 text-xs focus:ring-1 focus:ring-green-300 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex flex-row justify-between items-center p-2">
              <label
                htmlFor="namaProduk"
                className="text-xs font-medium text-black flex px-1 w-1/2"
              >
                Harga Nego
              </label>
              <div className="flex w-full">
                <input
                  type="number"
                  min={0}
                  placeholder="Masukkan nominal"
                  value={formData.harga_nego || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      harga_nego: parseInt(e.target.value, 10) || 0,
                    }))
                  }
                  className="w-full border border-gray-300 bg-white rounded-md p-1.5 text-xs focus:ring-1 focus:ring-green-300 focus:outline-none"
                />
              </div>
            </div>

            <h3 className="font-semibold px-3 my-2"> Stok Produk </h3>

            <div className="flex flex-row justify-between items-center p-2">
              <div className="flex w-full">
                <input
                  type="number"
                  min={0}
                  placeholder="Stok"
                  value={formData.stok || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      stok: parseInt(e.target.value, 10) || 0,
                    }))
                  }
                  className="w-full border border-gray-300 bg-white rounded-md p-3 text-xs focus:ring-1 focus:ring-green-300 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-auto p-2">
          <button
            onClick={
              () => {
                handleSimpan();
              }
              // router.push(
              //   "/seller/dashboard/kelola-produk/semua-produk/tambah-produk"
              // )
            }
            className={`w-full max-w-[400px] mx-auto mt-6 py-3 text-white rounded-lg bg-[#51d7b1] hover:bg-emerald-600`}
          >
            Simpan
          </button>
        </div>
      </div>

      {/* Popup */}
      <PopupDoubleOptions
        isOpen={popup.isOpen}
        onClose={() => setPopup({ isOpen: false, type: "" })}
        title={"Kategori"}
        options={popupOptions["warna" as keyof typeof popupOptions] || []}
        onSelect={(value) => handleSelectOption("kategori", value)}
        subtitle={"Warna"}
        subtitle2={"Ukuran"}
        options2={popupOptions["ukuran" as keyof typeof popupOptions] || []}
      />

      <PopupDoubleOptions
        isOpen={popup2.isOpen}
        onClose={() => setPopup2({ isOpen: false, type: "" })}
        title={"Kategori"}
        options={popupOptions["warna" as keyof typeof popupOptions] || []}
        onSelect={(value) => handleSelectOption("kategori2", value)}
        subtitle={"Warna"}
        subtitle2={"Ukuran"}
        options2={popupOptions["ukuran" as keyof typeof popupOptions] || []}
      />
    </LayoutUtama>
  );
};

export default TambahStok;
