import React, { useEffect, useState } from "react";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { TrashFill } from 'react-bootstrap-icons';
import { CheckCircleFill } from 'react-bootstrap-icons';

const CategoryPrice = () => {
    const [priceStart, setPriceStart] = useState<string>('');
    const [priceEnd, setPriceEnd] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [notif, setNotif] = useState<string>('');

    const handlePriceChange = (setter: React.Dispatch<React.SetStateAction<string>>) => 
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value.replace(/[^0-9]/g, ''); // Hanya angka
            setter(value);
        };

    const handleDeleteClick = () => {

        localStorage.removeItem("minMaxPrice");
        setPriceStart('');
        setPriceEnd('');
        setNotif('Rentang harga berhasil dihapus')
    }

    const handleClick = () => {
        const start = Number(priceStart);
        const end = Number(priceEnd);

        if (!start || !end) {
            setError("Harga tidak boleh 0 atau kosong!");
            return;
        }

        if (end <= start) {
            setError("Harga akhir harus lebih kecil dari harga awal!");
            return;
        }

        localStorage.setItem("minMaxPrice", `minMaxPrice=${start}-${end}`);

        setNotif('Rentang harga berhasil diatur')

        // setError('');
        // alert(`Rentang harga berhasil disimpan: Rp ${start.toLocaleString('id-ID')} - Rp ${end.toLocaleString('id-ID')}`);
    };

    useEffect(() => {
        const lastPrices = localStorage.getItem("minMaxPrice") || ''; 
        const clearedLastPrices = lastPrices.replace("minMaxPrice=", "");
        
        if (clearedLastPrices) {
          const [priceStart, priceEnd] = clearedLastPrices.split("-");
          setPriceStart(priceStart); // Assign the start price
          setPriceEnd(priceEnd);     // Assign the end price
        }
      }, []);

    return (
        <div className="overflow-auto">
            <div className="flex flex-wrap py-5 justify-start">
                <span className="font-bold text-sm">Rentang Harga</span>
            </div>
            <div className="flex flex-col gap-1">
                <div className="flex flex-row gap-1 items-center justify-center">
                    <input
                        type="text"
                        value={priceStart}
                        onChange={handlePriceChange(setPriceStart)}
                        className="bg-gray-100 rounded-md w-[110px] px-3 h-8 flex text-sm"
                    />
                    <span>-</span>
                    <input
                        type="text"
                        value={priceEnd}
                        onChange={handlePriceChange(setPriceEnd)}
                        className="bg-gray-100 rounded-md w-[110px] px-3 h-8 flex text-sm"
                    />
                    <button
                        onClick={handleClick}
                        className="bg-[#1C785E] text-[#E2F8F2] rounded-md px-4 py-2 text-sm flex"
                    >
                        <CheckCircleFill></CheckCircleFill>
                    </button>

                    <button
                        onClick={handleDeleteClick}
                        className="bg-red-500 text-[#E2F8F2] rounded-md px-4 py-2 text-sm flex"
                    >
                      <TrashFill></TrashFill>
                    </button>
                </div>
                {error && <span className="text-red-500 text-sm">{error}</span>}
                {notif && <span className="text-green-500 text-sm">{notif}</span>}
            </div>
        </div>
    );
};

export default CategoryPrice;