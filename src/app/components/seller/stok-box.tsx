

type DatePickerProps = {
    itemName: string;
  };
  
  const StokBox = ({ itemName }: DatePickerProps) => (
    <div className='bg-white border-2 cursor-pointer border-gray-300 py-7 px-3 flex flex-col items-center justify-center rounded-md'>
        <svg width="41" height="46" viewBox="0 0 41 46" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20.4997 0.0834961L40.2913 11.5418V34.4585L20.4997 45.9168L0.708008 34.4585V11.5418L20.4997 0.0834961ZM6.94526 12.7454L20.4999 20.5927L34.0543 12.7455L20.4997 4.89808L6.94526 12.7454ZM4.87467 16.3612V32.0562L18.4166 39.8962V24.2012L4.87467 16.3612ZM22.5832 39.896L36.1247 32.0562V16.3614L22.5832 24.2012V39.896Z" fill="#51D7B1"/>
        </svg>
        <span className='flex text-[10px] mt-2 font-semibold text-[#A9A9A9]'>{itemName}</span>
    </div>
  );
  
  export default StokBox;
  