import React, { useEffect, useState } from "react";

interface Category {
  id: number;
  name: string;
}

interface CategoryBarProps {
  title: string;
  array: Category[];
}

const CategoryBar: React.FC<CategoryBarProps> = ({ title, array }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null); 

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleButtonClick = (id: number) => {
    if (selectedId === id) {
      setSelectedId(null);
      localStorage.removeItem("category");
    } else {
      setSelectedId(id);
      localStorage.setItem("category", `category=${id}`);
    }
  };

  useEffect(() => {
    const lastCategory = localStorage.getItem("category") || '';
    const clearedCategory = lastCategory.replace("category=", "");
    setSelectedId(Number(clearedCategory)); 
  }, []);

  const rotateClass = isOpen ? "rotate-180" : "";

  return (
    <div className="overflow-auto">
      <div className="flex flex-wrap py-1 justify-start">
        <span className="font-bold text-sm">{title}</span>
      </div>

      <div className="flex flex-wrap justify-evenly py-2 gap-2">
        {array.slice(0, 4).map((category) => (
          <button
            key={category.id}
            type="button"
            onClick={() => handleButtonClick(category.id)}
            className={`h-fit w-fit py-2 px-8 ${
              selectedId === category.id ? "bg-[#BFEDE0]" : "bg-[#E2F8F2]"
            } text-[#1C785E] text-xs rounded-lg cursor-pointer`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {isOpen && (
        <div className="flex flex-wrap justify-evenly py-2 gap-3">
          {array.slice(4).map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => handleButtonClick(category.id)}
              className={`h-fit w-fit py-2 px-8 ${
                selectedId === category.id ? "bg-[#BFEDE0]" : "bg-[#E2F8F2]"
              } text-[#1C785E] text-xs rounded-lg cursor-pointer`}
            >
              {category.name}
            </button>
          ))}
        </div>
      )}

      {array.length > 4 && (
        <div className="text-center mt-2 flex justify-center items-center">
          <a
            onClick={toggleDropdown}
            className="text-[#949494] cursor-pointer justify-center text-xs items-center mr-2"
          >
            Lihat Lainnya
          </a>
          <svg
            className={`${rotateClass}`}
            width="8"
            height="5"
            viewBox="0 0 8 5"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.99988 3.2306L6.88726 0.343262L7.71221 1.16822L3.99988 4.88056L0.287598 1.16822L1.11255 0.343262L3.99988 3.2306Z"
              fill="#A9A9A9"
            />
          </svg>
        </div>
      )}
    </div>
  );
};

export default CategoryBar;