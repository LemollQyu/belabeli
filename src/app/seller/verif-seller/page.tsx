"use client";
import Header from "@/app/layouts/header";
import LayoutUtama from "@/app/layouts/layout-utama";
import React, { useState, useCallback } from "react";
import getCroppedImg from "../getCroppedImg";
import { useRouter } from "next/navigation";
import Cropper, { Area } from "react-easy-crop";

const VerifikasiKTP = () => {
  const router = useRouter(); // Initialize useRouter hook
  const [isAgreed, setIsAgreed] = useState(false);
  const [showTermsPopup, setShowTermsPopup] = useState(false);
  const [ktpImage, setKtpImage] = useState<string | null>(null);
  const [nama, setNama] = useState("");
  const [nik, setNik] = useState("");
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0); // State untuk rotasi
  const [croppedArea, setCroppedArea] = useState<Area | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [gambarKtp, setGambarKtp] = useState(null);

  const handleNIKChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    if (/^\d*$/.test(input)) {
      setNik(input);

      // Menampilkan pesan peringatan jika kurang dari 16 angka
      if (input.length > 0 && input.length < 16) {
        setError("NIK harus terdiri dari 16 angka");
      } else {
        setError("");
      }
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setGambarKtp(file);
      setKtpImage(URL.createObjectURL(file));
      setCroppedImage(null); // Reset cropped image on new upload
    }
  };

  const onCropComplete = useCallback((_: unknown, croppedArea: Area) => {
    setCroppedArea(croppedArea);
  }, []);

  const handleCrop = async () => {
    if (ktpImage && croppedArea) {
      const croppedImg = await getCroppedImg(
        ktpImage,
        croppedArea,
        crop,
        zoom,
        rotation
      ); // Tambahkan rotation
      setCroppedImage(croppedImg);
      setKtpImage(null); // Hapus gambar asli setelah crop selesai
    }
  };

  const removeCroppedImage = () => {
    setCroppedImage(null);
    setKtpImage(null);
  };

  const handleOpenTermsPopup = () => {
    setShowTermsPopup(true);
  };

  const handleCloseTermsPopup = () => {
    setShowTermsPopup(false);
  };
  const handleNext = () => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result;
      const data = { nama, nik, gambarKtp: base64String };
      localStorage.setItem("verificationData", JSON.stringify(data));
      router.push("verif-seller/setup-toko");
    };
    if (gambarKtp) {
      reader.readAsDataURL(gambarKtp); // Konversi file ke Base64
    }
  };

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    router.back();
  };

  const isFormValid = croppedImage && nama && nik && isAgreed;

  return (
    <LayoutUtama>
      <Header title="Verifikasi" children={undefined} />
      <div className="container w-[400px] pt-20 font-nunito">
        <div className="flex flex-col items-center p-4 space-y-4 ">
          <div className="w-[190px] h-[18px] relative mb-4">
            <div className="w-[190px] h-[18px] left-0 top-0 absolute bg-[#d9d9d9] rounded-xl" />
            <div className="w-[124px] h-3.5 left-[2px] top-[2px] absolute bg-[#51D7B1] rounded-xl" />
          </div>
          <h2 className="text-center font-semibold text-lg">
            Masukkan Foto KTP
          </h2>

          {/* KTP Image Upload */}
          <div className="w-60 h-36 border border-gray-400 rounded-lg overflow-hidden flex items-center justify-center relative">
            {croppedImage ? (
              <div className="relative w-full h-full">
                <img
                  src={croppedImage}
                  alt="Cropped"
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={removeCroppedImage}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                >
                  X
                </button>
              </div>
            ) : ktpImage ? (
              <div className="w-full h-full relative">
                <Cropper
                  image={ktpImage}
                  crop={crop}
                  zoom={zoom}
                  rotation={rotation} // Tambahkan rotasi
                  aspect={4 / 3}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={onCropComplete}
                />
              </div>
            ) : (
              <label className="cursor-pointer flex flex-col items-center">
                <span className="text-2xl">+</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
            )}
          </div>

          {/* Zoom and Rotate Sliders */}
          {!croppedImage && ktpImage && (
            <>
              <div className="w-full mt-4">
                <label className="text-sm text-gray-500">Zoom</label>
                <input
                  type="range"
                  min={1}
                  max={3}
                  step={0.1}
                  value={zoom}
                  onChange={(e) => setZoom(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>
              <div className="w-full mt-2">
                <label className="text-sm text-gray-500">Rotation</label>
                <input
                  type="range"
                  min={0}
                  max={360}
                  step={1}
                  value={rotation}
                  onChange={(e) => setRotation(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>
              <button
                onClick={handleCrop}
                className="mt-4 w-full bg-[#51D7B1] text-white p-3 rounded-lg"
              >
                Crop Image
              </button>
            </>
          )}

          {/* Form Fields */}
          <div className="w-full space-y-3">
            <div className="bg-gray-100 p-3 rounded-lg">
              <label className="block text-sm text-gray-500">
                Nama Lengkap
              </label>
              <input
                type="text"
                value={nama}
                onChange={(e) => setNama(e.target.value.toUpperCase())} // Mengubah input menjadi kapital
                placeholder="Masukkan Nama Lengkap"
                className="w-full bg-transparent border-none outline-none font-semibold text-black"
              />
            </div>

            <div className="bg-gray-100 p-3 rounded-lg">
              <label className="block text-sm text-gray-500">NIK</label>
              <input
                type="text"
                value={nik}
                onChange={handleNIKChange}
                placeholder="Masukkan NIK"
                className="w-full bg-transparent border-none outline-none font-semibold text-black"
                inputMode="numeric"
                maxLength={16} // Batasi maksimal 16 karakter
              />
            </div>
            {error && <p className="ml-2 text-red-500 text-xs">{error}</p>}
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-center justify-start w-full">
            <input
              type="checkbox"
              checked={isAgreed}
              onChange={() => setShowTermsPopup(true)}
              className="mr-2"
            />
            <label className="text-sm">
              Saya Menyetujui{" "}
              <span
                onClick={() => setShowTermsPopup(true)}
                className="text-[#51D7B1] underline cursor-pointer"
              >
                Syarat & Ketentuan
              </span>
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between w-full px-3 translate-y-32">
            <button
              className="w-[45%] bg-[#51D7B1] text-white p-3 rounded-lg"
              onClick={handleBack}
            >
              Kembali
            </button>
            <button
              onClick={handleNext} // Call handleNext to navigate
              className={`w-[45%] p-3 rounded-lg ${
                isFormValid
                  ? "bg-[#51D7B1] text-white"
                  : "bg-gray-300 text-gray-500"
              }`}
              disabled={!isFormValid} // Disable the button if the form is not valid
            >
              Lanjut
            </button>
          </div>
        </div>

        {/* Popup Syarat dan Ketentuan */}
        {showTermsPopup && (
          <div className="fixed inset-0 z-50 flex justify-center items-end">
            <div
              className="fixed inset-0 bg-black opacity-50"
              onClick={handleCloseTermsPopup}
            ></div>
            <div className="bg-white p-6 h-[430px] text-black rounded-t-[24px] w-full max-w-md shadow-lg z-50 animate-slide-up relative overflow-hidden">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-[16px] text-black font-semibold">
                  Syarat & Ketentuan Menjadi Seller
                </h1>
                <svg
                  onClick={handleCloseTermsPopup}
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
              {/* Isi Syarat dan Ketentuan */}
              <ul className="w-full max-h-[250px] overflow-y-auto border text-[14px] rounded-[24px] font-medium p-[12px]">
                <li className="font-nunito mb-2">
                  <strong>1. Pendaftaran Akun Seller</strong>: Anda wajib
                  memiliki akun di platform ini dan memberikan informasi yang
                  akurat saat mendaftar sebagai seller.
                </li>
                <li className="font-nunito mb-2">
                  <strong>2. Kepatuhan Terhadap Kebijakan</strong>: Anda setuju
                  untuk mematuhi semua kebijakan dan pedoman yang berlaku,
                  termasuk aturan mengenai produk yang dapat dijual.
                </li>
                <li className="font-nunito mb-2">
                  <strong>3. Tanggung Jawab Produk</strong>: Anda bertanggung
                  jawab sepenuhnya atas kualitas dan keaslian produk yang Anda
                  jual melalui platform ini.
                </li>
                <li className="font-nunito mb-2">
                  <strong>4. Pengiriman dan Pelayanan</strong>: Anda setuju
                  untuk memenuhi pesanan pelanggan tepat waktu dan memberikan
                  layanan yang baik.
                </li>
                <li className="font-nunito mb-2">
                  <strong>5. Kebijakan Privasi</strong>: Informasi pribadi Anda
                  akan diperlakukan sesuai dengan kebijakan privasi kami, dan
                  Anda setuju untuk menjaga kerahasiaan data pelanggan.
                </li>
                <li className="font-nunito mb-2">
                  <strong>6. Perubahan Syarat & Ketentuan</strong>: Platform
                  berhak mengubah syarat dan ketentuan ini sewaktu-waktu dan
                  Anda setuju untuk mematuhinya setelah pemberitahuan perubahan.
                </li>
              </ul>

              {/* Checkbox Agree */}
              <div className="flex items-center justify-start w-full mt-4">
                <input
                  type="checkbox"
                  checked={isAgreed}
                  onChange={() => setIsAgreed(!isAgreed)}
                  className="mr-2"
                />
                <label className="text-sm">
                  Saya Menyetujui{" "}
                  <span
                    onClick={() => setShowTermsPopup(true)}
                    className="text-[#51D7B1] underline cursor-pointer"
                  >
                    Syarat & Ketentuan
                  </span>
                </label>
              </div>

              {/* Button Setuju */}
              <button
                onClick={handleCloseTermsPopup}
                className="mt-4 w-full h-[45px] rounded-md bg-[#51D7B1] text-white flex justify-center items-center"
                disabled={!isAgreed}
              >
                Setuju
              </button>
            </div>
          </div>
        )}
      </div>
    </LayoutUtama>
  );
};

export default VerifikasiKTP;
