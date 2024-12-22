import { useRouter } from 'next/navigation'
import React from 'react';

interface HeaderProps {
    array: string[]; // Make the title prop optional
}

const CategoryHorizontal: React.FC<HeaderProps> = ({array}) => {
    const router = useRouter();
  
    const handleBack = (e: React.MouseEvent) => {
      e.preventDefault();
      router.back();
    };

    return (
        <>
            <div className="w-full overflow-x-auto py-2 scrollbar-hide">
                <div className="flex space-x-3">
                    {array.map((category, index) => (
                        <button
                            key={index}
                            type="button"
                            className="px-6 py-2 font-nunito text-xs bg-gradient-to-r from-[#83E69B] to-[#00BAE1] text-white rounded-lg whitespace-nowrap" >
                            {category}
                        </button>
                    ))}
                </div>
            </div>
        </>
    )

}

export default CategoryHorizontal;