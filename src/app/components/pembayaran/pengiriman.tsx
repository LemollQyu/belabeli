"use client";
import React, { useState } from "react";

interface PengirimanProps {
  chooseDataJasaPengiriman: any;
  onShippingChange: (cost: number, name: string) => void;
  dataPengiriman: any; // Kirim nama juga
}

const Pengiriman: React.FC<PengirimanProps> = ({
  onShippingChange,
  chooseDataJasaPengiriman,
  dataPengiriman,
}) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [selectedOptionPengiriman, setSelectedOptionPengiriman] =
    useState<number>(0);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [selectedPengiriman, setSelectedPengiriman] = useState<any>(null);

  const handleShippingChange = (id: number) => {
    // console.log(id);
    setSelectedOptionPengiriman(id);
    setSelectedOption(id);
    // const selectedShipping = shippingOptions.find((option) => option.id === id);
    // if (selectedShipping) {
    //   onShippingChange(selectedShipping.cost, selectedShipping.name); // Kirim biaya dan nama pengiriman
    // }
  };

  const togglePopup = () => setShowPopup((prev) => !prev);
  console.log("data pengiriman = ", dataPengiriman);

  console.log(selectedPengiriman);

  // if (selectedPengiriman == null) {
  //   console.log("ngga di dipilih");
  // } else {
  //   console.log("dipilih");
  // }

  const handleChoosePengiriman = () => {
    console.log(selectedOptionPengiriman);
    // setSelectedOptionPengiriman(id);
    console.log(dataPengiriman[0].costs[selectedOptionPengiriman]);
    chooseDataJasaPengiriman(dataPengiriman[0].costs[selectedOptionPengiriman]);
    setSelectedPengiriman(dataPengiriman[0].costs[selectedOptionPengiriman]);
  };

  return (
    <>
      <div className="px-4 border-gray-300">
        {/* Label Pengiriman */}
        <label className="block text-[#0F0F0F] font-nunito text-[15px] font-bold mb-2">
          Pengiriman
        </label>
        {/* Border container */}

        {selectedPengiriman != undefined ? (
          <div
            className="bg-white p-3 rounded-lg shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] mt-3"
            onClick={togglePopup} // Add onClick here if you want the entire card to trigger the popup
          >
            <div className="flex flex-col">
              <div className="flex items-center justify-between">
                {/* SVG Icon Truk */}
                <div className="flex gap-2 items-center">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17 8H20L23 12.0557V18H20.9646C20.7219 19.6961 19.2632 21 17.5 21C15.7368 21 14.2781 19.6961 14.0354 18H8.96456C8.72194 19.6961 7.26324 21 5.5 21C3.73676 21 2.27806 19.6961 2.03544 18H1V6C1 5.44772 1.44772 5 2 5H16C16.5523 5 17 5.44772 17 6V8ZM17 10V13H21V12.715L18.9917 10H17Z"
                      fill="#2EC99D"
                    />
                  </svg>

                  <h3
                    className="flex items-center font-nunito font-bold text-[12px] leading-[21px] tracking-[-0.322px]"
                    style={{ color: "var(--warna-utama-60, #2EC99D)" }}
                  >
                    {/* {selectedOption !== null
                    ? shippingOptions.find(
                        (option) => option.id === selectedOption
                      )?.name
                    : "Standar"} */}
                    {selectedPengiriman?.service}
                  </h3>
                  <p className="text-[10px] font-nunito font-bold">
                    ( {selectedPengiriman.description} )
                  </p>
                </div>

                {/* Estimasi Tiba */}
                <div className="ml-4 my-2 flex-grow">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center flex-grow justify-end min-w-0">
                      <svg
                        className="w-4 h-4 flex-shrink-0"
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6 11C3.23857 11 1 8.7614 1 6C1 3.23857 3.23857 1 6 1C8.7614 1 11 3.23857 11 6C11 8.7614 8.7614 11 6 11ZM6 10C8.20915 10 10 8.20915 10 6C10 3.79086 8.20915 2 6 2C3.79086 2 2 3.79086 2 6C2 8.20915 3.79086 10 6 10ZM6.5 6H8.5V7H5.5V3.5H6.5V6Z"
                          fill="#878787"
                        />
                      </svg>
                      <p className="ml-1 text-[#878787] font-nunito text-[10px] whitespace-nowrap">
                        {/* {selectedOption !== null
                        ? shippingOptions.find(
                            (option) => option.id === selectedOption
                          )?.estimation
                        : "Estimasi tiba 25-27 Sep"} */}

                        {selectedPengiriman != null
                          ? `Estimasi Tiba ${selectedPengiriman?.cost?.[0].etd} Hari`
                          : ""}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Harga dan Label Bebas Ongkir */}
              <div className="flex justify-between items-center">
                <div className="flex justify-between items-center">
                  {/* Harga Diskon */}
                  <div
                    style={{
                      color: "#1B1E28",
                      fontSize: 11,
                      fontFamily: "Nunito",
                      fontWeight: 700,
                      lineHeight: "12px",
                      textAlign: "center",
                    }}
                  >
                    {/* {selectedOption !== null
                    ? shippingOptions.find(
                        (option) => option.id === selectedOption
                      )?.cost
                    : "Rp 8000"} */}
                    {selectedPengiriman?.cost?.[0].value}
                  </div>

                  {/* Harga Asli */}
                  <div
                    className="ml-2 flex justify-between items-center"
                    style={{
                      color: "var(--hitam-20, #AFAFAF)",
                      fontSize: 11,
                      fontFamily: "Nunito",
                      fontWeight: 700,
                      lineHeight: "12px",
                      textAlign: "center",
                      textDecoration: "line-through",
                    }}
                  >
                    {/* {selectedOption !== null
                    ? shippingOptions.find(
                        (option) => option.id === selectedOption
                      )?.originalCost
                    : "Rp 17.000"} */}
                  </div>
                </div>

                {/* Tombol Bebas Ongkir dengan Panah */}
                {/* <div
                className="flex items-center ml-32"
                onClick={togglePopup}
                style={{
                  color: "var(--Warna-Kedua-Base, #09CBCA)",
                  textAlign: "center",
                  fontFamily: "Nunito, sans-serif",
                  fontSize: "11px",
                  fontStyle: "italic",
                  fontWeight: 700,
                  lineHeight: "150%",
                  letterSpacing: "-0.276px",
                  borderRadius: "4px",
                  border: "1px solid var(--Warna-Kedua-Base, #09CBCA)",
                  background: "var(--warna-utama-10, #E2F8F2)",
                  padding: "2px",
                  cursor: "pointer",
                }}
              >
                Bebas Ongkir
              </div> */}
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={togglePopup}
                  className="cursor-pointer"
                >
                  <path
                    d="M10.9763 9.99997L6.85156 5.87513L8.03007 4.69663L13.3334 9.99997L8.03007 15.3032L6.85156 14.1247L10.9763 9.99997Z"
                    fill="black"
                  />
                </svg>
              </div>
            </div>
          </div>
        ) : (
          <div
            className="bg-white h-[70px] w-full p-3 border-warnaUtama border cursor-pointer flex justify-center items-center rounded-lg shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] mt-3"
            onClick={togglePopup} // Add onClick here if you want the entire card to trigger the popup
          >
            <p className="text-[16px] text-center font-nunitoBold">
              Pilih Pengiriman
            </p>
          </div>
        )}

        {/* Popup Opsi Pengiriman */}
        {showPopup && (
          <div className="fixed inset-0 flex items-end justify-center z-30">
            {/* Background yang menggelap */}
            <div
              className="fixed inset-0 bg-black opacity-50 z-20"
              onClick={togglePopup}
            ></div>

            {/* Konten Popup */}
            <div className="bg-white p-4 rounded-t-[24px] w-full max-w-md shadow-lg z-30 animate-slide-up font-nunito relative">
              {/* Header Popup dengan tombol Exit dan Judul Sejajar */}
              <div className="flex justify-between items-center px-4 py-2 mb-4">
                {/* Judul Popup */}
                <h3 className="text-[16px] font-bold">Opsi Pengiriman</h3>

                {/* Tombol Exit */}
                <button
                  className="text-gray-500"
                  onClick={() => setShowPopup(false)}
                >
                  <svg
                    width="26"
                    height="26"
                    viewBox="0 0 26 26"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.9998 11.4687L18.362 6.10645L19.8941 7.63851L14.5318 13.0008L19.8941 18.3629L18.362 19.895L12.9998 14.5328L7.63754 19.895L6.10547 18.3629L11.4677 13.0008L6.10547 7.63851L7.63754 6.10645L12.9998 11.4687Z"
                      fill="black"
                    />
                  </svg>
                </button>
              </div>

              <div className="border-b border-[#D3D3D3]"></div>

              {/* Informasi Pengiriman */}
              <div className="font-nunito p-4 text-[14px] text-grey-700">
                PILIH JASA PENGIRIMAN
              </div>
              <div className="px-4 space-y">
                {dataPengiriman?.map?.((jasa: any, index: number) => {
                  console.log("jasa Pengiriman 1 = ", jasa.costs);
                  return (
                    <>
                      {jasa?.costs.map?.((data: any, index: number) => {
                        console.log("data option jasa pengiriman", data);

                        return (
                          <>
                            <div
                              key={index}
                              className={`border p-2 cursor-pointer ${
                                selectedOption === index
                                  ? "border-emerald-500"
                                  : ""
                              }`}
                              onClick={() => {
                                handleShippingChange(index);
                              }}
                            >
                              <div className="flex justify-between items-center">
                                {/* Nama Pengiriman */}
                                <h4 className="font-semibold text-emerald-500">
                                  {data.service}
                                </h4>

                                {/* Biaya Pengiriman */}
                                <div className="text-right">
                                  {/* Harga Asli Dicoret */}
                                  {data.cost !== data.originalCost && (
                                    <span className="font-nunito text-gray-500 text-[13px] mr-1">
                                      {/* <s>Rp {data.originalCost}</s> */}
                                    </span>
                                  )}
                                  <span className="text-emerald-500 font-nunito text-[13px] font-bold">
                                    {data.cost === 0
                                      ? "Gratis"
                                      : `Rp ${data.cost[0].value}`}
                                  </span>
                                </div>
                              </div>

                              {/* Estimasi Pengiriman */}
                              <p className="text-[11px] text-black">
                                Estimasi tiba {data.cost[0].etd} Hari
                              </p>
                            </div>
                          </>
                        );
                      })}
                    </>
                  );
                })}
              </div>

              {/* Button Konfirmasi */}
              <div className="mt-12 px-4">
                <button
                  className="px-4 text-[#0F0F0F] font-nunito text-[16px] font-bold mt-4 w-full py-3 text-white rounded-lg"
                  style={{
                    background: "var(--Warna-Utama, #51D7B1)",
                    borderRadius: "8px",
                  }}
                  onClick={() => {
                    setShowPopup(false);
                    handleChoosePengiriman();
                  }} // Tutup popup saat diklik
                >
                  Konfirmasi
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Pengiriman;
