'use client';
import LayoutUtama from '@/app/layouts/layout-utama';
import Header from '@/app/layouts/header';
import { useState } from 'react';

const Notifikasi = () => {
  const notificationItems = [
    'Bunyi Notifikasi',
    'Status Pesanan',
    'Info Keuangan',
    'Chat',
    'Promo Terbaru',
  ];

  // State untuk menyimpan status checkbox
  const [checkedItems, setCheckedItems] = useState<boolean[]>(new Array(notificationItems.length).fill(false));
  const [checkedAppNotifications, setCheckedAppNotifications] = useState<boolean[]>(new Array(2).fill(false)); // Untuk Notifikasi Aplikasi
  const [checkedWhatsAppNotifications, setCheckedWhatsAppNotifications] = useState<boolean[]>(new Array(2).fill(false)); // Untuk Notifikasi WhatsApp

  const handleCheckboxChange = (index: number) => {
    const updatedCheckedItems = [...checkedItems];
    updatedCheckedItems[index] = !updatedCheckedItems[index];
    setCheckedItems(updatedCheckedItems);
  };

  const handleAppNotificationChange = (index: number) => {
    const updatedCheckedItems = [...checkedAppNotifications];
    updatedCheckedItems[index] = !updatedCheckedItems[index];
    setCheckedAppNotifications(updatedCheckedItems);
  };

  const handleWhatsAppNotificationChange = (index: number) => {
    const updatedCheckedItems = [...checkedWhatsAppNotifications];
    updatedCheckedItems[index] = !updatedCheckedItems[index];
    setCheckedWhatsAppNotifications(updatedCheckedItems);
  };

  return (
    <LayoutUtama>
      <Header title="Notifikasi" children={undefined} />
      <div className="container w-[400px] mx-auto p-4 font-nunito mt-20">
        <div className="text-black text-sm font-bold leading-[21px] mb-2">
          Notifikasi Aplikasi
        </div>
        <div className="text-[#1b1e28] text-xs font-light leading-[18px] mb-4">
          Setting bunyi notifikasi, info status pesanan, info keuangan,
          notifikasi chat, info voucher dan promo terbaru
        </div>
        <div className="flex flex-col gap-2 mb-4">
          {notificationItems.map((item, index) => (
            <div 
              key={item} 
              className="flex justify-between items-center cursor-pointer" 
              onClick={() => handleCheckboxChange(index)}
            >
              <div className="text-black text-xs font-semibold leading-[18px]">
                {item}
              </div>
              <div className="w-[24px] h-[24px] flex justify-center items-center">
                {checkedItems[index] ? (
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
          ))}
        </div>

        {/* Bagian ini untuk Section Aplikasi */}
        <Section 
          title="Notifikasi Aplikasi" 
          checkedItems={checkedAppNotifications} 
          onCheckboxChange={handleAppNotificationChange}
          itemTitles={['Status Pesanan', 'Promosi dan Penawaran']}
        />

        {/* Bagian ini untuk Section WhatsApp */}
        <Section 
          title="Notifikasi WhatsApp" 
          checkedItems={checkedWhatsAppNotifications} 
          onCheckboxChange={handleWhatsAppNotificationChange}
          itemTitles={['Chat', 'Promo Terbaru']}
        />
      </div>
    </LayoutUtama>
  );
};

interface SectionProps {
  title: string;
  checkedItems: boolean[];
  onCheckboxChange: (index: number) => void;
  itemTitles: string[];
}

const Section: React.FC<SectionProps> = ({ title, checkedItems, onCheckboxChange, itemTitles }) => (
  <div className="mb-4">
    <div className="text-black text-[14px] font-bold leading-[21px] mb-2 mt-8">
      {title}
    </div>
    <div className="text-[#1b1e28] text-xs font-light leading-[18px] mb-2">
      Info status pesanan, info promosi dan penawaran
    </div>
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
  <div className="flex justify-between items-center mb-1 cursor-pointer" onClick={onCheckboxChange}>
    <div className="text-black text-xs font-semibold leading-[18px]">{title}</div>
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

export default Notifikasi;
