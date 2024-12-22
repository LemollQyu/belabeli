"use client";
import React, { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LayoutUtama from "../../layouts/layout-utama";
import Header from "../../layouts/header";
import postAddress from "@/api/address/postAddress";
import axios from "axios";
import Loading from "../../components/loading";
import { AddressProvider, useAddress } from "../AddressContext";

const FormAddress = () => {
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [street, setStreet] = useState<string>("");
  const [instructions, setInstructions] = useState<string>("");

  const [kecamatan, setKecamatan] = useState<string>("");
  const [kota, setKota] = useState<string>("");
  const [province, setProvince] = useState<string>("");

  const { address } = useAddress();
  console.log("lokasi ini", address);

  const initialTown = address.city
    ? `Kota ${address.city}`
    : address.county
    ? `Kabupaten ${address.county}`
    : kota;

  useEffect(() => {
    if (address?.suburb !== null && address?.suburb !== undefined) {
      setKecamatan(address.suburb);
    }

    if (address?.state !== null && address?.state !== undefined) {
      setProvince(address.state);
    }
  }, [address]);

  const [town, setTown] = useState(initialTown);

  // console.log(town);

  //   console.log(selectedProvince);
  //   console.log(selectedCity);
  //   console.log(selectedDistrict);
  //   console.log(selectedDesa);
  //   console.log(selectedPostalCode);

  const router = useRouter();

  // console.log(kota);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    try {
      const response = await postAddress({
        nama_lengkap: name,
        nomor_telepon: phone,
        provinsi: province,
        kota: initialTown,
        kecamatan: kecamatan,
        kode_pos: address.postcode,
        nama_jalan: street,
        instruksi_pengiriman: instructions,
      });

      console.log(response);
      if (response?.error?.code == 401) {
        router.push("/authentikasi/login");
      }

      if (response.data.code == 201) {
        router.push("/address-list");
      }
    } catch (err: any) {
      console.log(err);
    }

    console.log(
      "data :",
      name,
      phone,
      province,
      kecamatan,
      address.postcode,
      town,
      //   selectedProvince,
      //   selectedCity,
      //   selectedDistrict,
      //   selectedDesa,
      //   selectedPostalCode,
      instructions
    );

    // const formData = {
    //   name,
    //   phone,
    //   province: selectedProvince,
    //   city: selectedCity,
    //   district: selectedDistrict,
    //   postalCode: selectedPostalCode,
    //   address,
    //   instructions, // Opsional
    // };

    // Simpan data ke localStorage

    // Redirect ke halaman PinLocation setelah submit berhasil
    // router.push("/pin-location");
    // console.log(formData);
  };

  return (
    <>
      <LayoutUtama>
        <Header title="Alamat Baru" children={undefined} />
        <div className="container w-[400px] mx-auto p-4 mt-20">
          <form
            onSubmit={handleSubmit}
            className="text-[#949494] font-nunito text-[15px] font-medium space-y-4"
          >
            {/* <textarea
              id="address"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={`${address.state}, ${initialTown} ${
                !address.town ? "" : address.town
              }  ${address.postcode} , ${
                !address.village ? "" : address.village
              }   ${!address.road ? "" : address.road} `}
              //   onChange={(e) => {
              //     setAddressAll(e.target.value);
              //   }}
            /> */}
            <input
              type="text"
              placeholder="Nama Lengkap"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-emerald-300"
            />

            <input
              type="text"
              placeholder="Nomor Telepon"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-emerald-300"
            />

            <input
              type="text"
              placeholder="Province"
              value={address?.state == null ? province : address?.state}
              onChange={(e) => setProvince(e.target.value)}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-emerald-300"
            />

            <input
              type="text"
              placeholder="City"
              value={initialTown}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-emerald-300"
            />

            <input
              type="text"
              placeholder="Kecamatan"
              onChange={(e) => setKecamatan(e.target.value)}
              value={address.suburb == null ? kecamatan : address.suburb}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-emerald-300"
            />

            <input
              type="text"
              placeholder="Code pos"
              value={address.postcode}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-emerald-300"
            />

            {/* <select
              value={selectedDesa}
              onChange={(e) => {
                setSelectedDesa(e.target.value);
                setIdDesa(
                  Number(
                    e.target.options[e.target.selectedIndex].getAttribute(
                      "data-text"
                    )
                  )
                );
              }}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-emerald-300"
            >
              <option value="" disabled>
                Pilih Desa
              </option>
              {dataDesa?.map?.((desa: any, index: number) => (
                <option key={index} value={desa.text} data-text={desa.id}>
                  {desa.text}
                </option>
              ))}
            </select> */}

            <input
              type="text"
              placeholder="Nama Jalan, Gedung"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-emerald-300"
            />

            <input
              type="text"
              placeholder="Instruksi Pengiriman/ Blok/ Unit No. (Optional)"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-emerald-300"
            />
          </form>

          {/* <button
            type="submit"
            className={`w-full py-3 rounded-lg bg-buttonGrey text-black mt-[50px]`}
            onClick={() => {
              router.push("/pin-location");
            }}
          >
            Pilih Lokasi
          </button> */}
          {name != "" && phone != "" && instructions != "" ? (
            <button
              type="submit"
              className={`w-full py-3 rounded-lg text-white mt-5 bg-[#51D7B1]
             `}
              // disabled={!isFormValid}
              onClick={handleSubmit} // Menggunakan handleSubmit di sini
            >
              Lanjutkan
            </button>
          ) : (
            <div
              className={`w-full py-3 rounded-lg text-black text-center mt-5 bg-buttonGrey
             `}
              // disabled={!isFormValid}
              // Menggunakan handleSubmit di sini
            >
              Lanjutkan
            </div>
          )}
        </div>
      </LayoutUtama>
    </>
  );
};

export default FormAddress;
