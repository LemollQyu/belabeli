import React, { useState } from 'react';

interface FilterProps {
    isOpen: boolean;
    onClose: () => void;
}

const Filter: React.FC<FilterProps> = ({ isOpen, onClose }) => {
  const [selectedFilters, setSelectedFilters] = useState({
    masukKeEtalase: false,
    belumMasukKeEtalase: false,
    terbaru: false,
    hargaTerendah: false,
    hargaTertinggi: false,
  });

  const [priceRange, setPriceRange] = useState(100000); // Mulai dari Rp100.000

  const handleFilterChange = (filterName: keyof typeof selectedFilters) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: !prevFilters[filterName],
    }));
  };

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10)
    setPriceRange(100000 + value * 50000) // Mengatur penambahan Rp50.000 per langkah
  }

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-center items-end bg-black bg-opacity-30"
      onClick={onClose}
    >
      <div
        className="bg-white p-4 h-[460px] rounded-t-[24px] w-full max-w-md shadow-lg z-30 animate-slide-up font-nunito relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Popup */}
        <div className="flex justify-between items-center px-4 py-2 mb-2">
          <h3 className="text-[16px] font-bold">Filter Produk</h3>
          <button className="text-gray-500" onClick={onClose}>
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

        <div className="border-b border-[#D3D3D3] mb-2"></div>

        {/* Konten Filter */}
        <div className="px-4 space-y-2 text-[14px] font-medium text-left">
          {/* Masuk Ke Etalase */}
          <div className="flex items-center justify-between border-b py-2">
            <label htmlFor="masukKeEtalase">Masuk Ke Etalase</label>
            <input
              type="checkbox"
              id="masukKeEtalase"
              checked={selectedFilters.masukKeEtalase}
              onChange={() => handleFilterChange('masukKeEtalase')}
              className="mr-2"
            />
          </div>

          {/* Belum Masuk Ke Etalase */}
          <div className="flex items-center justify-between border-b py-2">
            <label htmlFor="belumMasukKeEtalase">Belum Masuk Ke Etalase</label>
            <input
              type="checkbox"
              id="belumMasukKeEtalase"
              checked={selectedFilters.belumMasukKeEtalase}
              onChange={() => handleFilterChange('belumMasukKeEtalase')}
              className="mr-2"
            />
          </div>

          {/* Terbaru */}
          <div className="flex items-center justify-between border-b py-2">
            <label htmlFor="terbaru">Terbaru</label>
            <input
              type="checkbox"
              id="terbaru"
              checked={selectedFilters.terbaru}
              onChange={() => handleFilterChange('terbaru')}
              className="mr-2"
            />
          </div>

          {/* Harga Terendah */}
          <div className="flex items-center justify-between border-b py-2">
            <label htmlFor="hargaTerendah">Harga Terendah</label>
            <input
              type="checkbox"
              id="hargaTerendah"
              checked={selectedFilters.hargaTerendah}
              onChange={() => handleFilterChange('hargaTerendah')}
              className="mr-2"
            />
          </div>

          {/* Harga Tertinggi */}
          <div className="flex items-center justify-between border-b py-2">
            <label htmlFor="hargaTertinggi">Harga Tertinggi</label>
            <input
              type="checkbox"
              id="hargaTertinggi"
              checked={selectedFilters.hargaTertinggi}
              onChange={() => handleFilterChange('hargaTertinggi')}
              className="mr-2"
            />
          </div>

           {/* Slider untuk Jangkauan Harga */}
           <div className="py-2 border-b">
            <label className="block mb-2 font-medium">
              Pilih Jangkauan Harga
            </label>
            <div className="flex items-center space-x-4">
              <span className="text-[16px] bg-gray-100 px-2 py-1 rounded-md text-gray-700">
                Rp{priceRange.toLocaleString('id-ID')}
              </span>
              <input
                type="range"
                min="0"
                max="20" // Mengatur slider hingga Rp1.000.000 (20 * 50.000)
                value={(priceRange - 100000) / 50000} // Sesuaikan nilai slider
                onChange={handleSliderChange}
                className="w-full h-2 bg-gray-300 rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Button Konfirmasi */}
        <button
          onClick={onClose}
          className="mt-4 w-full h-[45px] bg-[#51D7B1] text-white rounded-md flex justify-center items-center font-semibold text-[16px]"
        >
          Konfirmasi
        </button>
      </div>
    </div>
  );
};

export default Filter;
