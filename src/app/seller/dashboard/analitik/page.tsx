'use client';
import DatePicker from '@/app/components/seller/datapicker';
import DatePickerPendapatan from '@/app/components/seller/pendapatan-datapicker';
import RingkasanStatistik from '@/app/components/seller/pendapatan-ringkasan-statistik';
import TabelRincianPendapatan from '@/app/components/seller/pendapatan-tabel-rincian';
import DatePickerProduk from '@/app/components/seller/produk-datapicker';
import StatistikRingkasanProduk from '@/app/components/seller/produk-ringkasan-statistik';
import StatistikRingkasan from '@/app/components/seller/ringkasan-statistik';
import TabelRincian from '@/app/components/seller/tabel-rincian';
import Header from '@/app/layouts/header';
import LayoutUtama from '@/app/layouts/layout-utama';
import React, { useState } from 'react';


type DatePickerProdukProps = {
  startDate: string;
  endDate: string;
  onDateChange: (name: string, value: string) => void;
};

type ExportPopupProps = {
  isOpen: boolean;
  onClose: () => void;
  onExport: (format: 'pdf' | 'excel') => void;
};

const Analytics = () => {
  const [selectedTab, setSelectedTab] = useState('Toko');
  const [startDate, setStartDate] = useState<string>('2024-09-01');
  const [endDate, setEndDate] = useState<string>('2024-09-08');

  const handleDateChange = (name: string, value: string) => {
    if (name === 'startDate') setStartDate(value);
    else setEndDate(value);
  };

  return (
    <LayoutUtama>
      <div className="container mx-auto font-nunito pt-16">
        {/* Header */}
        <Header title="Analitik" children={undefined} />

        {/* Tab Navigation */}
        <div className="mt-6 flex justify-center border-b">
          {['Toko', 'Produk', 'Pendapatan'].map((tab) => (
            <div
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`flex-1 text-center py-2 cursor-pointer text-[14px] font-semibold ${
                selectedTab === tab
                  ? 'border-b-2 border-black text-black'
                  : 'text-gray-500'
              }`}
            >
              {tab}
            </div>
          ))}
        </div>

        {/* Konten Tab Toko */}
        {selectedTab === 'Toko' && (
          <div>
            <DatePicker
              startDate={startDate}
              endDate={endDate}
              onDateChange={handleDateChange}
            />
            <StatistikRingkasan />
            <div className="pt-8 mx-auto p-1 border-b-8 border-[#D7D7D7] w-full"></div>

            <TabelRincian startDate={startDate} endDate={endDate} />
          </div>
        )}
         {selectedTab === 'Produk' && (
          <div>
            <DatePickerProduk
              startDate={startDate}
              endDate={endDate}
              onDateChange={handleDateChange}
            />
            <StatistikRingkasanProduk />
            {/* <TabelRincianProduk startDate={startDate} endDate={endDate} /> */}
          </div>
        )}
        {selectedTab === 'Pendapatan' && (
          <div>
            <DatePickerPendapatan
              startDate={startDate}
              endDate={endDate}
              onDateChange={handleDateChange}
            />
            <RingkasanStatistik />
            <TabelRincianPendapatan />
          </div>
        )}
      </div>
    </LayoutUtama>
  );
};

export default Analytics;
