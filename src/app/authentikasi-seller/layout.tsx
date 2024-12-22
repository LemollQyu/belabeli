import ProcessBar from "../components/authentikasi-seller/process-bar";
import Back from "../components/back";
import LayoutUtama from "../layouts/layout-utama";

const LayoutAuthSeller = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <LayoutUtama>
        <div className="border-blue-500 border h-[100vh]">
          <div className="border pt-3 pb-5">
            <div className="flex justify-around items-center ">
              <Back />

              <h1 className="font-nunitoBold">Verifikasi</h1>
              <button className="font-nunitoLight text-warnaUtama text-[12px]">
                Simpan
              </button>
            </div>

            <ProcessBar />
          </div>
          <main className="border-red-500 px-5">{children}</main>
        </div>
      </LayoutUtama>
    </>
  );
};

export default LayoutAuthSeller;
