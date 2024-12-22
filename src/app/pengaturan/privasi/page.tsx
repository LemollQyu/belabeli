'use client';
import LayoutUtama from '@/app/layouts/layout-utama';
import Header from '@/app/layouts/header';
import { useState } from 'react';

const Privasi = () => {
  const [checkedPrivacyOptions, setCheckedPrivacyOptions] = useState<boolean[]>(new Array(4).fill(false));

  const handlePrivacyOptionChange = (index: number) => {
    const updatedCheckedOptions = [...checkedPrivacyOptions];
    updatedCheckedOptions[index] = !updatedCheckedOptions[index];
    setCheckedPrivacyOptions(updatedCheckedOptions);
  };

  return (
    <LayoutUtama>
      <Header title="Privasi" children={undefined} />
      <div className="container w-[400px] mx-auto p-4 font-nunito mt-20">
        <div className="text-black text-[16px] font-bold leading-[21px] mb-4">
          Sembunyikan
        </div>
        <div className="text-[#1b1e28] text-[13px] font-light leading-[18px] mb-4">
          Kemampuan untuk ditemukan
        </div>

        <div className="text-black text-[14px] font-bold leading-[21px] mb-4">
          Akun Privat
        </div>
        <div className="text-[#1b1e28] text-[13px] font-light leading-[18px] mb-4">
          Dengan akun privat, hanya pengguna yang disetujui yang dapat mengikuti Anda serta melihat video Anda. Pengikut Anda yang sudah ada tidak akan terpengaruh.
        </div>

        {/* Bagian untuk Checkbox */}
        <Section
          title=""
          itemTitles={['Sembunyikan daftar pengikut', 'Tidak terlihat oleh teman', 'Sembunyikan aktivitas saya', 'Sembunyikan komentar saya']}
          checkedItems={checkedPrivacyOptions}
          onCheckboxChange={handlePrivacyOptionChange}
        />
      </div>
    </LayoutUtama>
  );
};

interface SectionProps {
  title: string;
  itemTitles: string[];
  checkedItems: boolean[];
  onCheckboxChange: (index: number) => void;
}

const Section: React.FC<SectionProps> = ({ title, itemTitles, checkedItems, onCheckboxChange }) => (
  <div className="mb-4">
    {title && (
      <div className="text-black text-[14px] font-bold leading-[21px] mb-2 mt-4">
        {title}
      </div>
    )}
    {itemTitles.map((item, index) => (
      <NotificationItem
        key={item}
        title={item}
        isChecked={checkedItems[index]}
        onCheckboxChange={() => onCheckboxChange(index)}
      />
    ))}
  </div>
);

interface NotificationItemProps {
  title: string;
  isChecked: boolean;
  onCheckboxChange: () => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ title, isChecked, onCheckboxChange }) => (
  <div className="flex justify-between items-center mb-2 cursor-pointer" onClick={onCheckboxChange}>
    <div className="text-black text-[14px] font-semibold leading-[18px]">{title}</div>
    <div className="w-[24px] h-[24px] flex justify-center items-center">
      {isChecked ? (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11.0026 16L18.0737 8.92893L16.6595 7.51472L11.0026 13.1716L8.17421 10.3431L6.75999 11.7574L11.0026 16Z" fill="#51D7B1" />
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 16.5C4.85786 16.5 1.5 13.1421 1.5 9C1.5 4.85786 4.85786 1.5 9 1.5C13.1421 1.5 16.5 4.85786 16.5 9C16.5 13.1421 13.1421 16.5 9 16.5ZM9 15C12.3137 15 15 12.3137 15 9C15 5.68629 12.3137 3 9 3C5.68629 3 3 5.68629 3 9C3 12.3137 5.68629 15 9 15ZM8.25195 12L5.06999 8.81805L6.13066 7.75732L8.25195 9.8787L12.4946 5.63604L13.5553 6.6967L8.25195 12Z" fill="black" />
        </svg>
      )}
    </div>
  </div>
);

export default Privasi;
