"use client";

import { useState, useEffect } from "react";
// untuk detik jam di flash shale

interface CountdownTimerProps {
  initialTime: number;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ initialTime }) => {
  // State untuk menyimpan waktu yang tersisa dalam detik
  const [timeLeft, setTimeLeft] = useState<number>(initialTime);

  useEffect(() => {
    // Interval untuk mengurangi waktu setiap detik
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => Math.max(prevTime - 1, 0));
    }, 1000);

    // Membersihkan interval saat komponen di-unmount
    return () => clearInterval(interval);
  }, []);

  // Mengonversi detik ke jam, menit, dan detik
  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = Math.floor(timeLeft % 60);

  return (
    <div className="font-nunitoBold text-[10px]">
      <p>
        {String(hours).padStart(2, "0")}:{String(minutes).padStart(2, "0")}:
        {String(seconds).padStart(2, "0")}
      </p>
    </div>
  );
};

export default CountdownTimer;
