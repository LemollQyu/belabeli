"use client";
import LayoutUtama from '@/app/layouts/layout-utama';
import Header from '@/app/layouts/header';

const VersiAplikasi = () => {
  return (
    <LayoutUtama>
      <Header title="Tentang Aplikasi" children={undefined} /> {/* Header dengan title sesuai kebutuhan */}

      <div className="w-full max-w-[400px] mx-auto py-4 space-y-6 font-nunito px-4 text-center mt-20">
        <h1 className="text-[16px] font-bold text-gray-800">Bela Beli</h1>
            <span className="font-semibold text-[14px]">Versi Aplikasi</span> 1.0.0
      </div>
    </LayoutUtama>
  );
};

export default VersiAplikasi;
