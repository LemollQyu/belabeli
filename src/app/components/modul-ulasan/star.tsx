import { useState } from "react";

interface StarRatingProps {
  onRatingChange: (rating: number | null) => void;
}

const StarRating: React.FC<StarRatingProps> = ({ onRatingChange }) => {
  const [rating, setRating] = useState<number | null>(null);
  const [hover, setHover] = useState<number | null>(null);

  // data bintang di value rating
  console.log(rating);

  function valueRate() {
    if (rating === 1) {
      return <p className="text-[#09CBCA] text-[10px]">Sangat Buruk</p>;
    } else if (rating === 2) {
      return <p className="text-[#09CBCA] text-[10px]">Buruk</p>;
    } else if (rating === 3) {
      return <p className="text-[#09CBCA] text-[10px]">Biasa</p>;
    } else if (rating === 4) {
      return <p className="text-[#09CBCA] text-[10px]">Baik</p>;
    } else if (rating === 5) {
      return <p className="text-[#09CBCA] text-[10px]">Sangat Baik</p>;
    }
    return null;
  }

  const starSVG = (filled: boolean) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="23"
      viewBox="0 0 24 23"
      fill="none"
      className="w-6 h-6"
    >
      <path
        d="M12.0006 18.26L4.94715 22.2082L6.52248 14.2799L0.587891 8.7918L8.61493 7.84006L12.0006 0.5L15.3862 7.84006L23.4132 8.7918L17.4787 14.2799L19.054 22.2082L12.0006 18.26Z"
        fill={filled ? "#F7D463" : "#e4e5e9"}
      />
    </svg>
  );

  return (
    <div className="flex items-center justify-between ">
      <div className="flex gap-[2px]">
        {[...Array(5)].map((_, index) => {
          const ratingValue = index + 1;
          const isFilled = ratingValue <= (hover ?? rating ?? 0);

          return (
            <label key={index}>
              <input
                type="radio"
                name="rating"
                value={ratingValue}
                onClick={() => {
                  setRating(ratingValue);
                  onRatingChange(ratingValue); // Panggil callback saat rating berubah
                }}
                className="hidden"
              />
              <div
                className="cursor-pointer"
                onMouseEnter={() => setHover(ratingValue)}
                onMouseLeave={() => setHover(null)}
              >
                {starSVG(isFilled)}
              </div>
            </label>
          );
        })}
      </div>
      {valueRate()}
    </div>
  );
};

export default StarRating;
