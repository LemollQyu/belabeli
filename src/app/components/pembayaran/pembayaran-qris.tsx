import kirimBuktiPembayaran from "@/api/pembayaran/postKirimBuktiPembayaran";
import { useEffect, useState } from "react";
import Loading from "../loading";
const PaymentSectionQris = ({
  totalHarga,
  dataPayment,
  merchant,
  uploadBerhasil,
}: any) => {
  const [image, setImage] = useState<string | null>(null);
  const [isImageUploaded, setIsImageUploaded] = useState<boolean>(false);
  const [fileBuktiPembayaran, setFileBuktiPembayaran] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<any>({});

  // console.log("data merchants telah masuk = ", merchant);

  const [timeLeft, setTimeLeft] = useState<number>(0);

  useEffect(() => {
    const endDate = new Date(dataPayment?.end).getTime();
    const now = new Date().getTime();
    const difference = endDate - now;

    // Mengatur waktu awal timer dalam detik
    if (difference > 0) {
      setTimeLeft(Math.floor(difference / 1000)); // Mengubah milidetik ke detik
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer); // Hentikan timer jika sudah selesai
          return 0;
        }
        return prev - 1; // Mengurangi waktu sebanyak 1 detik
      });
    }, 1000);

    return () => clearInterval(timer); // Membersihkan interval jika komponen di-unmount
  }, [dataPayment?.end]);

  const formatTime = (time: number) => time.toString().padStart(2, "0");

  const formattedHours = formatTime(Math.floor(timeLeft / 3600));
  const formattedMinutes = formatTime(Math.floor((timeLeft % 3600) / 60));
  const formattedSeconds = formatTime(timeLeft % 60);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setFileBuktiPembayaran(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setIsImageUploaded(true); // Gambar berhasil diupload
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    if (image) {
      // Membuat jendela baru
      const newWindow = window.open("", "_blank");

      // Menulis HTML ke jendela baru
      newWindow?.document.write(`
        <html>
          <head>
            <title>Preview Gambar</title>
            <style>
              body { margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; height: 100vh; background-color: #f4f4f4; }
              img { max-width: 100%; max-height: 100vh; object-fit: contain; }
            </style>
          </head>
          <body>
            <img src="${image}" alt="Payment Proof"/>
          </body>
        </html>
      `);
      newWindow?.document.close();
    }
  };

  // console.log(" data telah berada di payment qris  = ", dataPayment);

  const handleSubmit = async () => {
    setLoading(true);
    if (!fileBuktiPembayaran) {
      console.error("File bukti pembayaran belum dipilih.");
      return;
    }

    const formData = new FormData();

    formData.append("upload_bukti_pembayaran", fileBuktiPembayaran);

    console.log("FormData contents:");
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }
    console.log("dataId = ", dataPayment?.id);

    const response = await kirimBuktiPembayaran({
      orderPaymentId: dataPayment?.id,
      formData,
    });

    console.log(response);
    if (response?.error?.code == 400) {
      setErrorMessage(response);
    }

    setLoading(false);

    if (response.error) {
      console.error("Gagal mengirim bukti pembayaran:", response.error);
    } else {
      console.log("Bukti pembayaran berhasil dikirim:", response.data);
      uploadBerhasil(response?.data);
      setLoading(false);
    }
  };

  // console.log("data yang dimasukan error = ", errorMessage);

  return (
    <>
      <div className="px-4">
        <div className="rounded-[12px] border w-full mx-auto space-y-6 py-4 border-gray-200 bg-[#FDFDFD] shadow-[0_0_4px_rgba(0,0,0,0.25)]">
          <div className="text-sm font-nunito font-semibold px-4 py-1 border-gray-300">
            <div className="flex items-center space-x-2">
              {/* Timer Section */}
              <div className="px-4 mx-auto ">
                <div className="rounded-[12px] border w-full mx-auto space-y-4 py-2 px-5 border-gray-200 bg-[#FDFDFD] shadow-[0_0_4px_rgba(0,0,0,0.25)]">
                  <div className="text-sm font-nunito font-semibold px-2 py-1 border-gray-300">
                    <div className="flex items-center space-x-2">
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9 16.5C4.85786 16.5 1.5 13.1421 1.5 9C1.5 4.85786 4.85786 1.5 9 1.5C13.1421 1.5 16.5 4.85786 16.5 9C16.5 13.1421 13.1421 16.5 9 16.5ZM9 15C12.3137 15 15 12.3137 15 9C15 5.68629 12.3137 3 9 3C5.68629 3 3 5.68629 3 9C3 12.3137 5.68629 15 9 15ZM9.75 9H12.75V10.5H8.25V5.25H9.75V9Z"
                          fill="#878787"
                        />
                      </svg>
                      <span className="items-center text-gray-500 text-[10px]">
                        Lakukan pembayaran dalam
                      </span>

                      {/* Timer Section */}
                      <div className="flex items-center flex-grow justify-end min-w-0 gap-1">
                        <div className="w-5 h-5 bg-[#ee443f] rounded flex justify-center items-center">
                          <div className="text-white text-[10px] font-semibold leading-[15px]">
                            {formattedHours}
                          </div>
                        </div>
                        <div className="w-0.5 h-1.5 relative">
                          <div className="w-0.5 h-0.5 left-0 top-0 absolute bg-[#ee443f] rounded-[14px]" />
                          <div className="w-0.5 h-0.5 left-0 top-[4px] absolute bg-[#ee443f] rounded-[14px]" />
                        </div>
                        <div className="w-5 h-5 bg-[#ee443f] rounded flex justify-center items-center">
                          <div className="text-white text-[10px] font-semibold leading-[15px]">
                            {formattedMinutes}
                          </div>
                        </div>
                        <div className="w-0.5 h-1.5 relative">
                          <div className="w-0.5 h-0.5 left-0 top-0 absolute bg-[#ee443f] rounded-[14px]" />
                          <div className="w-0.5 h-0.5 left-0 top-[4px] absolute bg-[#ee443f] rounded-[14px]" />
                        </div>
                        <div className="w-5 h-5 bg-[#ee443f] rounded flex justify-center items-center">
                          <div className="text-white text-[10px] font-semibold leading-[15px]">
                            {formattedSeconds}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-100 p-4 rounded-lg space-y-4 mt-4">
              <div className="flex justify-between items-center">
                <span className="text-[12px] font-nunito text-black">QRIS</span>
              </div>
              <div
                className="-pb-[1px]"
                style={{ borderBottom: "2px solid var(--putih-60, #D3D3D3)" }}
              ></div>

              <div className="flex justify-center mx-auto w-[250px] h-[250px] border border-[#878787] rounded-lg text-[14px] font-semibold p-6">
                <img
                  src={`${process.env.NEXT_PUBLIC_BASE_API_URL_2}/storage/${merchant?.merchant_qris.qris_image_url}`}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="flex justify-between items-center mt-4">
              <span className="text-sm text-gray-500">Total Pembayaran</span>
            </div>
            <div className="flex justify-center p-2">
              <span className="text-2xl font-bold text-gray-900">
                Rp {totalHarga}
              </span>
            </div>
            <div className="bg-red-100 p-3 text-red-500 text-sm rounded-[12px]">
              <div className="flex items-start space-x-4">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.99984 18.3332C5.39746 18.3332 1.6665 14.6022 1.6665 9.99984C1.6665 5.39746 5.39746 1.6665 9.99984 1.6665C14.6022 1.6665 18.3332 5.39746 18.3332 9.99984C18.3332 14.6022 14.6022 18.3332 9.99984 18.3332ZM9.1665 12.4998V14.1665H10.8332V12.4998H9.1665ZM9.1665 5.83317V10.8332H10.8332V5.83317H9.1665Z"
                    fill="#EE443F"
                  />
                </svg>
                <span className="ml-2">
                  Pembayaran akan gagal apabila melebihi batas waktu
                </span>
              </div>
            </div>

            {/* Payment Proof Section */}
            <div className="mt-4">
              <label className="block text-sm text-gray-700 font-semibold mb-2">
                Lampirkan Bukti Pembayaran
              </label>
              <div className="relative w-full h-64 bg-gray-200 rounded-lg">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                {image ? (
                  <div className="w-full h-full flex items-center justify-center relative">
                    <img
                      src={image}
                      alt="Payment Proof"
                      className="object-contain w-full h-full max-w-[90vw] max-h-[90vh] cursor-pointer"
                      onClick={handleImageClick} // Gambar bisa diklik untuk melihat gambar lebih besar
                    />
                    <button
                      onClick={() => setImage(null)}
                      className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-lg"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14.707 5.293a1 1 0 0 1 0 1.414L10.414 10l4.293 4.293a1 1 0 1 1-1.414 1.414L9 11.414l-4.293 4.293a1 1 0 1 1-1.414-1.414L7.586 10 3.293 5.707a1 1 0 0 1 1.414-1.414L9 8.586l4.293-4.293a1 1 0 0 1 1.414 0z"
                          fill="#D3D3D3"
                        />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <div className="flex justify-center items-center w-full h-full text-gray-500 text-sm">
                    <span>Drag & drop or click to upload</span>
                  </div>
                )}
                {errorMessage?.error?.code == 400 && (
                  <p className="text-[10px] text-red-500 font-nunitoLight">
                    File terlalu besar |{" "}
                    {errorMessage?.error?.error.upload_bukti_pembayaran[0]}
                  </p>
                )}
              </div>

              {/* Tombol Kirim Bukti Pembayaran */}
              <div className="flex justify-center mt-6">
                {loading ? (
                  <div
                    className={`bg-green-500 w-[200px] flex items-center justify-center text-white font-semibold py-2 px-6 rounded-lg shadow-md 
                      `}
                  >
                    <Loading />
                  </div>
                ) : (
                  <button
                    onClick={handleSubmit}
                    className={`bg-green-500 text-white font-semibold py-2 px-6 rounded-lg shadow-md ${
                      !isImageUploaded ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={!isImageUploaded}
                  >
                    Kirim Bukti Pembayaran
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentSectionQris;
