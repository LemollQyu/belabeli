const StatistikRingkasan = () => (
    <div className="pt-4 px-4 font-semibold">
     {/* Ringkasan Statistik */}
          <span className="text-md">Ringkasan Statistik</span>
          <div className=" mt-2 flex justify-center items-start">
            <div className="grid grid-cols-3 md:grid-cols-3 gap-4 text-center">
              <div className="flex flex-col items-center p-2 border-2 rounded-lg text-black bg-white">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 22C2 17.5817 5.58172 14 10 14C14.4183 14 18 17.5817 18 22H16C16 18.6863 13.3137 16 10 16C6.68629 16 4 18.6863 4 22H2ZM10 13C6.685 13 4 10.315 4 7C4 3.685 6.685 1 10 1C13.315 1 16 3.685 16 7C16 10.315 13.315 13 10 13ZM10 11C12.21 11 14 9.21 14 7C14 4.79 12.21 3 10 3C7.79 3 6 4.79 6 7C6 9.21 7.79 11 10 11ZM18.2837 14.7028C21.0644 15.9561 23 18.752 23 22H21C21 19.564 19.5483 17.4671 17.4628 16.5271L18.2837 14.7028ZM17.5962 3.41321C19.5944 4.23703 21 6.20361 21 8.5C21 11.3702 18.8042 13.7252 16 13.9776V11.9646C17.6967 11.7222 19 10.264 19 8.5C19 7.11935 18.2016 5.92603 17.041 5.35635L17.5962 3.41321Z"
                    fill="black"
                  />
                </svg>
                <div className="text-[12px] font-semibold mt-2">
                  Jumlah Pengikut
                </div>
                <div className="text-xs text-gray-600">
                  2900 Pengikut
                </div>
              </div>
              <div className="flex flex-col items-center p-2 border-2 rounded-lg text-black bg-white">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21 13.2422V20H22V22H2V20H3V13.2422C1.79401 12.435 1 11.0602 1 9.5C1 8.67286 1.22443 7.87621 1.63322 7.19746L4.3453 2.5C4.52393 2.1906 4.85406 2 5.21132 2H18.7887C19.1459 2 19.4761 2.1906 19.6547 2.5L22.3575 7.18172C22.7756 7.87621 23 8.67286 23 9.5C23 11.0602 22.206 12.435 21 13.2422ZM19 13.9725C18.8358 13.9907 18.669 14 18.5 14C17.2409 14 16.0789 13.478 15.25 12.6132C14.4211 13.478 13.2591 14 12 14C10.7409 14 9.5789 13.478 8.75 12.6132C7.9211 13.478 6.75911 14 5.5 14C5.331 14 5.16417 13.9907 5 13.9725V20H19V13.9725ZM5.78865 4L3.35598 8.21321C3.12409 8.59843 3 9.0389 3 9.5C3 10.8807 4.11929 12 5.5 12C6.53096 12 7.44467 11.3703 7.82179 10.4295C8.1574 9.59223 9.3426 9.59223 9.67821 10.4295C10.0553 11.3703 10.969 12 12 12C13.031 12 13.9447 11.3703 14.3218 10.4295C14.6574 9.59223 15.8426 9.59223 16.1782 10.4295C16.5553 11.3703 17.469 12 18.5 12C19.8807 12 21 10.8807 21 9.5C21 9.0389 20.8759 8.59843 20.6347 8.19746L18.2113 4H5.78865Z"
                    fill="black"
                  />
                </svg>
                <div className="text-[12px] font-semibold mt-2">
                  Toko Dikunjungi
                </div>
                <div className="text-xs text-gray-600">500 Pengunjung</div>
              </div>
              <div className="flex flex-col items-center p-2 border-2 rounded-lg text-black bg-white">
                <svg
                  width="25"
                  height="24"
                  viewBox="0 0 25 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.5008 17L6.62294 20.5902L8.22104 13.8906L2.99023 9.40983L9.85576 8.85942L12.5008 2.5L15.1459 8.85942L22.0114 9.40983L16.7806 13.8906L18.3787 20.5902L12.5008 17ZM12.5008 14.6564L15.3175 16.3769L14.5517 13.1664L17.0584 11.0192L13.7683 10.7554L12.5008 7.70792L11.2333 10.7554L7.94325 11.0192L10.4499 13.1664L9.68408 16.3769L12.5008 14.6564Z"
                    fill="black"
                  />
                </svg>
                <div className="text-[12px] font-semibold mt-2">Jumlah Rating</div>
                <div className="text-xs text-gray-600">
                  20 Orang Memberi rating
                </div>
              </div>
            </div>
          </div>
    </div>
  );
  
  export default StatistikRingkasan;
  