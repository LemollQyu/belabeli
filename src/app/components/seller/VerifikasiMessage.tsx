// components/VerifikasiMessage.tsx
const VerifikasiMessage = ({
  onButtonClick,
}: {
  onButtonClick: () => void
}) => {
  return (
    <div className="flex flex-col items-center justify-center h-full space-y-4 px-4 font-nunito">
      <div className="flex flex-col items-center justify-center h-[190px]">
      <div className="mb-4 flex flex-col items-center space-y-4">
        <svg
          width="80"
          height="80"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12" cy="12" r="10" stroke="black" strokeWidth="2" />
          <path
            d="M12 6V12L16 14"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {/* Message */}
        <h2 className="text-xl font-semibold text-center px-20">
          Verifikasi Data Diri Sedang Diproses
        </h2>
        <p className="text-[14px] text-center text-gray-500 px-12">
          Verifikasi data dirimu sedang dalam proses evaluasi. Mohon tunggu
          hasil verifikasi selama 3-5 hari kerja.
        </p>
      </div>
      </div>

      {/* Button */}
      <button
        onClick={onButtonClick}
        className="w-full px-6 py-3 bg-[#51D7B1] text-white rounded-md font-medium hover:bg-emerald-600 translate-y-[230px]"
      >
        Kembali ke Halaman Utama
      </button>
    </div>
  )
}

export default VerifikasiMessage
