"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LayoutUtama from "../layouts/layout-utama";
import Header from "../layouts/header";
import postAddress from "@/api/address/postAddress";
import axios from "axios";
import Loading from "../components/loading";

const FormAddress = () => {
  const [selectedProvince, setSelectedProvince] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [selectedDesa, setSelectedDesa] = useState<string>("");
  const [selectedPostalCode, setSelectedPostalCode] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [instructions, setInstructions] = useState<string>("");

  const [dataProvince, setDataProvince] = useState<any>({});
  const [idProvince, setIdProvince] = useState<number | null>(null);
  const [loadingProvince, setLoadingProvince] = useState<boolean>(false);

  const [dataKota, setDataKota] = useState<any>({});
  const [idKota, setIdKota] = useState<number | null>(null);

  const [dataDistrict, setDataDistrict] = useState<any>({});
  const [idDistrict, setIdDistrict] = useState<number | null>(null);

  const [dataDesa, setDataDesa] = useState<any>({});
  const [idDesa, setIdDesa] = useState<number | null>(null);

  const [dataKodePos, setDataKodePos] = useState<any>({});

  console.log(selectedProvince);
  console.log(selectedCity);
  console.log(selectedDistrict);
  console.log(selectedDesa);
  console.log(selectedPostalCode);

  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      setLoadingProvince(true);
      const response = await axios.get(
        "https://alamat.thecloudalert.com/api/provinsi/get/"
      );
      // console.log("Data Provinsi:", response.data);
      setDataProvince(response.data.result);
      setLoadingProvince(false);
    }

    fetchData();
  }, []);

  console.log(dataProvince);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        `https://alamat.thecloudalert.com/api/kabkota/get/?d_provinsi_id=${idProvince}`
      );
      // console.log("Data Kota:", response.data);
      if (idProvince == null) {
        setDataKota(null);
      } else {
        setDataKota(response.data.result);
      }
    }

    fetchData();
  }, [idProvince]);

  console.log(dataKota);

  // `https://alamat.thecloudalert.com/api/kecamatan/get/?d_kabkota_id=${idKota}`

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        `https://alamat.thecloudalert.com/api/kecamatan/get/?d_kabkota_id=${idKota}`
      );
      // console.log("Data District:", response.data);
      if (idKota == null) {
        setDataDistrict(null);
      } else {
        setDataDistrict(response.data.result);
      }
    }

    fetchData();
  }, [idKota]);

  console.log("data district", dataDistrict);

  // useEffect(() => {
  //   async function fetchData() {
  //     const response = await axios.get(
  //       `https://alamat.thecloudalert.com/api/kelurahan/get/?d_kecamatan_id=${idDistrict}`
  //     );
  //     // console.log("Data District:", response.data);
  //     if (idDistrict == null) {
  //       setDataDesa(null);
  //     } else {
  //       setDataDesa(response.data.result);
  //     }
  //   }

  //   fetchData();
  // }, [idDistrict]);

  // console.log("data desa = ", dataDesa);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        ` https://alamat.thecloudalert.com/api/kodepos/get/?d_kabkota_id=${idKota}&d_kecamatan_id=${idDistrict}`
      );
      // console.log("Data District:", response.data);
      if (idDistrict == null && idKota == null) {
        setDataKodePos(null);
      } else {
        setDataKodePos(response.data.result);
      }
    }

    fetchData();
  }, [idDistrict, idKota]);

  console.log("code pos = ", dataKodePos);

  // https://alamat.thecloudalert.com/api/kelurahan/get/?d_kecamatan_id=1

  // Validasi form harus terisi semua kecuali instruksi yang opsional
  const isFormValid =
    name &&
    phone &&
    selectedProvince &&
    selectedCity &&
    selectedDistrict &&
    selectedPostalCode &&
    address;

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

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    // Cek apakah semua field yang wajib terisi
    if (!isFormValid) {
      alert("Harap isi semua field yang diperlukan.");
      return;
    }

    try {
      const response = await postAddress({
        nama_lengkap: name,
        nomor_telepon: phone,
        provinsi: selectedProvince,
        kota: selectedCity,
        kecamatan: selectedDistrict,
        kode_pos: selectedPostalCode,
        nama_jalan: address,
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
      "data nama :",
      name,
      phone,
      selectedProvince,
      selectedCity,
      selectedDistrict,
      selectedDesa,
      selectedPostalCode,
      address,
      instructions
    );

    const formData = {
      name,
      phone,
      province: selectedProvince,
      city: selectedCity,
      district: selectedDistrict,
      postalCode: selectedPostalCode,
      address,
      instructions, // Opsional
    };

    // Simpan data ke localStorage
    localStorage.setItem("addressData", JSON.stringify(formData));

    // Redirect ke halaman PinLocation setelah submit berhasil
    // router.push("/pin-location");
    console.log(formData);
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
            <input
              type="text"
              placeholder="Nama Lengkap"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-emerald-300"
            />

            <input
              type="tel"
              placeholder="Nomor Telepon"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-emerald-300"
            />

            <select
              value={selectedProvince}
              onChange={(e) => {
                setSelectedProvince(e.target.value);
                setIdProvince(
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
                Pilih Provinsi
              </option>
              {loadingProvince ? (
                <Loading />
              ) : (
                dataProvince?.map?.((province: any, index: number) => (
                  <option
                    key={index}
                    value={province.text}
                    data-text={province.id}
                  >
                    {province.text}
                  </option>
                ))
              )}
            </select>

            <select
              value={selectedCity}
              onChange={(e) => {
                setSelectedCity(e.target.value);
                setIdKota(
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
                Pilih Kota
              </option>
              {dataKota?.map?.((city: any, index: number) => (
                <option key={index} value={city.text} data-text={city.id}>
                  {city.text}
                </option>
              ))}
            </select>

            <select
              value={selectedDistrict}
              onChange={(e) => {
                setSelectedDistrict(e.target.value);
                setIdDistrict(
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
                Pilih Kecamatan
              </option>
              {dataDistrict?.map?.((district: any, index: number) => (
                <option
                  key={index}
                  value={district.text}
                  data-text={district.id}
                >
                  {district.text}
                </option>
              ))}
            </select>

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

            <select
              value={selectedPostalCode}
              onChange={(e) => setSelectedPostalCode(e.target.value)}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-emerald-300"
            >
              <option value="" disabled>
                Pilih Kode Pos
              </option>
              {dataKodePos?.map?.((postalCode: any, index: number) => (
                <option key={index} value={postalCode.text}>
                  {postalCode.text}
                </option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Nama Jalan, Gedung"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
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

          <button
            type="submit"
            className={`w-full py-3 rounded-lg bg-buttonGrey text-black mt-[50px]`}
            onClick={() => {
              router.push("/pin-location");
            }}
          >
            Pilih Lokasi
          </button>

          <button
            type="submit"
            className={`w-full py-3 rounded-lg text-white mt-5 ${
              isFormValid ? "bg-[#51D7B1]" : "bg-gray-300 cursor-not-allowed"
            } `}
            disabled={!isFormValid}
            onClick={handleSubmit} // Menggunakan handleSubmit di sini
          >
            Lanjutkan
          </button>
        </div>
      </LayoutUtama>
    </>
  );
};

export default FormAddress;
