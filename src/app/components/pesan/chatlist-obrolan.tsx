import Link from 'next/dist/client/link';
import { useRouter } from 'next/navigation'
import React from 'react';

interface ChatlistObrolanProps {
    status?: Boolean; // Make the title prop optional
}

const ChatlistObrolan: React.FC<ChatlistObrolanProps> = ({status}) => {
    const router = useRouter();

    const handleBack = (e: React.MouseEvent) => {
        e.preventDefault();
        router.back();
    };

    if (status){
        return (
            <>
            <Link href="/pesan/obrolan">
                <div className="flex flex-wrap justify-between py-2 cursor-pointer mt-2">
                    <a className="flex flex-wrap items-center justify-evenly">
                        <button className="bg-[#E2F8F2] p-4 rounded-full">
                            <svg width="18" height="18" viewBox="0 0 16 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16 21H0V19C0 16.2386 2.23858 14 5 14H11C13.7614 14 16 16.2386 16 19V21ZM8 12C4.68629 12 2 9.3137 2 6C2 2.68629 4.68629 0 8 0C11.3137 0 14 2.68629 14 6C14 9.3137 11.3137 12 8 12Z" fill="#51D7B1"/>
                            </svg>
                        </button>
                        <span className="items-center">
                            <p className="font-bold text-black text-left text-md ml-4">Annas</p>
                            <p className="font-light text-gray-400 text-left text-sm ml-4">Selamat sore bapak Anas</p>
                        </span>
                        
                    </a>
                    <a>
                        <span className="items-start">
                            <p className="text-sm text-[#51D7B1] font-semibold">15:15</p>
                            <button className="bg-[#51D7B1] text-white text-[10px] py-1 px-2 rounded-full">2</button>
                        </span>
                    </a>
                </div>
            </Link>
            </>
        )
    }else{
        return (
            <>
            <Link href="/pesan/obrolan">
                <div className="flex flex-wrap justify-between py-2 cursor-pointer mt-2">
                    <a className="flex flex-wrap items-center justify-evenly">
                        <button className="bg-[#E2F8F2] p-4 rounded-full">
                            <svg width="18" height="18" viewBox="0 0 16 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16 21H0V19C0 16.2386 2.23858 14 5 14H11C13.7614 14 16 16.2386 16 19V21ZM8 12C4.68629 12 2 9.3137 2 6C2 2.68629 4.68629 0 8 0C11.3137 0 14 2.68629 14 6C14 9.3137 11.3137 12 8 12Z" fill="#51D7B1"/>
                            </svg>
                        </button>
                        <span className="items-center">
                            <p className="font-bold text-black text-left text-md ml-4">Annas</p>
                            <p className="font-light text-gray-400 text-left text-sm ml-4">Selamat sore bapak Anas</p>
                        </span>
                    </a>
                    <a>
                        <span className="items-start">
                            <p className="text-sm text-gray-400 font-light">15:15</p>
                        </span>
                    </a>
                </div>
            </Link>
            </>
        )
    }
}

export default ChatlistObrolan;

