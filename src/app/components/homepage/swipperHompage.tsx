"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";

const SweeperHomepage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    {
      image: "/image/homepage/a.JPG",
    },
    {
      image: "/image/homepage/b.JPG",
    },
    {
      image: "/image/homepage/c.JPG",
    },
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + slides.length) % slides.length
    );
  };

  const goToSlide = (index: React.SetStateAction<number>) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Auto-slide every 5 seconds
    return () => clearInterval(interval); // Clear interval on unmount
  }, []);

  return (
    <div className="absolute  top-0 w-full mx-auto">
      <div className="carousel-inner h-[340px] flex overflow-hidden relative">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`carousel-item w-full absolute top-0 left-0 transition-all duration-500 ease-in-out`}
            style={{
              transform: `translateX(${(index - currentIndex) * 100}%)`,
            }}
          >
            <img
              src={slide.image}
              alt={`Slide ${index + 1}`}
              onError={(e) =>
                (e.currentTarget.src = "/image/toko/slider/default.jpg")
              } // Fallback image
              className="w-full h-[340px] object-cover"
            />
          </div>
        ))}
      </div>

      {/* Left and Right Arrows */}

      {/* Pagination Dots */}
      {/* <div className="flex justify-center mt-2 ">
        {/* {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`dot rounded-full mx-2 ${
              currentIndex === index
                ? "bg-[#51D7B1] w-8 h-3"
                : "bg-gray-400 w-3 h-3"
            }`}
          ></button>
        ))} 
      </div> */}
    </div>
  );
};

export default SweeperHomepage;
