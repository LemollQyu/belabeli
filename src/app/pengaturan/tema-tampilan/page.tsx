"use client"
import { useState } from 'react';
import LayoutUtama from '@/app/layouts/layout-utama';
import Header from '@/app/layouts/header';

const TemaTampilan = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <LayoutUtama>
      <Header title="Tema" children={undefined} />
      <div className={`flex flex-col items-center justify-center h-screen ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
        <h2 className={`text-[18px] font-nunito font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>Pilih Tema Tampilan</h2>
        <div className="flex items-center mt-4">
          <span className={`mr-2 ${isDarkMode ? 'text-white' : 'text-black'}`}>
            {isDarkMode ? '🌙' : '☀️'}
          </span>
          <button 
            onClick={toggleTheme} 
            className={`w-16 h-8 rounded-full flex items-center p-1 transition-colors ${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'}`}
          >
            <div className={`w-6 h-6 rounded-full transition-transform ${isDarkMode ? 'transform translate-x-8 bg-white' : 'bg-yellow-500'}`} />
          </button>
        </div>
      </div>
    </LayoutUtama>
  );
};

export default TemaTampilan;
