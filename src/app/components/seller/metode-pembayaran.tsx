'use client'
import React, { useState } from 'react'

interface PaymentDropdownProps {
  onPaymentSelect?: (method: string) => void
}

const PaymentDropdown: React.FC<PaymentDropdownProps> = ({
  onPaymentSelect,
}) => {
  const [isVirtualAccountOpen, setIsVirtualAccountOpen] = useState<boolean>(
    false,
  )
  const [isBankTransferOpen, setIsBankTransferOpen] = useState<boolean>(false)
  const [selectedPayment, setSelectedPayment] = useState<string>('')

  const handlePaymentSelect = (method: string) => {
    setSelectedPayment(method)
    setIsVirtualAccountOpen(false)
    setIsBankTransferOpen(false)
    console.log('Selected payment method:', method)

    // Jika onPaymentSelect ada, panggil fungsi ini
    if (onPaymentSelect) {
      onPaymentSelect(method)
    }
  }
  const handleToggleDropdown = (dropdown: string) => {
    if (dropdown === 'virtualAccount') {
      setIsVirtualAccountOpen(!isVirtualAccountOpen)
      setIsBankTransferOpen(false)
    } else if (dropdown === 'bankTransfer') {
      setIsBankTransferOpen(!isBankTransferOpen)
      setIsVirtualAccountOpen(false)
    }
  }

  return (
    <div className="container mx-auto font-nunito">
      {/* <div className="rounded-lg shadow-[0_0_4px_rgba(0,0,0,0.25)]"> */}
        <div className="p-4 border-gray-300 relative ">
          {/* Virtual Account Dropdown */}
          <div className="mb-2">
            <button
              className="flex justify-between items-center py-2 px-4 w-full bg-white border-gray-200 bg-[#FDFDFD] shadow-[0_0_4px_rgba(0,0,0,0.25)] rounded-md"
              onClick={() => handleToggleDropdown('virtualAccount')}
            >
              <span className="py-2 flex items-center gap-2">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect y="0.5" width="24" height="23" rx="4" fill="#51D7B1" />
                  <path
                    d="M8.67004 15.59C8.45671 15.59 8.28004 15.5433 8.14004 15.45C8.00671 15.35 7.89671 15.2 7.81004 15L5.29004 9.4C5.19671 9.2 5.17004 9.02333 5.21004 8.87C5.25004 8.71 5.33337 8.58667 5.46004 8.5C5.58671 8.40667 5.74004 8.36 5.92004 8.36C6.14671 8.36 6.32004 8.41333 6.44004 8.52C6.56004 8.62 6.66004 8.77 6.74004 8.97L8.95004 14.08H8.45004L10.66 8.96C10.7467 8.76 10.85 8.61 10.97 8.51C11.09 8.41 11.2567 8.36 11.47 8.36C11.65 8.36 11.7967 8.40667 11.91 8.5C12.03 8.58667 12.1034 8.71 12.13 8.87C12.1634 9.02333 12.1367 9.2 12.05 9.4L9.53004 15C9.43671 15.2 9.32337 15.35 9.19004 15.45C9.06337 15.5433 8.89004 15.59 8.67004 15.59ZM12.3507 15.59C12.164 15.59 12.0107 15.5467 11.8907 15.46C11.7773 15.3733 11.704 15.2567 11.6707 15.11C11.644 14.9633 11.674 14.8 11.7607 14.62L14.3207 9.01C14.4273 8.78333 14.554 8.62 14.7007 8.52C14.8473 8.41333 15.0173 8.36 15.2107 8.36C15.404 8.36 15.574 8.41333 15.7207 8.52C15.8673 8.62 15.9907 8.78333 16.0907 9.01L18.6707 14.62C18.7573 14.8 18.7873 14.9667 18.7607 15.12C18.7407 15.2667 18.674 15.3833 18.5607 15.47C18.4473 15.55 18.3007 15.59 18.1207 15.59C17.894 15.59 17.7173 15.5367 17.5907 15.43C17.4707 15.3233 17.364 15.1567 17.2707 14.93L16.6707 13.54L17.2907 13.97H13.1207L13.7407 13.54L13.1507 14.93C13.0507 15.1633 12.944 15.3333 12.8307 15.44C12.724 15.54 12.564 15.59 12.3507 15.59ZM15.1907 10.1L13.9107 13.15L13.6407 12.76H16.7707L16.5007 13.15L15.2107 10.1H15.1907Z"
                    fill="white"
                  />
                </svg>
                <span className="font-nunito font-bold text-[13px]">
                  Virtual Akun
                </span>
              </span>
              <svg
                className={`w-4 h-4 transition-transform ${
                  isVirtualAccountOpen ? 'rotate-180' : 'rotate-0'
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {isVirtualAccountOpen && (
              <div className="mt-2 bg-white border rounded-md shadow-md">
                {['BCA', 'Mandiri', 'BNI', 'BRI'].map((bank) => (
                  <div
                    key={bank}
                    className="flex justify-between items-center py-2 px-4 hover:bg-gray-100"
                  >
                    <div className="flex items-center">
                      <img
                        src={`/${bank.toLowerCase()}.jpg`}
                        alt={`${bank} Logo`}
                        className="mr-2"
                        style={{ width: '36.7px', height: '12px' }} // Ukuran baru
                      />
                      <span className="font-nunito text-[13px]">
                        {bank} Virtual Account
                      </span>
                    </div>
                    <input
                      type="radio"
                      name="payment"
                      value={`${bank} Virtual Account`}
                      checked={selectedPayment === `${bank} Virtual Account`}
                      onChange={() =>
                        handlePaymentSelect(`${bank} Virtual Account`)
                      }
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Bank Transfer Dropdown */}
          <div className="mb-2">
            <button
              className="flex justify-between items-center py-2 px-4 w-full bg-white border-gray-200 bg-[#FDFDFD] shadow-[0_0_4px_rgba(0,0,0,0.25)] rounded-md"
              onClick={() => handleToggleDropdown('bankTransfer')}
            >
              <span className="py-2 flex items-center gap-2">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22.0049 10V20C22.0049 20.5523 21.5572 21 21.0049 21H3.00488C2.4526 21 2.00488 20.5523 2.00488 20V10H22.0049ZM22.0049 8H2.00488V4C2.00488 3.44771 2.4526 3 3.00488 3H21.0049C21.5572 3 22.0049 3.44771 22.0049 4V8ZM15.0049 16V18H19.0049V16H15.0049Z"
                    fill="#51D7B1"
                  />
                </svg>

                <span className="font-nunito font-bold text-[13px]">
                  Bank Transfer
                </span>
              </span>
              <svg
                className={`w-4 h-4 transition-transform ${
                  isBankTransferOpen ? 'rotate-180' : 'rotate-0'
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {isBankTransferOpen && (
              <div className="mt-2 bg-white border rounded-md shadow-md">
                {['BCA', 'Mandiri', 'BNI', 'BRI'].map((bank) => (
                  <div
                    key={bank}
                    className="flex justify-between items-center py-2 px-4 hover:bg-gray-100"
                  >
                    <div className="flex items-center">
                      <img
                        src={`/${bank.toLowerCase()}.jpg`}
                        alt={`${bank} Logo`}
                        className="mr-2"
                        style={{ width: '36.7px', height: '12px' }} // Ukuran baru
                      />
                      <span className="font-nunito text-[13px]">
                        {bank} Bank Transfer
                      </span>
                    </div>
                    <input
                      type="radio"
                      name="payment"
                      value={`${bank} Bank Transfer`}
                      checked={selectedPayment === `${bank} Bank Transfer`}
                      onChange={() =>
                        handlePaymentSelect(`${bank} Bank Transfer`)
                      }
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* QRIS Option */}
          <div className="flex justify-between items-center py-2 px-4 bg-white border-gray-200 bg-[#FDFDFD] shadow-[0_0_4px_rgba(0,0,0,0.25)] rounded-md">
            <div className="flex items-center">
              <span className="py-2 flex items-center gap-2">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16 17V16H13V13H16V15H18V17H17V19H15V21H13V18H15V17H16ZM21 21H17V19H19V17H21V21ZM3 3H11V11H3V3ZM13 3H21V11H13V3ZM3 13H11V21H3V13ZM18 13H21V15H18V13ZM6 6V8H8V6H6ZM6 16V18H8V16H6ZM16 6V8H18V6H16Z"
                    fill="#51D7B1"
                  />
                </svg>

                <span className="font-nunito font-bold text-[13px]">QRIS</span>
              </span>
            </div>
            <input
              type="radio"
              name="payment"
              value="QRIS"
              checked={selectedPayment === 'QRIS'}
              onChange={() => handlePaymentSelect('QRIS')}
            />
          </div>
        </div>
      </div>
    // </div>
  )
}

export default PaymentDropdown
