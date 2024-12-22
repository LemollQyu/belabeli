"use client";
import LayoutUtama from "@/app/layouts/layout-utama";
import BackNav from "@/app/components/backNavigasi";
import Star from "../../components/modul-ulasan/star";

const DetailUlasan = () => {
  return (
    <>
      <LayoutUtama>
        <div className="flex justify-center border-b-2 items-center relative h-[44px] w-full  py-10">
          <BackNav />

          <h1 className="text-[14px] mt-2 font-nunitoBold">Detail Ulasan</h1>
        </div>

        <div className="p-5 mx-5 mt-5 rounde-lg rounded-md bg-[#f5f5f5]">
          <div className="w-full flex items-center justify-between gap-2">
            {/* keterangan pengulas */}

            <div className="flex items-center gap-[2px]">
              {/* gambar profile */}
              <div className="w-[20px] bg-[#a9a9a9] h-[20px] rounded-full"></div>

              <div className="ml-2">
                <div className="flex items-center gap-2">
                  <h1 className="font-nunitoBold text-[12px]">Anonymous</h1>
                  <p className="font-nunitoLight text-[8px]">
                    26-09-2024, 08.35
                  </p>
                </div>

                <div className="flex items-center gap-[2px]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="8"
                    height="8"
                    viewBox="0 0 24 23"
                    fill="none"
                    className="w-[10px] h-[10px]"
                  >
                    <path
                      d="M12.0006 18.26L4.94715 22.2082L6.52248 14.2799L0.587891 8.7918L8.61493 7.84006L12.0006 0.5L15.3862 7.84006L23.4132 8.7918L17.4787 14.2799L19.054 22.2082L12.0006 18.26Z"
                      fill="#F7D463"
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="8"
                    height="8"
                    viewBox="0 0 24 23"
                    fill="none"
                    className="w-[10px] h-[10px]"
                  >
                    <path
                      d="M12.0006 18.26L4.94715 22.2082L6.52248 14.2799L0.587891 8.7918L8.61493 7.84006L12.0006 0.5L15.3862 7.84006L23.4132 8.7918L17.4787 14.2799L19.054 22.2082L12.0006 18.26Z"
                      fill="#F7D463"
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="8"
                    height="8"
                    viewBox="0 0 24 23"
                    fill="none"
                    className="w-[10px] h-[10px]"
                  >
                    <path
                      d="M12.0006 18.26L4.94715 22.2082L6.52248 14.2799L0.587891 8.7918L8.61493 7.84006L12.0006 0.5L15.3862 7.84006L23.4132 8.7918L17.4787 14.2799L19.054 22.2082L12.0006 18.26Z"
                      fill="#F7D463"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <button className="flex items-center justify-center text-[8px] text-white w-[63px] h-[26px] bg-[#51D7B1] rounded-sm">
              Perbarui Ulasan
            </button>
          </div>

          <span className="text-[10px] flex gap-[2px] mt-2">
            <p className="font-nunitoBold">Variasi :</p> Merah
          </span>
          <p className="text-[10px] font-nunito">
            Bagus sepatunya, alhamdulilah baguss
          </p>

          <div className="mt-2 w-full h-[25px] flex items-center rounded-sm bg-[#51d7b1]">
            <p className="text-[12px] text-white pl-3 font-nunito">
              Sepatu Anak Sekolah Murah Meriah 
            </p>
          </div>

          <div className="flex mt-2 items-center justify-between gap-2">
            <div className="w-[92px] border h-[72px] rounded-lg">
              <img className="w-full h-full rounded-lg" src="/image/image.png"></img>
            </div>
            <div className="w-[92px] border h-[72px] rounded-lg">
              <img className="w-full h-full rounded-lg" src="/image/image.png"></img>
            </div>
            <div className="w-[92px] border h-[72px] rounded-lg">
              <img className="w-full h-full rounded-lg" src="/image/image.png"></img>
            </div>
            <div className="w-[92px] border h-[72px] rounded-lg">
              <img className="w-full h-full rounded-lg" src="/image/image.png"></img>
            </div>
          </div>
        </div>
      </LayoutUtama>
    </>
  );
};

export default DetailUlasan;
