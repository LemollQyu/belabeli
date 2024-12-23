import { useState } from "react";

const TambahStokChildren = () =>{
    
    const [showPopup, setShowPopup] = useState(false)
        const [isPopupVisible, setIsPopupVisible] = useState(false)
        const [isPopupTambahEtalaseVisible, setIsPopupTambahEtalaseVisible,] = useState(false)
        const [formData, setFormData] = useState({
            namaProduk: '',
            merk: '',
            gaya: '',
            berat: '',
            kategori: '',
            jenisBarang: '',
            keamananProduk: '',
            etalase: '',
            deskripsiProduk: '',
            panduanUkuran: null as File | null,
            informasiPenting: '',
          })
    
        const handleSelectOption = (field: string, value: string) => {
            setFormData((prev) => ({ ...prev, [field]: value }))
          }
        const popupOptions = {
            kategori: [
              'Gadget & Elektronik',
              'Fashion dan Kecantikan',
              'Kebutuhan Harian',
              'Mainan & Hobi',
              'Perlengkapan Rumah & Dekorasi',
              'Sports',
              'Pria',
              'Wanita',
              'Peliharaan',
              'Perhiasan',
              'Kerajinan',
              'Otomotif dan Perkakas',
              'Ibu dan Bayi',
            ],
            jenisBarang: ['Baru', 'Bekas'],
            keamananProduk: ['Produk Tidak Berbahaya', 'Produk Mengandung Bahan Kimia'],
          }
    
       const [popup, setPopup] = useState({
          isOpen: false,
          type: '',
        })
    
        const handleOpenPopup = () => setShowPopup(true)
      const handleClosePopup = () => {
        setShowPopup(false)
        setIsPopupVisible(false)
      }
      const handlePopup = () => {
        setIsPopupVisible((prev) => !prev)
      }
    
      const handleTambahEtalasePopup = () => {
        setIsPopupTambahEtalaseVisible(true)
        setShowPopup(false)
        setIsPopupVisible(false)
      }
    
      const handleClosePopupTambahEtalase = () => {
        setIsPopupTambahEtalaseVisible(false)
      }


return (

    <>
    {/* Satu kotak div */}
    <div className='flex flex-row justify-between items-center px-2'>
        <label
            htmlFor="namaProduk"
            className="text-xs font-medium text-black flex px-1 w-1/2">
            Variasi Item
        </label>
        <div className="flex w-full">
            <button
            type="button"
            onClick={() => setPopup({ isOpen: true, type: 'kategori' })}
            className="w-full border border-gray-300 bg-white w-18 rounded-md p-1.5 text-left text-xs justify-between flex items-center focus:outline-none"
            >
            {formData.kategori || 'Pilih Kategori'}
            {/* SVG Icon */}
            <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2" >
                <path
                d="M8.00042 8.78077L11.3003 5.48096L12.2431 6.42376L8.00042 10.6664L3.75781 6.42376L4.70062 5.48096L8.00042 8.78077Z"
                fill="black"
                />
            </svg>
            </button>
        </div>
    </div>
    </>
);
}
export default TambahStokChildren;