// components/VerifikasiSukses.tsx
const VerifikasiSukses = ({ onButtonClick }: { onButtonClick: () => void }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full space-y-4 px-4 font-nunito">
      {/* Success Icon */}
      <div className="flex flex-col items-center justify-center h-[190px]">
        <div className="mb-4 flex flex-col items-center space-y-4">
          <svg
            width="112"
            height="112"
            viewBox="0 0 112 112"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M34.4831 77.1808C24.9144 70.4211 18.666 59.2738 18.666 46.6673C18.666 26.0487 35.3807 9.33398 55.9994 9.33398C76.6181 9.33398 93.3327 26.0487 93.3327 46.6673C93.3327 59.2738 87.0845 70.4211 77.5155 77.1808L87.2362 99.3988C87.7528 100.579 87.2142 101.955 86.0336 102.472C85.7386 102.601 85.4204 102.667 85.0984 102.667H26.9004C25.6117 102.667 24.5671 101.622 24.5671 100.334C24.5671 100.012 24.6337 99.6937 24.7627 99.3988L34.4831 77.1808ZM37.8857 51.1959C39.9095 59.3168 47.2517 65.334 55.9994 65.334C64.747 65.334 72.0891 59.3168 74.113 51.1959L65.056 48.9316C64.0442 52.9921 60.373 56.0006 55.9994 56.0006C51.6258 56.0006 47.9545 52.9921 46.9428 48.9316L37.8857 51.1959Z"
              fill="#51D7B1"
            />
          </svg>
          {/* Message */}
          <h2 className="text-xl font-semibold text-center px-20">
            Selamat Toko anda Sudah Dibuat
          </h2>
          <p className="text-[14px] text-center text-gray-500 px-12">
          Silahkan klik Lanjut untuk masuk ke Dashboard Toko
          </p>
        </div>
      </div>

      {/* Button */}
      <button
        onClick={onButtonClick}
        className="w-full px-6 py-3 bg-[#51D7B1] text-white rounded-md font-medium hover:bg-emerald-600 translate-y-[230px]"
      >
        Lanjut
      </button>
    </div>
  )
}

export default VerifikasiSukses
