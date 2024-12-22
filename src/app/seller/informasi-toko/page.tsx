"use client";
import React, { useEffect, useState } from "react";
import LayoutUtama from "@/app/layouts/layout-utama";
import Header from "@/app/layouts/header";
import ProfilePhoto from "@/app/components/usersettings/profile";
import { useRouter } from "next/navigation";
import "react-datepicker/dist/react-datepicker.css";
import { Dispatch, SetStateAction } from "react";
import BannerUpload from "@/app/components/usersettings/banner";
// import allVerificationToko from "@/api/seller/verifikasi-seller/getAllVerificationiToko";

// Komponen EditPopup
interface EditPopupProps {
  title: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditPopup: React.FC<EditPopupProps> = ({
  title,
  value,
  setValue,
  setEditing,
}) => {
  const router = useRouter();
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(false); // Tutup popup saat latar belakang atau tombol exit diklik
  };
  const handleConfirm = () => {
    setShowPopup(true); // Tampilkan popup saat tombol "Konfirmasi" diklik

    // Jika title adalah "Edit Email" atau "Edit Nomor Telepon", arahkan ke halaman OTP
    if (title === "Edit Email" || title === "Edit Nomor HP") {
      router.push("informasi-toko/kode-otp");
    } else {
      setEditing(false); // Tutup popup untuk title lainnya
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 50) {
      setValue(e.target.value);
    }
  };

  // useEffect(() => {
  //   async function fetchData() {
  //     const response = await allVerificationToko();

  //     console.log(response);
  //   }

  //   fetchData();
  // }, []);

