"use client";
import { useState } from "react";
import Header from "@/app/layouts/header"; // Assuming you have this component
import LayoutUtama from "@/app/layouts/layout-utama";

const PengikutToko = () => {
  // Dummy data for followers
  const [followers, setFollowers] = useState([
    { id: 1, name: "Annas Aulia" },
    { id: 2, name: "Budi Santoso" },
    { id: 3, name: "Citra Dewi" },
    { id: 4, name: "Dina Anggraeni" },
    { id: 5, name: "Eko Prasetyo" },
    { id: 6, name: "Fauzi Amrullah" },
    { id: 7, name: "Gita Putri" },
    { id: 8, name: "Hendrik Wijaya" },
    { id: 9, name: "Indra Nugroho" },
    { id: 10, name: "Joko Susanto" },
    { id: 11, name: "Kartika Rahayu" },
    { id: 12, name: "Lilis Setiawati" },
    { id: 13, name: "Mawar Dwi" },
    { id: 14, name: "Nanda Putri" },
    { id: 15, name: "Oki Priyanto" },
    { id: 16, name: "Pipit Ningsih" },
    { id: 17, name: "Qisya Siti" },
    { id: 18, name: "Rina Dewi" },
    { id: 19, name: "Siti Hajar" },
    { id: 20, name: "Taufik Hidayat" },
    { id: 21, name: "Umar Sulaiman" },
    { id: 22, name: "Vina Septiani" },
    { id: 23, name: "Wira Prasetya" },
    { id: 24, name: "Xenia Rahmadani" },
    { id: 25, name: "Yusuf Nurdiansyah" },
    { id: 26, name: "Zulfa Maulidya" },
  ]);

  const [showPopup, setShowPopup] = useState(false);
  const [selectedFollower, setSelectedFollower] = useState<number | null>(null);

  const handleDeleteClick = (id: number) => {
    setSelectedFollower(id);
    setShowPopup(true);
  };

  const handleConfirmDelete = () => {
    if (selectedFollower !== null) {
      // Remove the follower from the list
      setFollowers(followers.filter((f) => f.id !== selectedFollower));
      alert(`Pengikut dengan id ${selectedFollower} telah dihapus!`);
    }
    setShowPopup(false);
  };

  const handleCancelDelete = () => {
    setShowPopup(false);
  };

  return (
    <LayoutUtama>
      <Header title="Pengikut Toko" children={undefined} />
      <div className="container w-[400px] p-4 pt-24 font-nunito">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-l font-semibold">Jumlah Pengikut</h2>
          <p className="text-sm text-gray-600">({followers.length} Pengikut)</p>
        </div>

        <div className="mt-4 space-y-2">
          {followers.map((follower) => (
            <div
              key={follower.id}
              className="flex items-center justify-between p-3 border-b"
            >
              <div className="flex items-center">
                <div className="w-[40px] h-[40px] rounded-full bg-teal-300 flex items-center justify-center text-white">
                  {follower.name[0]}
                </div>
                <span className="ml-3 font-semibold text-[14px]">
                  {follower.name}
                </span>
              </div>
              <button
                onClick={() => handleDeleteClick(follower.id)}
                className="text-gray-500 hover:text-red-500"
              >
                <svg
                  width="29"
                  height="30"
                  viewBox="0 0 29 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_6848_28069)">
                    <path
                      d="M20.748 20.8926C17.4936 24.1469 12.2172 24.1469 8.96287 20.8926C5.7085 17.6382 5.7085 12.3618 8.96287 9.10744C12.2172 5.8531 17.4936 5.85307 20.748 9.10744C24.0023 12.3618 24.0023 17.6382 20.748 20.8926ZM13.6769 15L14.8554 16.1785L17.2124 18.5355L11.3199 12.643L13.6769 15Z"
                      fill="#FDFDFD"
                    />
                    <path
                      d="M20.748 20.8926C17.4936 24.1469 12.2172 24.1469 8.96287 20.8926C5.7085 17.6382 5.7085 12.3618 8.96287 9.10744C12.2172 5.8531 17.4936 5.85307 20.748 9.10744C24.0023 12.3618 24.0023 17.6382 20.748 20.8926ZM13.6769 15L11.3199 17.357L12.4984 18.5355L14.8554 16.1785L17.2124 18.5355L18.391 17.357L16.0339 15L18.391 12.643L17.2124 11.4645L14.8554 13.8215L12.4984 11.4645L11.3199 12.643L13.6769 15Z"
                      fill="#7F7F7F"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_6848_28069">
                      <rect
                        width="20"
                        height="20"
                        fill="white"
                        transform="translate(0.714844 15) rotate(-45)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Popup Konfirmasi Penghapusan */}
      {showPopup && (
        <div
          className="fixed inset-0 z-50 flex justify-center items-end"
          onClick={handleCancelDelete}
        >
          <div
            className="bg-white p-4 h-[250px] rounded-t-[24px] w-full max-w-md shadow-lg z-30 animate-slide-up font-nunito relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Popup */}
            <div className="flex justify-between items-center px-4 py-2 mb-4">
              <h3 className="text-[16px] font-bold">Konfirmasi Persetujuan</h3>
              <button className="text-gray-500" onClick={handleCancelDelete}>
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

            <div className="border-b border-[#D3D3D3] mb-4"></div>

            {/* Pesan Konfirmasi */}
            <p className="text-center text-gray-700 mb-6">
              Anda yakin akan menghapus{" "}
              <span className="font-semibold">
                {followers.find((f) => f.id === selectedFollower)?.name}
              </span>{" "}
              dari pengikut Anda? Pengikut tidak lagi dapat melihat toko Anda
              setelah dihapus.
            </p>

            {/* Tombol Konfirmasi */}
            <div className="flex justify-between w-full px-2">
              <button
                onClick={handleCancelDelete}
                className="w-[180px] py-2 text-gray-700 border border-teal-300 rounded-md hover:bg-teal-100"
              >
                Batal
              </button>
              <button
                onClick={handleConfirmDelete}
                className="w-[180px] py-2 bg-[#51D7B1] text-white rounded-md hover:bg-teal-600"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </LayoutUtama>
  );
};

export default PengikutToko;
