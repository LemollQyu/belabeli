import { useRouter } from 'next/navigation'
import React from 'react';

// interface HeaderProps {
//     children: React.ReactNode;
//     title?: string; // Make the title prop optional
// }

const Searchcategory = () => {

    return (
        <>
        <div className="flex flex-wrap py-1 justify-start">
            <span className="font-bold">Semua Kategori</span>
        </div>
        
        <div className="flex flex-wrap justify-between py-2">
            <a className="flex flex-wrap items-center justify-center cursor-pointer">
                <button type="button" className="h-fit w-fit p-3 bg-[#EAFBEE] rounded-full">
                    <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 17H5V18C5 18.5523 4.55228 19 4 19H2C1.44772 19 1 18.5523 1 18V9H0V5H1V2C1 0.89543 1.89543 0 3 0H17C18.1046 0 19 0.89543 19 2V5H20V9H19V18C19 18.5523 18.5523 19 18 19H16C15.4477 19 15 18.5523 15 18V17ZM3 2V9H17V2H3ZM5.5 15C6.32843 15 7 14.3284 7 13.5C7 12.6716 6.32843 12 5.5 12C4.67157 12 4 12.6716 4 13.5C4 14.3284 4.67157 15 5.5 15ZM14.5 15C15.3284 15 16 14.3284 16 13.5C16 12.6716 15.3284 12 14.5 12C13.6716 12 13 12.6716 13 13.5C13 14.3284 13.6716 15 14.5 15Z" fill="#51D7B1"/>
                    </svg>
                </button>
                <span className="font-light text-gray-600 text-center ml-4">Otomotif</span>
            </a>
            </div>

            <div className="flex flex-wrap justify-between py-2">
            <a className="flex flex-wrap items-center justify-center cursor-pointer">
                <button type="button" className="h-fit w-fit p-3 bg-[#EAFBEE] rounded-full">
                    <svg width="20" height="17" viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.6668 15.6667C16.6668 16.1269 16.2937 16.5 15.8335 16.5H4.16683C3.7066 16.5 3.3335 16.1269 3.3335 15.6667V8.16669H0.833496L9.43958 0.342939C9.75741 0.0539811 10.2429 0.0539811 10.5607 0.342939L19.1668 8.16669H16.6668V15.6667ZM6.66683 11.5V13.1667H13.3335V11.5H6.66683Z" fill="#51D7B1"/>
                    </svg>
                </button>
                <span className="font-light text-gray-600 text-center ml-4">Peralatan Rumah Tangga</span>
            </a>
            </div>

            <div className="flex flex-wrap justify-between py-2">
            <a className="flex flex-wrap items-center justify-center cursor-pointer">
                <button type="button" className="h-fit w-fit p-3 bg-[#EAFBEE] rounded-full">
                    <svg width="16" height="19" viewBox="0 0 16 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.00392 0.833008C10.3051 0.833008 12.1706 2.69849 12.1706 4.99967V6.66634H14.6706C15.1308 6.66634 15.5039 7.03944 15.5039 7.49967V17.4997C15.5039 17.9599 15.1308 18.333 14.6706 18.333H1.33724C0.877006 18.333 0.503906 17.9599 0.503906 17.4997V7.49967C0.503906 7.03944 0.877006 6.66634 1.33724 6.66634H3.83724V4.99967C3.83724 2.69849 5.70272 0.833008 8.00392 0.833008ZM12.1706 9.16635H10.5039V9.99968C10.5039 10.4599 10.877 10.833 11.3373 10.833C11.7646 10.833 12.1168 10.5113 12.165 10.0968L12.1706 9.99968V9.16635ZM5.50391 9.16635H3.83724V9.99968C3.83724 10.4599 4.21034 10.833 4.67057 10.833C5.09794 10.833 5.45016 10.5113 5.4983 10.0968L5.50391 9.99968V9.16635ZM8.00392 2.49967C6.67251 2.49967 5.58419 3.54044 5.50816 4.85278L5.50391 4.99967V6.66634H10.5039V4.99967C10.5039 3.66827 9.46317 2.57995 8.15084 2.50392L8.00392 2.49967Z" fill="#51D7B1"/>
                    </svg>
                </button>
                <span className="font-light text-gray-600 text-center ml-4">Tas Wanita</span>
            </a>
            </div>

            <div className="flex flex-wrap justify-between py-2">
            <a className="flex flex-wrap items-center justify-center cursor-pointer">
                <button type="button" className="h-fit w-fit p-3 bg-[#EAFBEE] rounded-full">
                    <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.0944 3.16674L14.2666 0.99457C14.592 0.669128 15.1197 0.669128 15.4451 0.99457L18.9807 4.5301C19.3061 4.85554 19.3061 5.38318 18.9807 5.70861L15.8322 8.85709V16.5001C15.8322 16.9603 15.4591 17.3334 14.9988 17.3334H4.99884C4.5386 17.3334 4.1655 16.9603 4.1655 16.5001V8.85709L1.01703 5.70861C0.691589 5.38318 0.691589 4.85554 1.01703 4.5301L4.55256 0.99457C4.878 0.669128 5.40564 0.669128 5.73107 0.99457L7.90324 3.16674H12.0944Z" fill="#51D7B1"/>
                    </svg>
                </button>
                <span className="font-light text-gray-600 text-center ml-4">Pakaian</span>
            </a>
            </div>

            <div className="flex flex-wrap justify-between py-2">
            <a className="flex flex-wrap items-center justify-center cursor-pointer">
                <button type="button" className="h-fit w-fit p-3 bg-[#EAFBEE] rounded-full">
                    <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.2727 0H5.72727C3.91979 0 2.45455 1.59188 2.45455 3.55556V4.44444C4.71389 4.44444 6.54545 6.43431 6.54545 8.88889H11.4545C11.4545 6.43431 13.2861 4.44444 15.5455 4.44444V3.55556C15.5455 1.59188 14.0802 0 12.2727 0ZM15.5455 6.22222C14.1898 6.22222 13.0909 7.41609 13.0909 8.88889V11.5556H11.4545V10.6667H6.54545V11.5556H4.90909V8.88889C4.90909 7.41609 3.81015 6.22222 2.45455 6.22222C1.09894 6.22222 0 7.41609 0 8.88889C0 10.05 0.683026 11.0378 1.63636 11.4038V16H3.27273V15.1111H14.7273V16H16.3636V11.4038C17.317 11.0378 18 10.05 18 8.88889C18 7.41609 16.9011 6.22222 15.5455 6.22222Z" fill="#51D7B1"/>
                    </svg>
                </button>
                <span className="font-light text-gray-600 text-center ml-4">Perabotan</span>
            </a>
            </div>
        </>
    )

}

export default Searchcategory;