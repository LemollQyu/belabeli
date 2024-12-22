import { useRouter } from 'next/navigation'
import React from 'react';

// interface HeaderProps {
//     children: React.ReactNode;
//     title?: string; // Make the title prop optional
// }

const Popularcategory = () => {

    return (
        <>
        <div className="flex flex-wrap py-1 justify-start">
            <span className="font-bold">Pencarian Terpopuler</span>
        </div>
        
        <div className="flex flex-wrap justify-between py-2">
            <a className="flex flex-wrap items-center justify-center cursor-pointer">
                <button type="button" className="h-fit w-fit p-3 bg-[#EAFBEE] rounded-full">
                    <svg width="20" height="19" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.16667 0.5V13.8333H15.5V15.5H0.5V0.5H2.16667ZM14.9108 3.24407L16.0893 4.42259L11.3333 9.1785L8.83333 6.67917L5.25593 10.2559L4.07741 9.07742L8.83333 4.32149L11.3333 6.82083L14.9108 3.24407Z" fill="#51D7B1"/>
                    </svg>
                </button>
                <span className="font-light text-gray-600 text-center ml-4">Otomotif</span>
            </a>
            </div>

            <div className="flex flex-wrap justify-between py-2">
            <a className="flex flex-wrap items-center justify-center cursor-pointer">
                <button type="button" className="h-fit w-fit p-3 bg-[#EAFBEE] rounded-full">
                    <svg width="20" height="19" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.16667 0.5V13.8333H15.5V15.5H0.5V0.5H2.16667ZM14.9108 3.24407L16.0893 4.42259L11.3333 9.1785L8.83333 6.67917L5.25593 10.2559L4.07741 9.07742L8.83333 4.32149L11.3333 6.82083L14.9108 3.24407Z" fill="#51D7B1"/>
                    </svg>
                </button>
                <span className="font-light text-gray-600 text-center ml-4">Peralatan Rumah Tangga</span>
            </a>
            </div>

            <div className="flex flex-wrap justify-between py-2">
            <a className="flex flex-wrap items-center justify-center cursor-pointer">
                <button type="button" className="h-fit w-fit p-3 bg-[#EAFBEE] rounded-full">
                    <svg width="20" height="19" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.16667 0.5V13.8333H15.5V15.5H0.5V0.5H2.16667ZM14.9108 3.24407L16.0893 4.42259L11.3333 9.1785L8.83333 6.67917L5.25593 10.2559L4.07741 9.07742L8.83333 4.32149L11.3333 6.82083L14.9108 3.24407Z" fill="#51D7B1"/>
                    </svg>
                </button>
                <span className="font-light text-gray-600 text-center ml-4">Tas Wanita</span>
            </a>
            </div>
        </>
    )

}

export default Popularcategory;