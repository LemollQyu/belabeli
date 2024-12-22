import React, { useState } from 'react';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';

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

const ExportPopup = ({ isOpen, onClose, onExport }: ExportPopupProps) => {
  const [selectedFormat, setSelectedFormat] = useState<'pdf' | 'excel' | null>(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-end justify-center z-50 font-nunito">
      {/* Background Overlay */}
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>

      {/* Popup Content */}
      <div className="bg-white p-6 h-[340px] text-black rounded-t-[24px] w-full max-w-md shadow-lg relative overflow-hidden animate-slide-up flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-[16px] text-black font-semibold">Export As</h1>
          <svg
            onClick={onClose}
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            className="cursor-pointer"
          >
            <path
              d="M6.99976 5.46871L12.362 0.106445L13.8941 1.63851L8.53181 7.00076L13.8941 12.3629L12.362 13.895L6.99976 8.53281L1.63754 13.895L0.105469 12.3629L5.46771 7.00076L0.105469 1.63851L1.63754 0.106445L6.99976 5.46871Z"
              fill="black"
            />
          </svg>
        </div>

        {/* Isi Konten */}
        <div className="w-full max-h-[200px] overflow-y-auto border text-sm rounded-[8px] font-medium p-3 text-left">
          <div>
            <label className="text-md block mb-2 font-semibold">Pilih Format Export</label>
            <div className='p-1'>
              <input
                type="radio"
                id="excel"
                name="exportFormat"
                checked={selectedFormat === 'excel'}
                onChange={() => setSelectedFormat('excel')}
                className="mr-2"
              />
              <label htmlFor="excel">Export Dalam Excel</label>
            </div>
            <div className='p-1'>
              <input
                type="radio"
                id="pdf"
                name="exportFormat"
                checked={selectedFormat === 'pdf'}
                onChange={() => setSelectedFormat('pdf')}
                className="mr-2"
              />
              <label htmlFor="pdf">Export Dalam PDF</label>
            </div>
          </div>
        </div>

        {/* Button */}
        <button
          onClick={() => {
            if (selectedFormat) {
              onExport(selectedFormat);
              onClose();
            } else {
              alert('Pilih format export terlebih dahulu.');
            }
          }}
          className="mt-auto w-full h-[45px] rounded-md bg-[#51D7B1] text-white flex justify-center items-center"
        >
          Pilih
        </button>
      </div>
    </div>
  );
};


const DatePickerProduk = ({
  startDate,
  endDate,
  onDateChange,
}: DatePickerProdukProps) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleExport = (format: 'pdf' | 'excel') => {
    if (format === 'pdf') {
      exportPDF();
    } else if (format === 'excel') {
      exportExcel();
    }
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text('PDF Export', 10, 10);
    doc.save('laporan.pdf');
  };

  const exportExcel = () => {
    const data = [
      ['Start Date', 'End Date'],
      [startDate, endDate],
    ];
    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Laporan');
    XLSX.writeFile(wb, 'laporan.xlsx');
  };

  return (
    <div className="pt-4 px-4 w-full flex justify-between items-center">
      <div className="w-[260px] max-w-md flex items-center justify-between border p-1 rounded-md shadow-sm">
        <input
          type="date"
          name="startDate"
          value={startDate}
          onChange={(e) => onDateChange(e.target.name, e.target.value)}
          className="w-1/2 border-none text-[12px] p-1 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
        />
        <span className="mx-2 text-gray-500 text-[12px]">-</span>
        <input
          type="date"
          name="endDate"
          value={endDate}
          onChange={(e) => onDateChange(e.target.name, e.target.value)}
          className="w-1/2 border-none text-[12px] p-1 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
        />
      </div>
      <button
        onClick={() => setIsPopupOpen(true)}
        className="ml-1 bg-[#51d7b1] text-white p-2 rounded-md text-[12px] hover:bg-emerald-600"
      >
        Export Laporan
      </button>

      <ExportPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onExport={handleExport}
      />
    </div>
  );
};

export default DatePickerProduk;