  return (
    <>
      <div className="fixed inset-0 flex items-end justify-center z-30 font-nunito">
        {/* Background yang menggelap */}
        <div
          className="fixed inset-0 bg-black opacity-50 z-20"
          onClick={() => setEditing(false)}
        ></div>

        {/* Konten Popup */}
        <div className="bg-white p-4 h-[300px] rounded-t-[24px] w-full max-w-md shadow-lg z-30 animate-slide-up font-nunito relative">
          {/* Header Popup */}
          <div className="flex justify-between items-center px-4 py-2 mb-4">
            <h3 className="text-[16px] font-bold">{title}</h3>
            <button className="text-gray-500" onClick={() => setEditing(false)}>
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

          {/* Kondisi Input Berdasarkan Title */}
          {title === "Edit Nama Toko" ? (
            <div className="border rounded px-4 py-2">
              <span className="font-semibold text-gray-500 text-[15px]">
                {" "}
                Lakukan {title}{" "}
              </span>
              <input
                type="text"
                value={value}
                onChange={handleInputChange}
                className="mb-2 border-b border-black w-full p-2 text-[15px]"
                placeholder={`${title}`}
                maxLength={50} // Batas maksimal 50 karakter
              />
              <p className="text-right text-sm text-gray-500">
                {value.length}/50 karakter
              </p>
            </div>
          ) : title === "Edit Deskripsi" ? (
            <div className="border rounded px-4 py-2">
              <span className="font-semibold text-gray-500 text-[15px]">
                {" "}
                Lakukan {title}{" "}
              </span>
              <input
                type="text"
                value={value}
                onChange={handleInputChange}
                className="mb-2 border-b border-black w-full p-2 text-[15px]"
                placeholder={`${title}`}
                maxLength={50} // Batas maksimal 50 karakter
              />
              <p className="text-right text-sm text-gray-500">
                {value.length}/50 karakter
              </p>
            </div>
          ) : (
            <div className="border rounded px-4 py-2">
              <span className="font-semibold text-gray-500 text-[15px]">
                {" "}
                Lakukan {title}{" "}
              </span>
              <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="mb-4 border-b border-black w-full p-2 text-[15px]"
                placeholder={`${title}`}
              />
            </div>
          )}

          <div className="mt-4">
            <button
              className="px-4 text-[#0F0F0F] font-nunito text-[16px] font-bold mt-4 w-full py-3 text-white rounded-lg"
              style={{
                background: "var(--Warna-Utama, #51D7B1)",
                borderRadius: "8px",
              }}
              onClick={handleConfirm}
            >
              Konfirmasi
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

// Komponen Section
interface SectionProps {
  title: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, children }) => (
  <div className="bg-[var(--Putih-Base)] rounded-[12px] shadow-[0px_0px_4px_rgba(0,0,0,0.25)] py-4 space-y-4 mb-6">
    <div className="text-black px-4 text-[15px] font-bold leading-[21px]">
      {title}
    </div>
    <div className="border-b-2"></div>
    <div className="px-4">{children}</div>
  </div>
);

// Komponen InfoItem
interface InfoItemProps {
  label: string;
  value: string | React.ReactNode;
  onEdit?: () => void; // props untuk fungsi edit
}

const InfoItem: React.FC<InfoItemProps> = ({ label, value, onEdit }) => {
  const handleCopy = (text: string) => {
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          alert(`${label} copied to clipboard!`); // Optional feedback
        })
        .catch((err) => {
          console.error("Failed to copy: ", err);
        });
    } else {
      alert("Clipboard API is not supported in your browser.");
    }
  };

  return (
    <div className="flex items-center justify-between pb-2">
      <div className="flex items-center mb-2">
        <div className="w-[100px] text-black text-[12px] font-semibold">
          {label}
        </div>
      </div>
      <div className="pl-2 w-[190px] flex justify-end flex items-center text-gray-700 text-[11px]">
        <span>{value}</span>
        {label === "User ID" ? (
          <div
            onClick={() => handleCopy(value as string)} // Pass the value directly
            className="p-2 cursor-pointer rounded-md hover:bg-gray-200" // Add padding and hover effect
          >
            <svg
              width="18"
              height="20"
              viewBox="0 0 18 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-gray-500"
            >
              <path
                d="M3.9998 4V1C3.9998 0.44772 4.44752 0 4.9998 0H16.9998C17.5521 0 17.9998 0.44772 17.9998 1V15C17.9998 15.5523 17.5521 16 16.9998 16H13.9998V18.9991C13.9998 19.5519 13.5499 20 12.993 20H1.00666C0.45059 20 0 19.5554 0 18.9991L0.00259995 5.00087C0.00269995 4.44811 0.45264 4 1.00942 4H3.9998ZM2.00242 6L2.00019 18H11.9998V6H2.00242ZM5.9998 4H13.9998V14H15.9998V2H5.9998V4ZM4 9H10V11H4V9ZM4 13H10V15H4V13Z"
                fill="black"
              />
            </svg>
          </div>
        ) : label !== "Domain Toko" ? (
          <div
            onClick={onEdit} // Panggil fungsi edit saat tombol ini diklik
            className="p-2 cursor-pointer rounded-md hover:bg-gray-200"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-gray-500"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.30385 17.5856C8.98813 17.3269 8.93694 16.8549 9.18952 16.5315L12.7281 12L9.18952 7.46849C8.93694 7.14505 8.98813 6.67308 9.30385 6.41432C9.61957 6.15556 10.0803 6.208 10.3329 6.53145L14.2373 11.5315C14.4512 11.8054 14.4512 12.1946 14.2373 12.4685L10.3329 17.4685C10.0803 17.7919 9.61957 17.8444 9.30385 17.5856Z"
                fill="#1B1E28"
              />
            </svg>
          </div>
        ) : (
          // Placeholder div to maintain layout consistency
          <div style={{ width: "32px", height: "16px" }}></div>
        )}
      </div>
    </div>
  );
};

