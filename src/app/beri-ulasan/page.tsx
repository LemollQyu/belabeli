"use client";
import { useState } from "react";
import NavBar from "../layouts/_navbar";
import { useRouter } from "next/navigation";
import Star from "../components/modul-ulasan/star";
import FileUpload from "../components/modul-ulasan/file-upload1";
import LayoutUtama from "../layouts/layout-utama";
import BlackScreen from "../components/blackscreen";
import BackNav from "../components/backNavigasi";
import Header from "../layouts/header";
import Link from "next/link";

const BeriUlasan = () => {
  const [review, setReview] = useState<string>("");

  const [ada, setAda] = useState<boolean>(false);

  const [image, setImage] = useState<File | null>(null);
  const [video, setVideo] = useState<File | null>(null);

  const [rating, setRating] = useState<number | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<(File | null)[]>([]);

  const handleRatingChange = (newRating: number | null) => {
    setRating(newRating);
  };

  const handleFilesChange = (files: (File | null)[]) => {
    setUploadedFiles(files);
  };

  const handleSubmit = () => {
    // Process the uploadedFiles here (e.g., send to a server)
    console.log({ uploadedFiles, rating, review });
    setAda(true);
  };

  const handleHilang = () => {
    setAda(false);
  };

  const [showUsername, setShowUsername] = useState<boolean>(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const closeModal = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsModalOpen(false);
    }, 300);
  };

  const [text, setText] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const maxWords = 50;

  const handleChange = (event: { target: { value: string } }) => {
    const inputText = event.target.value;
    const words = inputText
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0);
    const currentWordCount = words.length;

    if (currentWordCount <= maxWords) {
      setText(inputText);
      setWordCount(currentWordCount);
    } else {
      setIsModalOpen(true);
      setIsAnimating(true);
    }
  };

  return (
    <>
      <Header title="Beri Ulasan" children={undefined} />
      <div className="px-4 font-nunito absolute pt-20 items-center h-screen w-[360px] left-1/2 -translate-x-1/2">
        <div className="h-[92px] w-full flex justify-center gap-2 items-center">
          <div className="border">
            <img
              src="image/image.png"
              className="w-[100px] h-auto rounded-md object-cover"
            ></img>
          </div>
          <div>
            <h1 className="font-nunitoBold text-[12px]">
              Sepatu Anak Sekolah SMP Semua Ukuran | Murah dan Berkualitas.
            </h1>
            <p className="text-[10px]">
              <span className="font-nunitoBold">Variasi</span> : Merah
            </p>
            <div className=" w-[250px]">
              <Star onRatingChange={handleRatingChange} />
            </div>
          </div>
        </div>
        <div>
          <div className="border rounded-lg w-auto h-[150px]">
            <textarea
              value={text}
              onChange={handleChange}
              className={`border w-full text-xs h-full p-2 rounded-md`}
              placeholder="Tulis ulasan Anda di sini..."
            ></textarea>
            <p className="text-[10px] text-gray-500 -mt-1">
              {wordCount}/{maxWords} kata
            </p>
          </div>
          <div className="mt-6">
            <FileUpload maxFiles={5} onFilesChange={handleFilesChange} />
          </div>
        </div>

        <div className="fixed bottom-20 left-0 w-full">
          <div className="flex items-center gap-2 mt-4">
            <input
              type="checkbox"
              checked={showUsername}
              onChange={() => setShowUsername(!showUsername)}
              className="h-5 w-5 text-emerald-500 rounded border-gray-300"
            />
            <span className="text-sm text-gray-600">
              Tampilkan Username anda pada halaman ulasan produk
            </span>
          </div>
          <Link href={`/transaksi/riwayat?q=selesai`}>
            <button className="border-2 bg-white border-[#51D7B1] text-sm mb-3 rounded-lg fixed bottom-0 left-0 w-full p-3 text-[#51D7B1] text-center font-semibold">
              Kirim Ulasan
            </button>
          </Link>
        </div>
      </div>

      {/* pop up berhasil terkirim*/}
      {ada && <BlackScreen />}

      {ada ? (
        <div
          onClick={handleHilang}
          className="w-[310px] h-[219px] rounded-xl bg-white flex justify-center p-[17px] flex-col items-center gap-2 absolute left-1/2 -translate-x-1/2 top-1/2  border"
        >
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
          <h1 className="font-nunitoBold text-[24px] text-center">
            Ulasan Berhasil Dikirim
          </h1>
          <p className="text-center font-nunitoBold text-[10px]">
            Terimakasih ulasan yang anda kirimkan sangat membantu penjual
          </p>
        </div>
      ) : null}

      {isModalOpen && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
          <div
            id="modal"
            className="font-nunito fixed inset-y-1/2 flex justify-center items-center z-[100] w-[360px] left-1/2 -translate-x-1/2 shadow-lg"
          >
            <div
              className={`bg-white w-full max-w-lg rounded-xl p-6 absolute bottom-0 inset-y-auto ${
                isAnimating ? "translate-y-0" : "translate-y-full"
              }`}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold font-nunito">Perhatian</h2>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </button>
              </div>

              <div className="flex items-center mb-6 gap-5">
                <p>Anda telah mencapai maksimum kata penginputan</p>
              </div>

              <div className="flex flex-row gap-3 mt-6">
                <button
                  onClick={closeModal}
                  className="w-full bg-[#EE443F] text-white font-bold py-3 rounded-lg"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default BeriUlasan;
