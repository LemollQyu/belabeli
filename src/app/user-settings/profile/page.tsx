"use client";
import React, { useEffect, useState } from "react";
import LayoutUtama from "@/app/layouts/layout-utama";
import Header from "@/app/layouts/header";
import ProfilePhoto from "@/app/components/usersettings/profile";
import { useRouter } from "next/navigation";
import "react-datepicker/dist/react-datepicker.css";
import { Dispatch, SetStateAction } from "react";
import gantiNamaProfile from "@/api/settings/gantiNama";
import getUserProfile from "@/api/settings/getUserProfile";
import putGender from "@/api/settings/putGender";
import gantiBioProfile from "@/api/settings/postBioProfile";
import gantiBirthDate from "@/api/settings/putTanggalLahir";
import requestEmailProfile from "@/api/settings/postRequestOTPEmail";
import requestOTPWA from "@/api/settings/postRequestOTPWhatsApp";

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
  const [namaProfile, setNamaProfile] = useState("");
  const [bioProfile, setBioProfile] = useState("");
  const [jenisKelamin, setJenisKelamin] = useState("");
  const [emailProfile, setEmailProfile] = useState("");
  const [tanggalLahir, setTanggalLahir] = useState("");
  const [nomorTelepon, setNomorTelepon] = useState("");

  const togglePopup = () => {
    setShowPopup(false); // Tutup popup saat latar belakang atau tombol exit diklik
  };
  const handleConfirm = () => {
    setShowPopup(true); // Tampilkan popup saat tombol "Konfirmasi" diklik

    // Jika title adalah "Edit Email" atau "Edit Nomor Telepon", arahkan ke halaman OTP
    if (title === "Edit Email" || title === "Edit Nomor HP") {
      router.push("/user-settings/profile/kode-otp");
    } else {
      setEditing(false); // Tutup popup untuk title lainnya
    }
  };

  const HandleGantiNama = async () => {
    const response = await gantiNamaProfile({ name: namaProfile });
    console.log("response ganti name", response.message);
    window.location.reload()
  };

  const HandleRequestOTPEmail = async () => {
    const response = await requestEmailProfile({ email: emailProfile });
    console.log("response request email otp", response.error);
    console.log("response request email otp success", response.data);
    router.push(`/user-settings/profile/kode-otp?e=${emailProfile}&expires=${response.data.expires_in}`);
  };

  const HandleRequestOTPWhatsApp = async () => {
    const response = await requestOTPWA({ nomor_telepon : nomorTelepon });
    console.log("response request nomor telepon otp", response.error);
    console.log("response request nomor telepon otp success", response.data);
    router.push(`/user-settings/profile/kode-otp2?e=${nomorTelepon}&expires=${response.data.expires_in}`);
  };

  const HandleGantiBio = async () => {
    const response = await gantiBioProfile({ bio: bioProfile });
    console.log("response ganti bio", response.message);
    window.location.reload()
  };

  const HandleGantiBirthdate = async () => {
    const response = await gantiBirthDate({ tanggal_lahir: tanggalLahir });
    console.log("response ganti birthdate", response.message);
    window.location.reload()
  };

  const HandleGantiKelamin = async (value: string) => {
    try {
      const response = await putGender({ jenis_kelamin: value });
      console.log("Response ganti kelamin:", response.message);
      window.location.reload()
    } catch (error) {
      console.error("Error updating gender:", error);
    }
  };

  const handleNamaProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 50) {
      setNamaProfile(e.target.value);
    }
  };

  const handleEmailProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 50) {
      setEmailProfile(e.target.value);
    }
  };

  const handleNoTelpProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 50) {
      setNomorTelepon(e.target.value);
    }
  };

  const [text, setText] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const closeModal = () => {
      setIsAnimating(true);
      setTimeout(() => {
      setIsModalOpen(false);
      }, 300);
  };
  const [wordCount, setWordCount] = useState(0);
  const maxWords = 20;

  const handleBioProfileChange = (event: { target: { value: string; }; }) => {
    const inputText = event.target.value;
    const words = inputText.trim().split(/\s+/).filter((word) => word.length > 0);
    const currentWordCount = words.length;

    if (currentWordCount <= maxWords) {
      setText(inputText);
      setBioProfile(inputText);
      setWordCount(currentWordCount);
    } else {
      setIsModalOpen(true);
      setIsAnimating(true);
    }

  };

  const handleBirthDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 50) {
      setTanggalLahir(e.target.value);
    }
  };

  const handleJenisKelaminChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setJenisKelamin(value);
      HandleGantiKelamin(value); // Call the async function after updating the state
  };

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

          {title === "Edit Jenis Kelamin" ? (
            <>
            <div className="radio-group flex flex-col px-8">
              <label className="flex justify-between items-center mb-2">
                Pria
                <input
                  type="radio"
                  value="pria" // Set value specific to this option
                  checked={jenisKelamin === "pria"}
                  onChange={handleJenisKelaminChange}
                  className="ml-2"
                />
              </label>
              <label className="flex justify-between items-center mb-2">
                Wanita
                <input
                  type="radio"
                  value="wanita" // Set value specific to this option
                  checked={jenisKelamin === "wanita"}
                  onChange={handleJenisKelaminChange}
                  className="ml-2"
                />
              </label>
              <label className="flex justify-between items-center mb-2">
                Lainnya
                <input
                  type="radio"
                  value="lainnya" // Set value specific to this option
                  checked={jenisKelamin === "lainnya"}
                  onChange={handleJenisKelaminChange}
                  className="ml-2"
                />
              </label>
            </div>
            </>
          ) : title === "Edit Tanggal Lahir" ? (
          <>
            <input
              type="date"
              value={tanggalLahir}
              onChange={handleBirthDateChange}
              className="border rounded w-full p-2"
            />

            <div className="mt-4">
                <button
                  className="px-4 font-nunito text-[16px] font-bold mt-4 w-full py-3 text-white rounded-lg"
                  style={{
                    background: "var(--Warna-Utama, #51D7B1)",
                    borderRadius: "8px",
                  }}
                  onClick={HandleGantiBirthdate}
                >
                  Konfirmasi
                </button>
              </div>
            </>
          ) : title === "Edit Nama" ? (
            <>
              <div className="border rounded px-4 py-2">
                <span className="font-semibold text-gray-500 text-[15px]">
                  {" "}
                  Lakukan {title}{" "}
                </span>
                <input
                  type="text"
                  value={namaProfile}
                  onChange={handleNamaProfileChange}
                  className="mb-2 border-b border-black w-full p-2 text-[15px]"
                  placeholder={`${title}`}
                  maxLength={50} // Batas maksimal 50 karakter
                />
                <p className="text-right text-sm text-gray-500">
                  {value.length}/50 karakter
                </p>
              </div>

              <div className="mt-4">
                <button
                  className="px-4 font-nunito text-[16px] font-bold mt-4 w-full py-3 text-white rounded-lg"
                  style={{
                    background: "var(--Warna-Utama, #51D7B1)",
                    borderRadius: "8px",
                  }}
                  onClick={HandleGantiNama}
                >
                  Konfirmasi
                </button>
              </div>
            </>
          ) : title === "Edit Bio" ? (
          <>
            <div className="border rounded px-4 py-2">
              <span className="font-semibold text-gray-500 text-[15px]">
                {" "}
                Lakukan {title}{" "}
              </span>
              <textarea
                type="text"
                value={bioProfile}
                onChange={handleBioProfileChange}
                className="mb-2 border-b border-black w-full p-2 text-[15px]"
                placeholder={`${title}`}
              />
              <p className="text-right text-sm text-gray-500">
                {wordCount}/{maxWords} kata
              </p>
            </div>

            <div className="mt-4">
            <button
              className="px-4 font-nunito text-[16px] font-bold mt-4 w-full py-3 text-white rounded-lg"
              style={{
                background: "var(--Warna-Utama, #51D7B1)",
                borderRadius: "8px",
              }}
              onClick={HandleGantiBio}
            >
              Konfirmasi
            </button>
            </div>
          </>
          ) : title === "Edit Email" ? (
          <>
            <div className="border rounded px-4 py-2">
              <span className="font-semibold text-gray-500 text-[15px]">
                {" "}
                Lakukan {title}{" "}
              </span>
              <input
                type="text"
                value={emailProfile}
                onChange={handleEmailProfileChange}
                className="mb-4 border-b border-black w-full p-2 text-[15px]"
                placeholder={`${title}`}
              />
            </div>

            <div className="mt-4">
            <button
              className="px-4 font-nunito text-[16px] font-bold mt-4 w-full py-3 text-white rounded-lg"
              style={{
                background: "var(--Warna-Utama, #51D7B1)",
                borderRadius: "8px",
              }}
              onClick={HandleRequestOTPEmail}
            >
              Konfirmasi
            </button>
            </div>
          </>
          ) : title === "Edit Nomor HP" ? (
            <>
              <div className="border rounded px-4 py-2">
                <span className="font-semibold text-gray-500 text-[15px]">
                  {" "}
                  Lakukan {title}{" "}
                </span>
                <input
                  type="text"
                  value={nomorTelepon}
                  onChange={handleNoTelpProfileChange}
                  className="mb-4 border-b border-black w-full p-2 text-[15px]"
                  placeholder={`${title}`}
                />
              </div>
  
              <div className="mt-4">
              <button
                className="px-4 font-nunito text-[16px] font-bold mt-4 w-full py-3 text-white rounded-lg"
                style={{
                  background: "var(--Warna-Utama, #51D7B1)",
                  borderRadius: "8px",
                }}
                onClick={HandleRequestOTPWhatsApp}
              >
                Konfirmasi
              </button>
              </div>
            </>
          ) : ('')}

          
        </div>
      </div>

      {isModalOpen && (
            <>
            <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
            <div id="modal" className="font-nunito fixed inset-y-1/2 flex justify-center items-center z-[100] w-[360px] left-1/2 -translate-x-1/2 shadow-lg">
                <div
                className={`bg-white w-full max-w-lg rounded-xl p-6 absolute bottom-0 inset-y-auto ${ isAnimating ? 'translate-y-0' : 'translate-y-full'}`}>
                    
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold font-nunito">Perhatian</h2>
                        <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>
                    
                    <div className="flex items-center mb-6 gap-5">
                        <p>Anda telah mencapai maksimum kata penginputan</p>
                    </div>
                    
                    <div className="flex flex-row gap-3 mt-6">
                        <button onClick={closeModal} className="w-full bg-[#EE443F] text-white font-bold py-3 rounded-lg">
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

// Komponen Section
interface SectionProps {
  title: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, children }) => (
  <div className=" bg-[var(--Putih-Base)] rounded-[12px] shadow-[0px_0px_4px_rgba(0,0,0,0.25)] py-4 space-y-4 mb-6">
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
        <div className="w-[100px] text-black text-[12px] font-semibold">{label}</div>
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
        ) : label !== "Username" ? (
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
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [isEditingUserId, setIsEditingUserId] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [isEditingGender, setIsEditingGender] = useState(false);
  const [isEditingBirthDate, setIsEditingBirthDate] = useState(false);

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [userId, setUserId] = useState("Loading...");
  const [email, setEmail] = useState("Loading...");
  const [phone, setPhone] = useState("Loading...");
  const [gender, setGender] = useState("Loading...");
  const [birthDate, setBirthDate] = useState("Loading...");

  const updateUsername = (name: string) => {
    const randomSuffix = Math.floor(100 + Math.random() * 900); // Random 3-digit number
    const initials = name
      .split(" ")
      .map((word) => word.charAt(0)) // Ambil inisial dari setiap kata
      .join("")
      .toUpperCase(); // Inisial nama dalam huruf kapital

    const formattedUsername = `${initials}${randomSuffix}`;
    setUsername(formattedUsername);
  };

  const HandleGantiNama = async (newName: React.SetStateAction<string>) => {
    try {
      const response = await gantiNamaProfile({ name: newName }); // Send newName to API
      console.log("response ganti name:", response.message);
      if (response.status === "success") {
        // Update the state with the new name if needed
        setName(newName); // Assuming `setName` updates the displayed name
        setIsEditingName(false); // Close the popup
      } else {
        console.error("Failed to update name:", response.message);
      }
    } catch (error) {
      console.error("Error updating name:", error);
    }
  };

  useEffect(() => {
    async function HandleGetDataUserProfile() {
      const response = await getUserProfile();
      console.log("get user data", response.data);
      setName(response.data?.name);
      setUsername(response.data?.username);
      setEmail(response.data?.email);
      setPhone(response.data?.phone);
      setBio(response.data?.bio ? response.data.bio : "Belum diatur");
      setUserId(response.data?.id);
      setGender(
        response.data?.kelamin ? response.data.kelamin : "Belum diatur"
      );
      setBirthDate(
        response.data?.birthdate ? response.data.birthdate : "Belum diatur"
      );
    }
    HandleGetDataUserProfile();
  }, []);

  return (
    <LayoutUtama>
      <Header title="Informasi Akun" children={undefined} />
      <div className="container mx-auto p-4 font-nunito mt-20 max-w-xl">
        {" "}
        {/* Membatasi lebar kontainer */}
        {/* Foto Profil */}
        <ProfilePhoto />
        {/* Info Profile */}
        <Section title="Info Profile">
          <InfoItem
            label="Nama"
            value={name || "Loading ..."}
            onEdit={() => setIsEditingName(true)} // Panggil fungsi untuk edit
          />
          <InfoItem
            label="Username"
            value={username || "Loading ..."}
          />
          <InfoItem
            label="Bio"
            value={bio || "Loading ..."}
            onEdit={() => setIsEditingBio(true)} // Panggil fungsi untuk edit
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
          <InfoItem
            label="Jenis Kelamin"
            value={gender}
            onEdit={() => setIsEditingGender(true)} // Panggil fungsi untuk edit
          />
          <InfoItem
            label="Tanggal Lahir"
            value={birthDate}
            onEdit={() => setIsEditingBirthDate(true)} // Panggil fungsi untuk edit
          />
        </Section>
      </div>

      {/* Popup untuk Edit Nama */}
      {isEditingName && (
        <EditPopup
          title="Edit Nama"
          value={name}
          setValue={(newName) => HandleGantiNama(newName)} // Pass newName to HandleGantiNama
          setEditing={setIsEditingName} // Close the popup after editing
        />
      )}

      {/* Popup untuk Edit Bio */}
      {isEditingBio && (
        <EditPopup
          title="Edit Bio"
          value={bio}
          setValue={setBio}
          setEditing={setIsEditingBio}
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

      {/* Popup untuk Edit Jenis Kelamin */}
      {isEditingGender && (
        <EditPopup
          title="Edit Jenis Kelamin"
          value={gender}
          setValue={setGender}
          setEditing={setIsEditingGender}
        />
      )}

      {isEditingBirthDate && (
        <EditPopup
          title="Edit Tanggal Lahir"
          value={birthDate}
          setValue={setBirthDate}
          setEditing={setIsEditingBirthDate}
        />
      )}
    </LayoutUtama>
  );
};

export default InformasiAkun;