const InformasiAkun = () => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingDeskripsi, setIsEditingDeskripsi] = useState(false);
  const [isEditingUserId, setIsEditingUserId] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingPhone, setIsEditingPhone] = useState(false);

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [userId, setUserId] = useState("1234FZ");
  const [email, setEmail] = useState("jamilaturry@gmail.com");
  const [phone, setPhone] = useState("085747432366");

  const updateUsername = (name: string) => {
    const randomSuffix = Math.floor(100 + Math.random() * 900); // Random 3-digit number
    const initials = name
      .split(" ")
      .map((word) => word.charAt(0)) // Ambil inisial dari setiap kata
      .join("")
      .toUpperCase(); // Inisial nama Toko dalam huruf kapital

    const formattedUsername = `${initials}${randomSuffix}`;
    setUsername(formattedUsername);
  };

  const handleNameChange = (newName: SetStateAction<string>) => {
    if (typeof newName === "string") {
      setName(newName);
      updateUsername(newName);
    } else {
      // If newName is a function, we need to call it with the current name
      const updatedName = newName(name);
      setName(updatedName);
      updateUsername(updatedName);
    }
  };

  const handleUpload = () => {
    // Simulate successful upload
    setShowUploadPopup(true);
  };

  const closePopup = () => {
    setShowUploadPopup(false);
  };
  const [images, setImages] = useState<(File | null)[]>([null, null, null]);
  const [showSizePopup, setShowSizePopup] = useState(false);
  const [showUploadPopup, setShowUploadPopup] = useState(false);

  const handleFileChange = (acceptedFiles: File[], index: number) => {
    const file = acceptedFiles[0];

    // Check file size (limit to 2MB)
    if (file.size > 2 * 1024 * 1024) {
      setShowSizePopup(true);
      return;
    }

    setImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages[index] = file;
      return updatedImages;
    });
  };

  const handleCancelUpload = (index: number) => {
    setImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages[index] = null;
      return updatedImages;
    });
  };

  return (
    <LayoutUtama>
      <Header title="Informasi Toko" children={undefined} />
      <div className="container mx-auto p-4 font-nunito mt-20 max-w-xl">
        {" "}
        {/* Membatasi lebar kontainer */}
        {/* Foto Profil */}
        <ProfilePhoto />
        <BannerUpload />
        {/* Button Upload */}
        <button
          onClick={handleUpload}
          className="w-full mt-4 px-4 py-2 bg-[#51D7B1]  text-white rounded-lg"
        >
          Upload Banner
        </button>
        {/* Popup jika ukuran file lebih dari 2 MB */}
        {showSizePopup && (
          <div className="fixed inset-0 flex items-end justify-center z-50 font-nunito">
            <div
              className="fixed inset-0 bg-black opacity-50 z-40"
              onClick={() => setShowSizePopup(false)}
            ></div>
            <div className="bg-white p-6 h-[328px] rounded-t-[24px] w-full max-w-md shadow-lg z-50 animate-slide-up font-nunito relative">
              <div className="mt-4 border rounded-lg p-4 mb-6 text-center">
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
                <div className="border-t border-gray-300 my-2"></div>
                <p className="text-[14px] text-black">
                  Maksimal Gambar / Video 2 MB
                </p>
              </div>
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
        {showUploadPopup && (
          <>
            <div
              className="fixed inset-0 bg-black opacity-50 z-40"
              onClick={closePopup}
            ></div>
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
                <h1 className="mt-4 font-nunitoBold text-lg text-center">
                  Banner Berhasil Disimpan
                </h1>
              </div>
            </div>
          </>
        )}
        {/* Info Profile */}
        <div className="mt-6"></div>
        <Section title="Info Profile">
          <InfoItem
            label="Nama Toko"
            value={name || "Masukkan Nama Toko"}
            onEdit={() => setIsEditingName(true)} // Panggil fungsi untuk edit
          />
          <InfoItem
            label="Domain Toko"
            value={username || "Domain akan terupdate"}
          />
          <InfoItem
            label="Deskripsi"
            value={deskripsi || "Tulisakan Deskripsi Toko"}
            onEdit={() => setIsEditingDeskripsi(true)} // Panggil fungsi untuk edit
          />
        </Section>
        {/* Info Pribadi */}
        <Section title="Info Pribadi">
          <InfoItem
            label="User ID"
            value={userId}
            onEdit={() => setIsEditingUserId(true)} // Panggil fungsi untuk edit
          />
          <InfoItem
            label="Email"
            value={email}
            onEdit={() => setIsEditingEmail(true)} // Panggil fungsi untuk edit
          />
          <InfoItem
            label="Nomor HP"
            value={phone}
            onEdit={() => setIsEditingPhone(true)} // Panggil fungsi untuk edit
          />
        </Section>
      </div>

      {/* Popup untuk Edit Nama Toko */}
      {isEditingName && (
        <EditPopup
          title="Edit Nama Toko"
          value={name}
          setValue={(newName) => handleNameChange(newName)}
          setEditing={setIsEditingName}
        />
      )}

      {/* Popup untuk Edit deskripsi */}
      {isEditingDeskripsi && (
        <EditPopup
          title="Edit Deskripsi"
          value={deskripsi}
          setValue={setDeskripsi}
          setEditing={setIsEditingDeskripsi}
        />
      )}

      {/* Popup untuk Edit User ID */}
      {isEditingUserId && (
        <EditPopup
          title="Edit User ID"
          value={userId}
          setValue={setUserId}
          setEditing={setIsEditingUserId}
        />
      )}

      {/* Popup untuk Edit Email */}
      {isEditingEmail && (
        <EditPopup
          title="Edit Email"
          value={email}
          setValue={setEmail}
          setEditing={setIsEditingEmail}
        />
      )}

      {/* Popup untuk Edit Nomor HP */}
      {isEditingPhone && (
        <EditPopup
          title="Edit Nomor HP"
          value={phone}
          setValue={setPhone}
          setEditing={setIsEditingPhone}
        />
      )}
    </LayoutUtama>
  );
};

export default InformasiAkun;
