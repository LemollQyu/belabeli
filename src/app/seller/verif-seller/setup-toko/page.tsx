"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/app/layouts/header";
import LayoutUtama from "@/app/layouts/layout-utama";
import postVerifikasi from "@/api/seller/verifikasi-seller/postVerifikasi";

const SetupToko = () => {
  const [storeName, setStoreName] = useState("");
  const [storeAddress, setStoreAddress] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [position, setPosition] = useState<[number, number] | null>(null);

  const router = useRouter();

  const [data, setData] = useState(null);

  useEffect(() => {
    const savedData = localStorage.getItem("verificationData");
    if (savedData) {
      const parsedData = JSON.parse(savedData);

      if (parsedData.gambarKtp) {
        // Konversi Base64 menjadi Blob
        fetch(parsedData.gambarKtp)
          .then((res) => res.blob())
          .then((blob) => {
            parsedData.gambarKtp = new File([blob], "uploaded-file.jpg", {
              type: blob.type,
            });
            setData(parsedData); // Set data dengan gambarKtp sebagai File
          })
          .catch((error) => {
            console.error("Gagal memulihkan file:", error);
          });
      } else {
        setData(parsedData);
      }
    }
  }, []);

  console.log(data);

  useEffect(() => {
    // Load address data from localStorage on component mount
    const addressData = JSON.parse(localStorage.getItem("addressData") || "{}");
    if (addressData) {
      setAddress(`${addressData.address}, ${addressData.city}`);
      setStoreAddress(addressData.storeAddress || "");
      setCity(addressData.city || "");
      setPosition(addressData.position || null);
    }
  }, []);

  // Validate form on input changes
  const validateForm = () => {
    setIsFormValid(
      storeName.trim() !== "" &&
        storeAddress.trim() !== "" &&
        email.trim() !== "" &&
        phone.trim() !== ""
    );
  };

  // Handle the Next button click
  // const handleNext = () => {
  //   // if (isFormValid) {
  //   //   const queryParams = new URLSearchParams({
  //   //     address: storeAddress,
  //   //   }).toString();
  //   //   const url = `/seller/verif-seller/verifikasi`;
  //   //   router.push(url);
  //   // }

  //   console.log(
  //     "data di page ini = ",
  //     storeName,
  //     storeAddress,
  //     email,
  //     phone,
  //     position
  //   );
  //   console.log("data yang dilempar dari page sebelumnya = ", data);
  // };

  const handleNext = async (): Promise<void> => {
    if (!isFormValid) {
      console.error("Form tidak valid");
      return;
    }

    const formData = new FormData();

    if (data) {
      // Ambil data nama_lengkap dan nik dari localStorage
      if (data.gambarKtp && data.gambarKtp instanceof File) {
        formData.append("foto_ktp", data.gambarKtp); // menggantikan "gambarKtp"
      }
      if (data.nama) {
        formData.append("nama_lengkap", data.nama); // menggantikan "nama"
      }
      if (data.nik) {
        formData.append("nik", data.nik); // menggantikan "nik"
      }
    }

    // Ganti nama parameter sesuai dengan yang diinginkan
    formData.append("nama_toko", storeName); // menggantikan "storeName"
    formData.append("email", email); // menggantikan "email"
    formData.append("no_telepon", phone); // menggantikan "phone"
    formData.append("alamat_toko", storeAddress); // menggantikan "storeAddress"

    if (position) {
      formData.append("latitude", position[0].toString()); // menggantikan "latitude"
      formData.append("longitude", position[1].toString()); // menggantikan "longitude"
    }

    // Debugging: Periksa isi FormData
    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    const response = await postVerifikasi({ formData });

    console.log(response);

    if (response?.data?.code == 200) {
      router.push("/seller/verif-seller/verifikasi");
    }

    // Lakukan pengiriman ke server atau navigasi
  };

  const fetchAddressFromCoords = async (
    latitude: number,
    longitude: number
  ) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
      );
      const data = response.data;
      const formattedAddress = data.display_name;
      setAddress(formattedAddress);

      const addressParts = formattedAddress.split(", ");
      const city = addressParts[0];
      setCity(city);

      // Save data to localStorage
      const locationData = {
        address: formattedAddress,
        city: city,
        storeAddress,
        position: [latitude, longitude],
      };
      localStorage.setItem("addressData", JSON.stringify(locationData));
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };

  const handleStoreAddressChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setStoreAddress(e.target.value);
    const address = e.target.value;

    if (address) {
      try {
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            address
          )}&limit=1`
        );
        const data = response.data[0];
        if (data) {
          const lat = parseFloat(data.lat);
          const lon = parseFloat(data.lon);
          setPosition([lat, lon]);
          fetchAddressFromCoords(lat, lon);
        }
      } catch (error) {
        console.error("Error fetching coordinates:", error);
      }
    }
  };

  const handleBack = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.back();
  };

  return (
    <LayoutUtama>
      <Header title="Verifikasi" children={undefined} />
      <div className="border-2 container w-[400px] p-4 pt-20 font-nunito">
        <div className="flex flex-col items-center space-y-4 ">
          <div className="w-[190px] h-[18px] relative mt-4">
            <div className="w-[190px] h-[18px] left-0 top-0 absolute bg-[#d9d9d9] rounded-xl" />
            <div className="w-[186px] h-3.5 left-[2px] top-[2px] absolute bg-[#51D7B1] rounded-xl" />
          </div>

          {/* Store Details Form */}
          <div className="w-full space-y-3 py-12">
            <div className="bg-gray-100 p-3 rounded-lg">
              <label className="block text-sm text-gray-500">Nama Toko</label>
              <input
                type="text"
                value={storeName}
                onChange={(e) => {
                  setStoreName(e.target.value);
                  validateForm();
                }}
                placeholder="Masukkan Nama Toko"
                className="w-full bg-transparent border-none outline-none font-semibold text-gray-700"
              />
            </div>

            {/* Store Address */}
            <div className="bg-gray-100 p-3 rounded-lg">
              <label className="block text-sm text-gray-500 mb-2">
                Alamat Toko
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={storeAddress}
                  placeholder="Cari Alamat"
                  className="w-full bg-transparent border-none outline-none font-semibold text-gray-700"
                  readOnly
                />
                <svg
                  onClick={() => router.push("setup-toko/pin-location")}
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="cursor-pointer"
                >
                  <path
                    d="M13.1724 12.0003L8.22266 7.05055L9.63687 5.63635L16.0009 12.0003L9.63687 18.3643L8.22266 16.95L13.1724 12.0003Z"
                    fill="black"
                  />
                </svg>
              </div>
            </div>

            <div className="bg-gray-100 p-3 rounded-lg">
              <label className="block text-sm text-gray-500">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  validateForm();
                }}
                placeholder="Masukkan Email"
                className="w-full bg-transparent border-none outline-none font-semibold text-gray-700"
              />
            </div>

            <div className="bg-gray-100 p-3 rounded-lg">
              <label className="block text-sm text-gray-500">
                Nomor Telepon
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => {
                  const input = e.target.value;
                  if (/^\d*$/.test(input)) {
                    setPhone(input);
                    validateForm();
                  }
                }}
                placeholder="Masukkan Nomor Telepon"
                className="w-full bg-transparent border-none outline-none font-semibold text-gray-700"
                inputMode="numeric"
              />
            </div>
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
      </div>
    </LayoutUtama>
  );
};

export default SetupToko;
