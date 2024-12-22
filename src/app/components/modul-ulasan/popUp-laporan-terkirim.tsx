const LaporanTerkirim = () => {
  return (
    <>
      <div className="border fixed left-1/2 -translate-x-1/2 top-0 bg-white pt-[17px] pb-[32px] px-[40px] w-[310px] h-[219px] flex flex-col items-center gap-4 rounded-lg top-1/2 -translate-y-1/2">
        <h1 className="font-nunitoBold text-[18px] text-center ">
          Laporan Berhasil Dikirim
        </h1>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="85"
          height="84"
          viewBox="0 0 85 84"
          fill="none"
        >
          <path
            d="M42.5 83.6667C19.4881 83.6667 0.833336 65.0117 0.833336 42C0.833336 18.9881 19.4881 0.333344 42.5 0.333344C65.5117 0.333344 84.1667 18.9881 84.1667 42C84.1667 65.0117 65.5117 83.6667 42.5 83.6667ZM38.3442 58.6667L67.8071 29.2039L61.9146 23.3113L38.3442 46.8817L26.5592 35.0963L20.6666 40.9892L38.3442 58.6667Z"
            fill="url(#paint0_linear_5061_10803)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_5061_10803"
              x1="0.833336"
              y1="42"
              x2="84.1667"
              y2="42"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#83E69B" />
              <stop offset="1" stopColor="#00BAE1" />
            </linearGradient>
          </defs>
        </svg>

        <p className="font-nunitoBold text-[12px] text-center">
          Terimakasih Laporan yang anda kami tinjau lebih lanjut
        </p>
      </div>
    </>
  );
};

export default LaporanTerkirim;
