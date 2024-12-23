"use client";
import reqVariantProduct from "@/api/seller/kelola-produk/postVariant";
import LayoutUtama from "@/app/layouts/layout-utama";
import React, { useState } from "react";

const VariasiInput = () => {
  const [varian, setVarian] = useState([
    {
      nama_variasi: "",
      variasi: [{ variasi_item: "", foto_variasi: null }],
    },
  ]);

  const handleAddVariasiNama = () => {
    if (varian.length < 2) {
      setVarian([
        ...varian,
        {
          nama_variasi: "",
          variasi: [{ variasi_item: "", foto_variasi: null }],
        },
      ]);
    }
  };

  const handleAddVariasiItem = (index) => {
    const updatedVarian = [...varian];
    if (updatedVarian[index].variasi.length < 5) {
      updatedVarian[index].variasi.push({
        variasi_item: "",
        foto_variasi: null,
      });
      setVarian(updatedVarian);
    }
  };

  const handleNamaVariasiChange = (index, value) => {
    const updatedVarian = [...varian];
    updatedVarian[index].nama_variasi = value;
    setVarian(updatedVarian);
  };

  const handleVariasiItemChange = (varianIndex, itemIndex, value) => {
    const updatedVarian = [...varian];
    updatedVarian[varianIndex].variasi[itemIndex].variasi_item = value;
    setVarian(updatedVarian);
  };

  const handleFotoChange = (varianIndex, itemIndex, file) => {
    const updatedVarian = [...varian];
    updatedVarian[varianIndex].variasi[itemIndex].foto_variasi = file;
    setVarian(updatedVarian);
  };

  const handleSimpan = async () => {
    const formData = new FormData();

    varian.forEach((v, varianIndex) => {
      formData.append(
        `varian[${varianIndex}][tampilkan_gambar]`,
        v.variasi.some((item) => item.foto_variasi) ? "1" : "0"
      );
      formData.append(`varian[${varianIndex}][nama_variasi]`, v.nama_variasi);

      v.variasi.forEach((item, itemIndex) => {
        formData.append(
          `varian[${varianIndex}][variasi][${itemIndex}][variasi_item]`,
          item.variasi_item
        );
        if (item.foto_variasi) {
          formData.append(
            `varian[${varianIndex}][variasi][${itemIndex}][foto_variasi]`,
            item.foto_variasi,
            item.foto_variasi.name
          );
        }
      });
    });

    // Debugging output untuk memastikan data sudah benar
    for (const pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    const response = await reqVariantProduct({ formData, productId: 83 });

    console.log(response);
  };

  return (
    <LayoutUtama>
      <div className="border-2 font-nunito border-gray-300 bg-[#F7F7F9] rounded-lg shadow-md p-3">
        {varian.map((v, varianIndex) => (
          <div
            key={varianIndex}
            className="mb-6 bg-white p-4 rounded shadow-md"
          >
            <div className="mb-4 flex flex-row justify-between items-center px-2">
              <label className="text-sm font-medium text-black flex px-1">
                Nama Variasi
              </label>
              <input
                type="text"
                placeholder="Masukkan Nama Variasi"
                className="w-[216px] h-full border rounded-md p-2 border-[#878787] text-sm focus:outline-none"
                value={v.nama_variasi}
                onChange={(e) =>
                  handleNamaVariasiChange(varianIndex, e.target.value)
                }
              />
            </div>
            <div className="mx-auto my-4 border border-[#A9A9A9] w-full"></div>

            <div>
              {v.variasi.map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  className="flex flex-col items-center mb-4"
                >
                  <div className="mb-4 flex  w-full px-2  justify-between items-center ">
                    <label className="text-sm font-medium text-black flex px-1">
                      Variasi Item
                    </label>
                    <input
                      type="text"
                      placeholder="Masukkan Variasi Item"
                      value={item.variasi_item}
                      onChange={(e) =>
                        handleVariasiItemChange(
                          varianIndex,
                          itemIndex,
                          e.target.value
                        )
                      }
                      className="w-[216px] h-full border rounded-md p-2 border-[#878787] text-sm focus:outline-none"
                    />
                  </div>

                  <div className="flex w-full flex-row justify-between items-center px-2 my-2">
                    <label
                      htmlFor="namaProduk"
                      className="text-sm font-semibold text-black flex px-1"
                    >
                      Foto Variasi
                    </label>
                    {/* <div className=" flex justify-end py-2">
                      <button className="w-[150px] text-xs bg-[#51d7b1] text-white py-2 rounded-lg">
                        Ganti Foto
                      </button>
                    </div> */}
                  </div>

                  {item.foto_variasi ? (
                    <img
                      src={URL.createObjectURL(item.foto_variasi)}
                      alt="Foto Variasi"
                      className="h-[300px] w-full border border-gray-300 bg-gray-300 rounded-lg flex justify-center items-center overflow-hidden shadow-md"
                    />
                  ) : (
                    <button
                      onClick={() =>
                        document
                          .getElementById(
                            `file-input-${varianIndex}-${itemIndex}`
                          )
                          .click()
                      }
                      className="h-[300px] w-full border border-gray-300 bg-gray-300 rounded-lg flex justify-center items-center overflow-hidden shadow-md"
                    >
                      <svg
                        width="80"
                        height="80"
                        viewBox="0 0 80 80"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M36.666 36.6665V23.3332H43.3327V36.6665H56.666V43.3332H43.3327V56.6665H36.666V43.3332H23.3327V36.6665H36.666ZM39.9994 73.3332C21.5898 73.3332 6.66602 58.4092 6.66602 39.9998C6.66602 21.5903 21.5898 6.6665 39.9994 6.6665C58.4087 6.6665 73.3327 21.5903 73.3327 39.9998C73.3327 58.4092 58.4087 73.3332 39.9994 73.3332ZM39.9994 66.6665C54.727 66.6665 66.666 54.7275 66.666 39.9998C66.666 25.2722 54.727 13.3332 39.9994 13.3332C25.2717 13.3332 13.3327 25.2722 13.3327 39.9998C13.3327 54.7275 25.2717 66.6665 39.9994 66.6665Z"
                          fill="white"
                        ></path>
                      </svg>
                    </button>
                  )}
                  <input
                    id={`file-input-${varianIndex}-${itemIndex}`}
                    type="file"
                    style={{ display: "none" }}
                    onChange={(e) =>
                      handleFotoChange(
                        varianIndex,
                        itemIndex,
                        e.target.files[0]
                      )
                    }
                  />
                </div>
              ))}
            </div>

            <button
              onClick={() => handleAddVariasiItem(varianIndex)}
              className="w-full py-2 bg-[#51d7b1] text-white rounded hover:bg-[#3fb191]"
            >
              +
            </button>
          </div>
        ))}

        <button
          onClick={handleAddVariasiNama}
          className="w-full py-2 mb-4 bg-[#51d7b1] text-white rounded hover:bg-[#3fb191]"
        >
          Tambah Variasi
        </button>

        <button
          onClick={() => {
            // console.log({ varian });
            handleSimpan();
          }}
          className="w-full py-2 bg-[#51d7b1] text-white rounded hover:bg-[#3fb191]"
        >
          Simpan
        </button>
      </div>
    </LayoutUtama>
  );
};

export default VariasiInput;
