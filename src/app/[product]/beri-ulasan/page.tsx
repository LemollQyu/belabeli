"use client";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import LayoutUtama from "@/app/layouts/layout-utama";
import BlackScreen from "@/app/components/blackscreen";
import Header from "@/app/layouts/header";
import { useParams } from "next/navigation";
import getDetailProduct from "@/api/detailProduct";
import sentUlasan from "@/api/ulasan/sentUlasan";
import variasiOrderProduct from "@/api/ulasan/getVariasi";
import Loading from "@/app/components/loading";

// Komponen StarRating
interface StarRatingProps {
  onRatingChange: (newRating: number | null) => void;
  initialRating?: number;
}

const StarRating: React.FC<StarRatingProps> = ({
  onRatingChange,
  initialRating = 0,
}) => {
  const [rating, setRating] = useState<number>(initialRating);

  const handleRatingClick = (newRating: number) => {
    setRating(newRating);
    onRatingChange(newRating);
  };

  return (
    <div className="flex gap-1 text-yellow-400 text-lg">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => handleRatingClick(star)}
          className={`cursor-pointer ${
            star <= rating ? "text-yellow-500" : "text-gray-300"
          }`}
        >
          ★
        </span>
      ))}
    </div>
  );
};

// Komponen FileUpload dengan fitur pembatalan unggahan
interface FileUploadProps {
  maxFiles: number;
  onFilesChange: (files: (File | null)[]) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ maxFiles, onFilesChange }) => {
  const [uploadedFiles, setUploadedFiles] = useState<(File | null)[]>(
    Array(maxFiles).fill(null)
  );
  const [showSizePopup, setShowSizePopup] = useState<boolean>(false); // State untuk menampilkan popup ukuran file

  // console.log(productId);
  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = event.target.files?.[0] || null;

    if (file && file.size > 2 * 1024 * 1024) {
      // Cek ukuran file > 2MB
      setShowSizePopup(true);
      return;
    }

    const updatedFiles = [...uploadedFiles];
    updatedFiles[index] = file;
    setUploadedFiles(updatedFiles);
    onFilesChange(updatedFiles);
  };

  const handleCancelUpload = (index: number) => {
    const updatedFiles = [...uploadedFiles];
    updatedFiles[index] = null;
    setUploadedFiles(updatedFiles);
    onFilesChange(updatedFiles);
  };

  return (
    <>
      <div className="flex gap-2">
        {uploadedFiles.map((file, index) => (
          <div
            key={index}
            className="relative w-[65px] h-[65px] border rounded-lg bg-gray-200 flex items-center justify-center"
          >
            {file ? (
              <div className="relative w-full h-full">
                <img
                  src={URL.createObjectURL(file)}
                  alt="preview"
                  className="w-full h-full object-cover rounded-lg"
                />
                <button
                  onClick={() => handleCancelUpload(index)}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs"
                >
                  ✕
                </button>
              </div>
            ) : (
              <label className="flex items-center justify-center w-full h-full cursor-pointer">
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => handleFileChange(e, index)}
                />
                <span className="text-gray-500 text-lg">+</span>
              </label>
            )}
          </div>
        ))}
      </div>

      {/* Popup jika ukuran file lebih dari 2 MB */}
      {showSizePopup && (
        <div className="fixed inset-0 flex items-end justify-center z-50 font-nunito">
          {/* Background yang menggelap */}
          <div
            className="fixed inset-0 bg-black opacity-50 z-40"
            onClick={() => setShowSizePopup(false)}
          ></div>

          {/* Konten Popup */}
          <div className="bg-white p-6 h-[328px] rounded-t-[24px] w-full max-w-md shadow-lg z-50 animate-slide-up font-nunito relative">
            {/* Pesan Popup */}
            <div className="mt-4 border rounded-lg p-4 mb-6 text-center">
              {/* Ikon dan Teks */}
              <div className="flex items-center justify-center space-x-2 mb-2">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-black"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="black"
                    strokeWidth="2"
                  />
                  <path
                    d="M12 8v4M12 16h.01"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-[16px] font-semibold text-black">
                  Gambar terlalu besar
                </span>
              </div>

              {/* Garis Pembatas */}
              <div className="border-t border-gray-300 my-2"></div>

              {/* Detail Batas Ukuran */}
              <p className="text-[14px] text-black">
                Maksimal Gambar / Video 2 MB
              </p>
            </div>

            {/* Tombol Aksi */}
            <div className="mt-[110px]">
              <button
                onClick={() => setShowSizePopup(false)}
                className="w-full py-3 bg-[#51D7B1] text-white text-[16px] font-bold rounded-lg"
              >
                Pilih Ulang
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// Komponen Utama EditUlasan
const EditUlasan: React.FC = () => {
  const router = useRouter();
  const [review, setReview] = useState<string>("");
  const [charCount, setCharCount] = useState<number>(0);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [rating, setRating] = useState<number>(4); // Initial rating
  const [uploadedFiles, setUploadedFiles] = useState<(File | null)[]>([]); // Initial files
  const [showUsername, setShowUsername] = useState<boolean>(true); // Checkbox state

  const params = useParams();
  const productSlug = params.product;

  const pathname = usePathname(); // Mendapatkan path URL

  // Ambil segmen kedua dari pathname
  const segments = pathname.split("/"); // Memisahkan segmen berdasarkan '/'
  const product = segments[1]; // Segmen kedua adalah "product112"

  console.log(product);

  const handleRatingChange = (newRating: number | null) => {
    setRating(newRating || 0);
  };

  const handleFilesChange = (files: (File | null)[]) => {
    setUploadedFiles(files);
  };

  const handleReviewChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const input = e.target.value;
    if (input.length <= 150) {
      setReview(input);
      setCharCount(input.length);
    }
  };

  const handleSubmit = async () => {
    console.log({ uploadedFiles, rating, review, showUsername });
    const formData = new FormData();

    uploadedFiles.forEach((file, index) => {
      if (file) {
        formData.append(`media${index + 1}`, file);
        console.log("for file: ", file);
      }
    });
    formData.append(
      "productSlug",
      Array.isArray(productSlug) ? productSlug[0] : productSlug || ""
    );
    formData.append("ulasan", review);
    formData.append("rating", rating.toString());

    const dataVariation = [8, 5];
    dataVariation.forEach((e) => {
      formData.append("variation_items_id[]", e.toString());
    });

    console.log(uploadedFiles);
    console.log(formData.get("media1"));
    console.log(formData.get("media2"));
    console.log(formData.get("media3"));

    // setShowPopup(true);

    try {
      const response = await sentUlasan(formData);

      console.log(response);
      if (response.error?.code == 401) {
        router.push("/authentikasi/login");
      }

      if (response.data?.code == 201) {
        router.push(`/modul-ulasan?product=${product}`);
      }

      if (response.error) {
        console.log("messageErrpr", response.error.message);
      }
    } catch (error: any) {
      console.log(error?.response || error.message);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  // data detail product

  const [dataDetailProduct, setDataDetailProduct] = useState<any>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [galleryUrl, setGalleryUrl] = useState<string>("");

  useEffect(() => {
    async function fetchData() {
      const dataDetailProduct = await getDetailProduct({
        productSlug: productSlug,
      });

      setDataDetailProduct(dataDetailProduct.data);
      setGalleryUrl(dataDetailProduct.data.gallery_product[0].gallery_url);
    }

    fetchData();
  }, []);

  console.log(dataDetailProduct);

  const searchParams = useSearchParams();
  const orderId = Number(searchParams.get("orderId"));
  const [dataOrderProduct, setDataOrderProduct] = useState<any>(null);

  console.log(orderId, typeof orderId);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const response = await variasiOrderProduct({ orderItemId: orderId });

      // console.log(response);
      setDataOrderProduct(response?.data?.data);
      setIsLoading(false);
    }

    fetchData();
  }, []);

  console.log("data order product yang mau di ulas = ", dataOrderProduct);

  return (
    <LayoutUtama>
      <Header title="Beri Ulasan" children={undefined} />
      <div className="container mx-auto p-4 font-nunito mt-20">
        <div className="border-b pb-4 mb-6 flex items-center gap-4">
          {isLoading ? (
            <div className="w-[64px] h-[64px] rounded-md flex justify-center items-center border bg-gray-100">
              {" "}
              <Loading />{" "}
            </div>
          ) : (
            <div className="w-[64px] h-[64px] rounded-md border bg-gray-100">
              <img
                src={dataOrderProduct?.product.image_product.gallery_url}
                alt="Product"
                className="object-cover rounded-md w-full h-full"
              />
            </div>
          )}
          <div>
            <h1 className="font-nunitoBold text-[15px]">
              {dataOrderProduct?.product.name}
            </h1>
            <p className="text-xs text-gray-600">
              <span className="font-nunitoBold text-[14px]">Variasi</span>:
              {dataOrderProduct?.product_stock.variation_item_1.name},{" "}
              {dataOrderProduct?.product_stock.variation_item_2.name}
            </p>
            <StarRating
              onRatingChange={handleRatingChange}
              initialRating={rating}
            />
          </div>
        </div>

        <div className="px-2 space-y-4">
          <textarea
            value={review}
            onChange={handleReviewChange}
            className="border w-full h-[150px] p-3 rounded-lg resize-none focus:outline-none"
            placeholder="Ketik minimal 50 kata..."
          ></textarea>
          <p className="text-sm text-gray-600">{charCount}/150 karakter</p>

          <FileUpload maxFiles={5} onFilesChange={handleFilesChange} />

          <p className="text-xs text-red-500 mt-1">* Maksimal 2 MB</p>

          {/* <div className="flex items-center gap-2 mt-4">
            <input
              type="checkbox"
              checked={showUsername}
              onChange={() => setShowUsername(!showUsername)}
              className="h-5 w-5 text-emerald-500 rounded border-gray-300"
            />
            <span className="text-sm text-gray-600">
              Tampilkan Username anda pada halaman ulasan produk
            </span>
          </div> */}

          <button
            className="bg-[#51D7B1] text-sm font-nunitoBold text-white w-full h-12 rounded-lg mt-4"
            onClick={handleSubmit}
          >
            Kirim Ulasan
          </button>
        </div>

        {showPopup && <BlackScreen />}
        {showPopup && (
          <div
            onClick={closePopup}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="w-[310px] h-[219px] rounded-xl bg-white flex flex-col items-center justify-center gap-2 shadow-lg p-5 border">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="85"
                height="84"
                viewBox="0 0 85 84"
                fill="none"
              >
                <path
                  d="M42.5002 83.6667C19.4883 83.6667 0.833496 65.0117 0.833496 42C0.833496 18.9882 19.4883 0.333374 42.5002 0.333374C65.5118 0.333374 84.1668 18.9882 84.1668 42C84.1668 65.0117 65.5118 83.6667 42.5002 83.6667ZM38.3443 58.6667L67.8072 29.2039L61.9147 23.3114L38.3443 46.8817L26.5594 35.0963L20.6668 40.9892L38.3443 58.6667Z"
                  fill="url(#paint0_linear_5431_5061)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_5431_5061"
                    x1="0.833496"
                    y1="42"
                    x2="84.1668"
                    y2="42"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#83E69B" />
                    <stop offset="1" stopColor="#00BAE1" />
                  </linearGradient>
                </defs>
              </svg>
              <h1 className="font-nunitoBold text-lg text-center">
                Ulasan Berhasil Dikirim
              </h1>
              <p className="text-center font-nunito text-xs">
                Terimakasih ulasan yang anda kirimkan sangat membantu penjual
              </p>
            </div>
          </div>
        )}
      </div>
    </LayoutUtama>
  );
};

export default EditUlasan;
