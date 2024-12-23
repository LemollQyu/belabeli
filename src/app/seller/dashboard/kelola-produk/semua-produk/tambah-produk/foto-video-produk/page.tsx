"use client";
import React, { useEffect, useRef, useState } from "react";
import Header from "@/app/layouts/header";
import LayoutUtama from "@/app/layouts/layout-utama";
import { useRouter } from "next/navigation";
import informasiProduct from "@/api/seller/kelola-produk/getInformasiProduct";
import reqKirimFotoVideoProduct from "@/api/seller/kelola-produk/postFotoVideoProduct";

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

const FotoAtauVideoPage: React.FC = () => {
  const router = useRouter();
  const [selectedThumbnail, setSelectedThumbnail] = useState<File | null>(null);
  const [productPhotos, setProductPhotos] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const productPhotoInputRef = useRef<HTMLInputElement>(null);
  const [limitUpload, setLimitUpload] = useState<number>(5);

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedThumbnail(file);
    }
  };

  const handleProductPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && productPhotos.length < 5) {
      setProductPhotos((prev) => [...prev, file]);
      setLimitUpload((prev) => prev - 1);
    }
  };

  const removeProductPhoto = (index: number) => {
    setProductPhotos((prev) => prev.filter((_, i) => i !== index));
    setLimitUpload((prev) => prev + 1);
  };
  // const fileInputRef = useRef<HTMLInputElement>(null);
  // const [selectedFile, setSelectedFile] = useState<File | null>(null);
  // const [showUploadSection, setShowUploadSection] = useState(false); // Mengatur apakah tampilan berubah
  // const [productPhotoFile, setProductPhotoFile] = useState<File | null>(null);
  // const productPhotoInputRef = useRef<HTMLInputElement | null>(null);
  // const [limitUpload, setLimitUpload] = useState<number>(5);

  // // Fungsi untuk menangani perubahan file
  // const handleProductPhotoChange = (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   const file = event.target.files?.[0];
  //   if (file) {
  //     setProductPhotoFile(file);
  //   }
  // };
  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     setSelectedFile(file);
  //   }
  // };

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

  useEffect(() => {
    async function fetchData() {
      const response = await informasiProduct({ productId: product?.id });

      if (response.data !== null) {
        console.log(response);
      }
    }

    fetchData();
  }, [product]);

  const handleUploadGambar = async () => {
    // console.log("Thumbnail:", selectedThumbnail);
    // console.log("Product Photos:", productPhotos);
    // Membuat objek FormData
    const formData = new FormData();

    // Menambahkan thumbnail ke FormData
    if (selectedThumbnail) {
      formData.append("media[]", selectedThumbnail);
    }

    // Menambahkan foto produk ke FormData
    productPhotos.forEach((photo, index) => {
      formData.append(`media[${index + 1}]`, photo);
    });

    // Debugging FormData (opsional)
    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    const response = await reqKirimFotoVideoProduct({
      formData,
      productId: product?.id,
    });

    console.log(response);
    if (response.data?.code == 201) {
      router.push("/seller/dashboard/kelola-produk/semua-produk/tambah-produk");
    }
  };

  return (
    <LayoutUtama>
      <Header title="Informasi Produk" children={undefined} />
      <div className="container mx-auto px-4 pt-24 pb-8 font-nunito">
        {/* Header Informasi */}
        <div className="bg-green-100 text-green-600 text-xs p-3 rounded-md mb-6 flex items-center gap-2">
          <svg
            width="24"
            height="24"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.00065 1.16683C10.2223 1.16683 12.834 3.77853 12.834 7.00016C12.834 10.2218 10.2223 12.8335 7.00065 12.8335C3.77902 12.8335 1.16732 10.2218 1.16732 7.00016C1.16732 3.77853 3.77902 1.16683 7.00065 1.16683ZM7.58399 5.25016L7.58399 4.0835L6.41732 4.0835L6.41732 5.25016L7.58399 5.25016ZM7.58398 9.91683L7.58398 6.41683L6.41732 6.41683L6.41732 9.91683L7.58398 9.91683Z"
              fill="#1C785E"
            />
          </svg>
          Foto Yang Pertama Kali Di Upload Akan Menjadi Thumbnail Slider
          Foto/Video di Detail Produk
        </div>
        {/* Area Thumbnail Foto */}
        <div className="container mx-auto p-4 max-w-md">
          {/* Thumbnail Section */}
          <div className="mb-6 border-2 border-gray-300 bg-white rounded-lg shadow-md p-3">
            <h2 className="text-md border-b-2 border-gray-300 p-2 font-semibold mb-4">
              Foto Thumbnail
            </h2>
            <div className="relative border border-gray-300 rounded w-full h-44 flex items-center justify-center bg-gray-100">
              {!selectedThumbnail ? (
                <div
                  className="cursor-pointer text-gray-400 text-4xl"
                  onClick={() => fileInputRef.current?.click()}
                >
                  +
                </div>
              ) : (
                <img
                  src={URL.createObjectURL(selectedThumbnail)}
                  alt="Thumbnail Preview"
                  className="w-full h-full object-cover rounded"
                />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleThumbnailChange}
                ref={fileInputRef}
                hidden
              />
            </div>
            <div className="mt-4 border-t-2 border-gray-300"></div>
            <div className="flex justify-end py-2">
              <button
                className="w-[150px] text-xs bg-[#51d7b1] text-white py-2 rounded-lg"
                onClick={() => fileInputRef.current?.click()}
              >
                Ganti Foto
              </button>
            </div>
          </div>

          {/* Product Photos Section */}
          <div className="mb-6 border-2 border-gray-300 bg-white rounded-lg shadow-md p-3">
            <h2 className="text-md border-b-2 border-gray-300 p-2 font-semibold mb-4">
              Foto Produk
            </h2>
            {productPhotos.map((photo, index) => (
              <div key={index} className="relative mb-4">
                <img
                  src={URL.createObjectURL(photo)}
                  alt={`Produk ${index + 1}`}
                  className="w-full h-44 object-cover rounded border border-gray-300"
                />
                <button
                  className="absolute top-2 right-2 text-white p-1 "
                  onClick={() => removeProductPhoto(index)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 11 12"
                    fill="none"
                  >
                    <rect
                      x="0.25"
                      y="1"
                      width="10"
                      height="10"
                      rx="0.75"
                      fill="#09CBCA"
                    />
                    <rect
                      x="0.25"
                      y="1"
                      width="10"
                      height="10"
                      rx="0.75"
                      stroke="#09CBCA"
                      stroke-width="0.5"
                    />
                    <path
                      d="M3.5 4.55H7.5V8.45C7.5 8.61569 7.38808 8.75 7.25 8.75H3.75C3.61193 8.75 3.5 8.61569 3.5 8.45V4.55ZM4.25 3.65V3.05C4.25 2.88432 4.36193 2.75 4.5 2.75H6.5C6.63808 2.75 6.75 2.88432 6.75 3.05V3.65H8V4.25H3V3.65H4.25ZM4.75 3.35V3.65H6.25V3.35H4.75ZM4.75 5.75V7.55H5.25V5.75H4.75ZM5.75 5.75V7.55H6.25V5.75H5.75Z"
                      fill="#FDFDFD"
                    />
                  </svg>
                </button>
              </div>
            ))}
            {limitUpload > 0 && (
              <div className="relative border border-gray-300 rounded w-full h-44 flex items-center justify-center bg-gray-100">
                <div
                  className="cursor-pointer text-gray-400 text-4xl"
                  onClick={() => productPhotoInputRef.current?.click()}
                >
                  +
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProductPhotoChange}
                  ref={productPhotoInputRef}
                  hidden
                />
              </div>
            )}
            {limitUpload > 0 && (
              <div className="mt-4 border-t-2 border-gray-300"></div>
            )}
            {limitUpload > 0 && (
              <div className="flex justify-end py-2">
                <button
                  className="w-[150px] text-xs bg-[#51d7b1] text-white py-2 rounded-lg"
                  onClick={() => productPhotoInputRef.current?.click()}
                >
                  Tambah Foto Produk
                </button>
              </div>
            )}
          </div>

          {/* Save Button */}
          <button
            className={`w-full py-3 rounded-lg text-white ${
              selectedThumbnail || productPhotos.length > 0
                ? "bg-[#51d7b1] hover:bg-[#46be9c]"
                : "bg-gray-300 cursor-not-allowed"
            }`}
            disabled={!selectedThumbnail && productPhotos.length === 0}
            onClick={handleUploadGambar}
          >
            Simpan
          </button>
        </div>
      </div>
    </LayoutUtama>
  );
};

export default FotoAtauVideoPage;
