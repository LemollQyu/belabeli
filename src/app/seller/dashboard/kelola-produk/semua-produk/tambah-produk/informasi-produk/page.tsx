"use client";

import getEtalase from "@/api/etalase/getEtalase";
import getEtalaseTanpaMerchantId from "@/api/etalase/getEtalaseTanpaMerchantId";
import addEtalase from "@/api/etalase/postEtalase";
import getCategory from "@/api/getCategory";
import reqKirimInformasiProduct from "@/api/seller/kelola-produk/postAddInformasiProduct";
import Popup from "@/app/components/seller/popup";
import Header from "@/app/layouts/header";
import LayoutUtama from "@/app/layouts/layout-utama";
import { useRouter } from "next/navigation";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";

type MerchantItem = {
  id: number;
  name: string;
  merchants_id: number;
  created_at: string; // Format ISO 8601
  updated_at: string; // Format ISO 8601
};

type MerchantDataArray = MerchantItem[];

type MerchantData = {
  created_at: string; // Format ISO 8601 timestamp
  id: number;
  merchants_id: number;
  name: string;
  updated_at: string; // Format ISO 8601 timestamp
};

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

const TambahProduk = () => {
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>(
    {}
  );
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [photo, setPhoto] = useState<string | null>(null);
  const [dataEtalase, setDataEtalase] = useState<MerchantDataArray>(null);
  const [dataAddEtalase, setDataAddEtalase] = useState<MerchantData>(null);
  const [chooseEtalase, setChooseEtalase] = useState<string>(null);
  const [fotoPanduanUkuran, setFotoPanduanUkuran] = useState(null);
  const [dataUploadInformasiProduct, setDataUploadInformasiProduct] =
    useState<Product>(null);

  // useEffect(() => {
  //   async function fetchData() {
  //     const response = await getEtalase({
  //       merchantId: dataAddEtalase?.merchants_id,
  //     });

  //     console.log(response);
  //     setDataEtalase(response.data);
  //   }

  //   fetchData();
  // }, [dataAddEtalase]);

  useEffect(() => {
    async function fetchData() {
      const response = await getEtalaseTanpaMerchantId();

      console.log(response);
      setDataEtalase(response.data);
    }

    fetchData();
  }, []);

  const [dataCategory, setDataCategory] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await getCategory();

      console.log(response);
      setDataCategory(response.data);
      // setDataEtalase(response.data);
    }

    fetchData();
  }, []);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedData, setSelectedData] = useState<number | null>(null); // Data final saat tombol "Pilih" diklik

  const handleSelectCategory = (id: number) => {
    setSelectedId(id); // Menyimpan pilihan sementara
  };

  const handleSubmitCategory = () => {
    setSelectedData(selectedId); // Menyimpan pilihan saat tombol "Pilih" diklik
    setIsDropdownOpen(false); // Menutup dropdown
    console.log("Selected ID:", selectedId); // Menampilkan ID di console
  };

  console.log("data etalase = ", dataEtalase);
  console.log("etalase yang dipilih = ", chooseEtalase);
  console.log("category = ", dataCategory);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFotoPanduanUkuran(file);
    if (file) {
      const fileURL = URL.createObjectURL(file);

      setPhoto(fileURL);
    }
  };

  const handleSavePhoto = () => {
    if (photo) {
      alert("Foto berhasil disimpan!");
      // Jika ingin mengirim foto ke server, implementasikan logika penyimpanan di sini.
      console.log("Foto yang dipilih:", photo);
    } else {
      alert("Harap pilih foto terlebih dahulu!");
    }
  };

  const [formData, setFormData] = useState({
    namaProduk: "",
    merk: "",
    gaya: "",
    berat: "",
    kategori: "",
    jenisBarang: "",
    keamananProduk: "",
    etalase: chooseEtalase,
    deskripsiProduk: "",
    panduanUkuran: null as File | null,
    informasiPenting: "",
  });

  // Handler untuk setiap perubahan input
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;

    // Update data form
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));

    // Tandai field sebagai "touched"
    if (value.trim() !== "") {
      setTouchedFields((prev) => ({ ...prev, [id]: true }));
    } else {
      setTouchedFields((prev) => ({ ...prev, [id]: false }));
    }

    // Validasi field
    if (id === "namaProduk") {
      if (value.length <= 86) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [id]: "Ketik Maksimal 86 Karakter",
        }));
        return; // Hentikan pembaruan jika melebihi 86 karakter
      } else {
        setErrors((prevErrors) => {
          const { [id]: _, ...remainingErrors } = prevErrors;
          return remainingErrors;
        });
      }
    }
  };

  const handleSelectKategori = (kategori: string) => {
    setFormData((prevData) => ({ ...prevData, kategori }));
    setModalOpen(false); // Tutup modal setelah memilih kategori
  };

  // Handler untuk unggah foto panduan ukuran
  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setFormData((prevData) => ({
      ...prevData,
      panduanUkuran: file,
    }));
  };

  // Handler untuk submit form
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const data = new FormData();

    // const formData = new FormData();

    // Tambahkan data ke FormData
    data.append("nama_produk", formData.namaProduk);
    data.append("merk", formData.merk);
    data.append("gaya", formData.gaya);
    data.append("berat", formData.berat);
    data.append("kategori[]=", `${selectedId}`);
    data.append("jenis_barang", formData.jenisBarang);
    data.append("keamanan_produk", formData.keamananProduk);
    data.append("etalase", chooseEtalase);
    data.append("deskripsi_produk", formData.deskripsiProduk);
    data.append("panduan_ukuran", fotoPanduanUkuran);
    data.append("informasi_penting", formData.informasiPenting);

    // console.log(data);

    const response = await reqKirimInformasiProduct({ formData: data });

    // console.log(response);
    if (response.data?.code == 201) {
      setDataUploadInformasiProduct(response.data?.data);
      localStorage.setItem("productData", JSON.stringify(response.data?.data));

      router.push("/seller/dashboard/kelola-produk/semua-produk/tambah-produk");
    }

    for (const [key, value] of data.entries()) {
      console.log(`${key}:`, value);
    }

    e.preventDefault();
    console.log(
      "nama produk = ",
      formData.namaProduk,
      "Merek = ",
      formData.merk,
      "Gaya = ",
      formData.gaya,
      "Berat = ",
      formData.berat,
      "Kategori = ",
      selectedId,
      "jenis barang = ",
      formData.jenisBarang,
      "keamanan barang = ",
      formData.keamananProduk,
      "etalase = ",
      chooseEtalase,
      "Deskripsi produk = ",
      formData.deskripsiProduk,
      "panduan ukuran = ",
      fotoPanduanUkuran,
      "informasi penting = ",
      formData.informasiPenting
    );
    // alert("Data berhasil disimpan! Cek console untuk data.");
  };

  console.log("data upload informasi product = ", dataUploadInformasiProduct);

  const [isModalOpen, setModalOpen] = useState(false);
  const popupOptions = {
    category: [dataCategory],
    kategori: [
      "Gadget & Elektronik",
      "Fashion dan Kecantikan",
      "Kebutuhan Harian",
      "Mainan & Hobi",
      "Perlengkapan Rumah & Dekorasi",
      "Sports",
      "Pria",
      "Wanita",
      "Peliharaan",
      "Perhiasan",
      "Kerajinan",
      "Otomotif dan Perkakas",
      "Ibu dan Bayi",
    ],
    jenisBarang: ["baru", "bekas"],
    keamananProduk: ["aman", "tidak aman"],
  };

  const [popup, setPopup] = useState({
    isOpen: false,
    type: "",
  });

  const handleSelectOption = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const getBorderColor = (field: string) => {
    if (touchedFields[field]) {
      return "border-green-500";
    } else if (formData[field as keyof typeof formData] === "") {
      return "border-red-500";
    }
    return "border-gray-300";
  };

  const router = useRouter();

  // Fungsi navigasi
  const handleNavigate = (path: string) => {
    router.push(path);
  };

  const [showPopup, setShowPopup] = useState(false);
  const [selectedEtalase, setSelectedEtalase] = useState<string | null>(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isPopupTambahEtalaseVisible, setIsPopupTambahEtalaseVisible] =
    useState(false);
  const [isEtalaseBerhasilDitambahkan, setIsEtalaseBerhasilDitambahkan] =
    useState(false);
  const [namaEtalase, setNamaEtalase] = useState<string>("");
  const [etalaseList, setEtalaseList] = useState<string[]>([]);

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
    setIsEtalaseBerhasilDitambahkan(false);
    setNamaEtalase("");
  };

  // Membuat fungsi untuk menangani penyimpanan etalase
  const handleSaveEtalase = async () => {
    console.log("nama etalase = ", namaEtalase);

    const response = await addEtalase({ nama: namaEtalase });

    console.log(response);

    if (response?.error?.code == 401) {
      router.push("/authentikasi/login");
    }

    if (response?.data?.code == 201) {
      handleClosePopupTambahEtalase();
      console.log("Nama Etalase disimpan:", namaEtalase);
      setDataAddEtalase(response.data?.data);
      setIsPopupTambahEtalaseVisible(false);
    }

    // if (namaEtalase.trim()) {
    //   setEtalaseList((prev) => [...prev, namaEtalase.trim()]);
    //   setNamaEtalase("");
    //   setIsEtalaseBerhasilDitambahkan(true);

    //   setTimeout(() => {
    //     handleClosePopupTambahEtalase();
    //     console.log("Nama Etalase disimpan:", namaEtalase);
    //     // Tutup popup setelah beberapa detik
    //   }, 100000); // Popup tertutup otomatis dalam 2 detik
    // }
    // // console.log('Nama Etalase disimpan:', namaEtalase)
  };

  const handleEtalaseSelection = (etalase: string) => {
    setSelectedEtalase(etalase);
    setShowPopup(false);
    console.log(`Etalase terpilih: ${etalase}`);
  };

  return (
    <LayoutUtama>
      <Header title="Informasi Produk" children={undefined} />
      <div className="container mx-auto px-4 pt-24 pb-8 font-nunito">
        <div className="bg-red-100 text-red-600 text-sm px-3 py-2 rounded-md mb-6 flex items-center gap-2">
          <svg
            width="14"
            height="15"
            viewBox="0 0 14 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.00033 13.3332C3.77866 13.3332 1.16699 10.7215 1.16699 7.49984C1.16699 4.27817 3.77866 1.6665 7.00033 1.6665C10.222 1.6665 12.8337 4.27817 12.8337 7.49984C12.8337 10.7215 10.222 13.3332 7.00033 13.3332ZM6.41699 9.24984V10.4165H7.58366V9.24984H6.41699ZM6.41699 4.58317V8.08317H7.58366V4.58317H6.41699Z"
              fill="#EE443F"
            />
          </svg>
          Label (*) Menandakan Bahwa Isian WAJIB DIISI
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Nama Produk */}
          <div>
            <label
              htmlFor="namaProduk"
              className="block text-sm font-semibold pb-2 text-black"
            >
              (*) Nama Produk
            </label>
            <div className="relative">
              <input
                type="text"
                id="namaProduk"
                value={formData.namaProduk}
                onChange={(e) => {
                  if (e.target.value.length <= 86) {
                    handleInputChange(e); // Fungsi untuk mengupdate formData
                  }
                }}
                placeholder="Masukkan Judul Produk"
                className={`w-full border rounded-md p-4 text-sm focus:outline-none ${getBorderColor(
                  "namaProduk"
                )}`}
              />
              {/* Pesan Error */}
              {errors.namaProduk && (
                <div className="absolute right-0 -bottom-6 text-sm text-black-500">
                  {errors.namaProduk}
                </div>
              )}
            </div>
            {/* Indikator Jumlah Karakter */}
            <div className="text-right text-sm text-gray-500 mt-5">
              {formData.namaProduk.length}/86 karakter
            </div>
          </div>

          {/* Merk */}
          <div>
            <label
              htmlFor="merk"
              className="block text-sm font-semibold pb-2 text-black"
            >
              (*) Merk
            </label>
            <input
              type="text"
              id="merk"
              value={formData.merk}
              onChange={handleInputChange}
              placeholder="Masukkan Merk Produk"
              maxLength={50} // Maksimal 50 karakter
              className={`w-full border rounded-md p-4 text-sm focus:outline-none ${getBorderColor(
                "merk"
              )}`}
            />
          </div>

          {/* Gaya */}
          <div>
            <label
              htmlFor="gaya"
              className="block text-sm font-semibold pb-2 text-black"
            >
              (*) Gaya
            </label>
            <input
              type="text"
              id="gaya"
              value={formData.gaya}
              onChange={handleInputChange}
              placeholder="Masukkan Gaya Produk"
              maxLength={30} // Maksimal 30 karakter
              className={`w-full border rounded-md p-4 text-sm focus:outline-none ${getBorderColor(
                "gaya"
              )}`}
            />
          </div>

          {/* Berat */}
          <div>
            <label
              htmlFor="berat"
              className="block text-sm font-semibold pb-2 text-black"
            >
              (*) Berat
            </label>
            <input
              type="text"
              id="berat"
              value={formData.berat}
              onChange={handleInputChange}
              placeholder="Masukkan Berat Produk dalam kilogram (kg)"
              maxLength={10} // Maksimal 10 karakter
              className={`w-full border rounded-md p-4 text-sm focus:outline-none ${getBorderColor(
                "berat"
              )}`}
            />
          </div>

          {/* Kategori */}
          <label
            htmlFor="namaProduk"
            className="block text-sm font-semibold  text-black"
          >
            (*) Pilih Category
          </label>
          <div
            className="border border-gray-300 rounded-lg p-4 flex justify-between items-center cursor-pointer"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <span>
              {selectedData
                ? dataCategory.find((o) => o.id === selectedData)?.name
                : "Pilih Kategori"}
            </span>
            <span className="text-gray-500">&#9662;</span>
          </div>

          {/* Jenis Barang */}
          <div>
            <label className="block text-sm font-semibold pb-2 text-black">
              (*) Jenis Barang
            </label>
            <button
              type="button"
              onClick={() => setPopup({ isOpen: true, type: "jenisBarang" })}
              className="w-full border border-gray-300 rounded-md p-4 text-left  flex items-center justify-between focus:outline-none"
            >
              {formData.jenisBarang || "Pilih Jenis Barang"}
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

          {/* Keamanan Produk */}
          <div>
            <label className="block text-sm font-semibold pb-2 text-black">
              (*) Keamanan Produk
            </label>
            <button
              type="button"
              onClick={() => setPopup({ isOpen: true, type: "keamananProduk" })}
              className="w-full border border-gray-300 rounded-md p-4 text-left  flex items-center justify-between focus:outline-none"
            >
              {formData.keamananProduk || "Pilih Keamanan Produk"}
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

          {/* Popup */}
          <Popup
            isOpen={popup.isOpen}
            onClose={() => setPopup({ isOpen: false, type: "" })}
            title={`Pilih ${
              popup.type === "kategori"
                ? "Kategori"
                : popup.type === "jenisBarang"
                ? "Jenis Barang"
                : "Keamanan Produk"
            }`}
            options={
              popupOptions[popup.type as keyof typeof popupOptions] || []
            }
            onSelect={(value) => handleSelectOption(popup.type, value)}
          />

          {/* Dropdown Pilih Etalase */}
          <div>
            <label className="block text-sm font-semibold pb-2 text-black">
              (*) Etalase
            </label>
            <button
              type="button"
              onClick={handleOpenPopup}
              className="w-full border border-gray-300 rounded-md p-4 text-left flex items-center justify-between focus:outline-none"
            >
              <span className="text-black">
                {!chooseEtalase ? "Pilih Etalase" : chooseEtalase}
              </span>
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

          {/* Popup */}
          {showPopup && (
            <div className="fixed inset-0 flex items-end justify-center z-50 font-nunito">
              {/* Overlay */}
              <div
                className="fixed inset-0 bg-black opacity-50 z-40"
                onClick={handleClosePopup}
                aria-label="Tutup popup"
              ></div>

              {/* Konten Popup */}
              <div className="bg-white p-6 h-[400px] text-black rounded-t-[24px] w-full max-w-md shadow-lg relative z-50 overflow-hidden animate-slide-up flex flex-col">
                {/* Header Popup */}
                <div className="flex justify-between items-center mb-4">
                  <h1 className="text-[16px] text-black font-semibold">
                    Etalase Toko
                  </h1>
                  <svg
                    onClick={handleClosePopup}
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    className="cursor-pointer"
                    aria-label="Tutup popup"
                  >
                    <path
                      d="M6.99976 5.46871L12.362 0.106445L13.8941 1.63851L8.53181 7.00076L13.8941 12.3629L12.362 13.895L6.99976 8.53281L1.63754 13.895L0.105469 12.3629L5.46771 7.00076L0.105469 1.63851L1.63754 0.106445L6.99976 5.46871Z"
                      fill="black"
                    />
                  </svg>
                </div>

                {/* Dropdown Pilih Etalase */}
                <div className="mb-6 relative">
                  <label
                    htmlFor="etalase-popup"
                    className="block text-sm font-semibold pb-2 text-black"
                  >
                    Pilih Etalase
                  </label>
                  <button
                    type="button"
                    onClick={handlePopup}
                    className="w-full border border-gray-300 rounded-md p-4 text-left flex items-center justify-between focus:outline-none"
                  >
                    <span className="text-black">Pilih Etalase</span>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className={`transition-transform duration-200 ${
                        isPopupVisible ? "rotate-180" : ""
                      }`}
                    >
                      <path
                        d="M8.00042 8.78077L11.3003 5.48096L12.2431 6.42376L8.00042 10.6664L3.75781 6.42376L4.70062 5.48096L8.00042 8.78077Z"
                        fill="black"
                      />
                    </svg>
                  </button>

                  {/* Dropdown Content */}
                  {isPopupVisible && (
                    <div className="absolute left-0 mt-1 z-10 bg-white w-full py-2  flex flex-col gap-2.5">
                      <div className="space-y-1 max-h-20 overflow-y-auto border border-gray-200 rounded-md">
                        {dataEtalase?.map((etalase, index) => {
                          console.log("mapping = ", etalase);
                          return (
                            <label
                              key={index}
                              className="flex items-center px-3 py-2 justify-between text-sm border border-gray-300 rounded-md bg-white text-black cursor-pointer"
                            >
                              {etalase?.name}
                              <input
                                type="radio"
                                name="etalase"
                                value={etalase?.name}
                                className="mr-2 accent-emerald-500"
                                onChange={() => {
                                  setChooseEtalase(etalase?.name);
                                  console.log(
                                    `Etalase dipilih: ${etalase?.name}`
                                  );
                                }}
                              />
                            </label>
                          );
                        })}
                      </div>

                      {/* Tombol Tambah Etalase */}
                      <div
                        className="p-4 flex justify-center items-center w-full h-10 rounded-md border border-[#5f5f5f] bg-white cursor-pointer hover:bg-[#f5f5f5]"
                        onClick={handleTambahEtalasePopup}
                      >
                        <div className="text-black font-nunito text-xs font-bold leading-[150%] w-full text-center">
                          Tambah Etalase
                        </div>
                        {/* Ikon plus */}
                        <svg
                          width={17}
                          height={16}
                          viewBox="0 0 17 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="ml-2"
                        >
                          <path
                            d="M7.83398 7.3335V3.3335H9.16732V7.3335H13.1673V8.66683H9.16732V12.6668H7.83398V8.66683H3.83398V7.3335H7.83398Z"
                            fill="#5F5F5F"
                          />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>

                {/* Tombol Lanjutkan */}
                <div className="w-full absolute bottom-0 right-0 left-0 p-4 border-t bg-white">
                  <button
                    className="w-full bg-[#51d7b1] hover:bg-emerald-600 text-white font-semibold p-3 rounded-md focus:ring-2 focus:ring-emerald-300 focus:outline-none"
                    onClick={handleClosePopup}
                  >
                    Lanjutkan
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Popup Tambah Etalase */}
          {isPopupTambahEtalaseVisible && (
            <div className="fixed inset-0 flex items-end justify-center z-50 font-nunito">
              {/* Overlay */}
              <div
                className="fixed inset-0 bg-black opacity-50 z-40"
                onClick={handleClosePopupTambahEtalase}
                aria-label="Tutup popup"
              ></div>

              {/* Konten Popup */}
              <div className="bg-white p-6 h-[400px] text-black rounded-t-[24px] w-full max-w-md shadow-lg relative z-50 overflow-hidden animate-slide-up flex flex-col">
                {isEtalaseBerhasilDitambahkan ? (
                  // Konten berhasil ditambahkan
                  <div className="flex flex-col items-center justify-center">
                    <div className="w-full flex justify-between items-center">
                      <h1 className="text-[16px] text-black font-semibold">
                        Tambah Etalase
                      </h1>
                      <svg
                        onClick={handleClosePopupTambahEtalase}
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        className="cursor-pointer"
                        aria-label="Tutup popup"
                      >
                        <path
                          d="M6.99976 5.46871L12.362 0.106445L13.8941 1.63851L8.53181 7.00076L13.8941 12.3629L12.362 13.895L6.99976 8.53281L1.63754 13.895L0.105469 12.3629L5.46771 7.00076L0.105469 1.63851L1.63754 0.106445L6.99976 5.46871Z"
                          fill="black"
                        />
                      </svg>
                    </div>
                    <div className="mt-10 flex flex-col items-center w-full gap-3">
                      <svg
                        width="120"
                        height="120"
                        viewBox="0 0 120 120"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M60 110C32.3857 110 10 87.614 10 60C10 32.3857 32.3857 10 60 10C87.614 10 110 32.3857 110 60C110 87.614 87.614 110 60 110ZM55.013 80L90.3685 44.6447L83.2975 37.5736L55.013 65.858L40.871 51.7155L33.8 58.787L55.013 80Z"
                          fill="url(#paint0_linear_6842_28475)"
                        />
                        <defs>
                          <linearGradient
                            id="paint0_linear_6842_28475"
                            x1="10"
                            y1="60"
                            x2="110"
                            y2="60"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stopColor="#83E69B" />
                            <stop offset="1" stopColor="#00BAE1" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="text-black text-center leading-[150%] ">
                        <h1 className="text-2xl font-semibold">
                          Etalase Ditambahkan
                        </h1>
                        <p className="mt-3 text-sm font-medium">
                          Etalase Baru Telah Ditambahkan.
                        </p>
                      </div>

                      {/* Spasi otomatis sebelum tombol */}
                      <div className="w-full absolute bottom-0 right-0 left-0 p-4 border-t bg-white">
                        <button
                          onClick={handleClosePopupTambahEtalase}
                          className="w-full bg-[#51d7b1] hover:bg-emerald-600 text-white font-semibold p-3 rounded-md focus:ring-2 focus:ring-emerald-300 focus:outline-none"
                        >
                          Oke
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Konten tambah etalase
                  <>
                    <div className="flex justify-between items-center">
                      <h1 className="text-[16px] text-black font-semibold">
                        Tambah Etalase
                      </h1>
                      <svg
                        onClick={handleClosePopupTambahEtalase}
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        className="cursor-pointer"
                        aria-label="Tutup popup"
                      >
                        <path
                          d="M6.99976 5.46871L12.362 0.106445L13.8941 1.63851L8.53181 7.00076L13.8941 12.3629L12.362 13.895L6.99976 8.53281L1.63754 13.895L0.105469 12.3629L5.46771 7.00076L0.105469 1.63851L1.63754 0.106445L6.99976 5.46871Z"
                          fill="black"
                        />
                      </svg>
                    </div>

                    <div className="flex flex-col items-center w-full gap-3">
                      <svg
                        width="100"
                        height="100"
                        viewBox="0 0 100 100"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M91.666 83.3335V91.6668H8.33268V83.3335H12.4993V55.176C7.47439 51.8127 4.16602 46.0843 4.16602 39.5835C4.16602 36.1371 5.10114 32.8177 6.80443 29.9896L18.1048 10.4168C18.8491 9.12766 20.2246 8.3335 21.7132 8.3335H78.2856C79.7739 8.3335 81.1498 9.12766 81.8939 10.4168L93.1556 29.924C94.8977 32.8177 95.8327 36.1371 95.8327 39.5835C95.8327 46.0843 92.5244 51.8127 87.4994 55.176V83.3335H91.666ZM24.1187 16.6668L13.9826 34.2219C13.0164 35.827 12.4993 37.6622 12.4993 39.5835C12.4993 45.3364 17.1631 50.0002 22.916 50.0002C27.2117 50.0002 31.0188 47.3764 32.5901 43.4564C33.9885 39.9678 38.9269 39.9678 40.3252 43.4564C41.8964 47.3764 45.7035 50.0002 49.9994 50.0002C54.2952 50.0002 58.1023 47.3764 59.6735 43.4564C61.0719 39.9678 66.0102 39.9678 67.4085 43.4564C68.9798 47.3764 72.7869 50.0002 77.0827 50.0002C82.8356 50.0002 87.4994 45.3364 87.4994 39.5835C87.4994 37.6622 86.9823 35.827 85.9773 34.1562L75.8798 16.6668H24.1187Z"
                          fill="#51D7B1"
                        />
                      </svg>

                      <div className="text-black text-center font-nunito text-2xl font-bold leading-[150%]">
                        Tambah Etalase
                      </div>

                      <div className="text-black text-center font-nunito text-sm font-medium leading-[150%]">
                        Isi Nama Etalase Pada Kolom Dibawah Ini
                      </div>

                      <div className="flex justify-center items-center p-4 w-full rounded-md border border-gray-500 bg-white">
                        <input
                          type="text"
                          placeholder="Masukkan Nama Etalase"
                          className="w-full bg-transparent focus:outline-none text-black font-nunito text-md leading-[150%]"
                          value={namaEtalase}
                          onChange={(e) => setNamaEtalase(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="w-full absolute bottom-0 right-0 left-0 p-4 border-t bg-white">
                      <button
                        className="w-full bg-[#51d7b1] hover:bg-emerald-600 text-white font-semibold p-3 rounded-md focus:ring-2 focus:ring-emerald-300 focus:outline-none disabled:bg-gray-300 disabled:cursor-not-allowed"
                        onClick={handleSaveEtalase}
                        disabled={!namaEtalase.trim()} // Disable jika namaEtalase kosong
                      >
                        Simpan
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Deskripsi Produk */}
          <div>
            <label
              htmlFor="deskripsiProduk"
              className="block text-sm font-semibold pb-2 text-black"
            >
              (*) Deskripsi Produk
            </label>
            <textarea
              id="deskripsiProduk"
              value={formData.deskripsiProduk}
              onChange={(e) => {
                const words = e.target.value.split(/\s+/).filter(Boolean);
                if (words.length <= 200) {
                  handleInputChange(e); // Fungsi untuk mengupdate formData
                }
              }}
              placeholder="Masukkan Deskripsi Produk"
              className="w-full border border-gray-300 rounded-md p-4 text-sm focus:outline-none h-[350px]" // Menentukan tinggi dengan Tailwind
            />

            <div className="text-right text-sm text-gray-500 mt-1">
              {formData.deskripsiProduk.split(/\s+/).filter(Boolean).length}/200
              kata
            </div>
          </div>

          {/* Panduan Ukuran */}
          <div>
            <label className="block text-sm font-semibold pb-2 text-black">
              Panduan Ukuran
            </label>
            <div className="w-full h-[290px] rounded-lg bg-gray-300 flex items-center justify-center relative">
              {photo ? (
                <img
                  src={photo}
                  alt="Pratinjau Foto"
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <button className="absolute flex items-center">
                  <svg
                    width="80"
                    height="80"
                    viewBox="0 0 80 80"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M36.667 36.6665V23.3332H43.3337V36.6665H56.667V43.3332H43.3337V56.6665H36.667V43.3332H23.3337V36.6665H36.667ZM40.0003 73.3332C21.5908 73.3332 6.66699 58.4092 6.66699 39.9998C6.66699 21.5903 21.5908 6.6665 40.0003 6.6665C58.4097 6.6665 73.3337 21.5903 73.3337 39.9998C73.3337 58.4092 58.4097 73.3332 40.0003 73.3332ZM40.0003 66.6665C54.728 66.6665 66.667 54.7275 66.667 39.9998C66.667 25.2722 54.728 13.3332 40.0003 13.3332C25.2727 13.3332 13.3337 25.2722 13.3337 39.9998C13.3337 54.7275 25.2727 66.6665 40.0003 66.6665Z"
                      fill="white"
                    />
                  </svg>
                </button>
              )}

              {/* Input untuk upload foto */}
              <input
                type="file"
                onChange={handleFileChange}
                className="absolute cursor-pointer w-full h-full opacity-0"
              />
            </div>

            {/* Tombol untuk menyimpan foto */}
            <button
              type="button"
              className="mt-4 w-full py-3 px-4 bg-[#51d7b1] text-white text-sm font-semibold pb-2 rounded-md hover:bg-emerald-600"
              onClick={handleSavePhoto}
            >
              Simpan Foto
            </button>
          </div>

          {/* Informasi Penting */}
          <div>
            <label
              htmlFor="informasiPenting"
              className="block text-sm font-semibold pb-2 text-black"
            >
              Informasi Penting
            </label>
            <textarea
              id="informasiPenting"
              value={formData.informasiPenting}
              onChange={(e) => {
                const words = e.target.value.split(/\s+/).filter(Boolean); // Memisahkan kata
                if (words.length <= 50) {
                  handleInputChange(e); // Fungsi untuk mengupdate formData
                }
              }}
              placeholder="Masukkan Informasi Penting"
              className="w-full text-sm border border-gray-300 rounded-md p-4 focus:outline-none h-[200px]"
            />
            <div className="text-right text-sm text-gray-500 mt-1">
              {formData.informasiPenting.split(/\s+/).filter(Boolean).length}/50
              kata
            </div>
          </div>

          <div className="mt-auto">
            <button
              onClick={
                () => {
                  console.log("click");
                  // console.log("ini datanya = ", formData);
                }
                // router.push(
                //   "/seller/dashboard/kelola-produk/semua-produk/tambah-produk"
                // )
              }
              className="w-full bg-[#51d7b1] text-white font-semibold  py-3 rounded-md text-sm shadow-md hover:bg-emerald-600 transition"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>

      {isDropdownOpen && (
        <>
          <div className="w-full h-screen bg-black opacity-40 fixed top-0 left-0 bottom-0 right-0 z-10"></div>
          <div className="fixed z-20  bottom-0 left-1/2 -translate-x-1/2 w-[403px] mt-2 px-3 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
            <div className="p-4 flex justify-between items-center">
              <span className="text-lg font-semibold">Pilih Kategori</span>
              <button
                onClick={() => setIsDropdownOpen(false)}
                className="text-gray-500 hover:text-black"
              >
                &times;
              </button>
            </div>
            <div className="max-h-48 overflow-y-auto px-4">
              {dataCategory?.map((option, index) => (
                <label
                  key={index}
                  className="flex items-center space-x-2 py-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="category"
                    value={option.id}
                    checked={selectedId === option.id}
                    onChange={() => handleSelectCategory(option.id)}
                    className="h-4 w-4 text-green-500 border-gray-300 focus:ring-green-500"
                  />
                  <span>{option.name}</span>
                </label>
              ))}
            </div>
            <button
              onClick={handleSubmitCategory}
              className="w-full bg-[#51d7b1] hover:bg-emerald-500 text-white py-2  rounded-lg  transition"
            >
              Pilih
            </button>
          </div>
        </>
      )}
    </LayoutUtama>
  );
};

export default TambahProduk;
