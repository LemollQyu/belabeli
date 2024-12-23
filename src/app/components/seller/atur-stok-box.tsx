

type DatePickerProps = {
    itemName: string;
  };

  const baseURL = window.location.origin;
  
  const AturStokBox = ({ itemName }: DatePickerProps) => (
    <div onClick={() => (window.location.href = baseURL+'/seller/dashboard/kelola-produk/semua-produk/tambah-produk/atur-stok/tambah-stok')} className='cursor-pointer bg-white border-2 border-gray-300 py-7 px-3 flex flex-col items-center justify-center rounded-md'>
        <svg  className='flex' width="31" height="30" viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.417 12.9165V0.416504H17.5837V12.9165H30.0837V17.0832H17.5837V29.5832H13.417V17.0832H0.916992V12.9165H13.417Z" fill="#A9A9A9"/>
        </svg>
        <span className='flex text-[10px] mt-2 font-semibold text-[#A9A9A9]'>{itemName}</span>
    </div>
  );
  
  export default AturStokBox;
  