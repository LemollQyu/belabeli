type OrderDetail = {
  id: string
  price: number
  productImage: string
  productName: string
  variant: string
  stock: number
  quantity: number
  orderDate: string
  submissionDate: string
}

interface OrderInformationProps {
  orderDetail: OrderDetail
}

const OrderInformation: React.FC<OrderInformationProps> = ({ orderDetail }) => {
  return (
    <div className="container mx-auto font-nunito px-4">
      <div className="bg-neutral-100 rounded-lg p-6 border-gray-200 bg-[#FDFDFD] shadow-[0_0_4px_rgba(0,0,0,0.25)]">
        {/* Header */}
        <div className="flex justify-between items-center mb-3">
          <div className="text-xs font-nunito text-gray-500">
            Order ID:{' '}
            <span className="font-bold text-gray-700">{orderDetail.id}</span>
          </div>
          <button
            onClick={() => {
              navigator.clipboard.writeText(orderDetail.id)
              alert('Order ID berhasil disalin!') // Notifikasi saat ID berhasil disalin
            }}
            className="text-[16px] font-semibold text-black"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.08322 3.50033V1.75033C4.08322 1.42816 4.34439 1.16699 4.66655 1.16699H11.6666C11.9887 1.16699 12.2499 1.42816 12.2499 1.75033V9.91699C12.2499 10.2392 11.9887 10.5003 11.6666 10.5003H9.91655V12.2498C9.91655 12.5723 9.65411 12.8337 9.32925 12.8337H2.33722C2.01284 12.8337 1.75 12.5743 1.75 12.2498L1.75152 4.08417C1.75157 3.76172 2.01404 3.50033 2.33883 3.50033H4.08322ZM2.91808 4.66699L2.91678 11.667H8.74988V4.66699H2.91808ZM5.24988 3.50033H9.91655V9.33366H11.0832V2.33366H5.24988V3.50033ZM4.08333 6.41699H7.58333V7.58366H4.08333V6.41699ZM4.08333 8.75033H7.58333V9.91699H4.08333V8.75033Z"
                fill="black"
              />
            </svg>
          </button>
        </div>

        <div className="h-px bg-gray-300 mb-3" />

        {/* Main Content */}
        <div className="pb-2 text-sm font-semibold">
          Metode Promosi Pencarian
        </div>
        <div className="flex items-start space-x-4">
          <img
            className="w-[100px] h-[100px] rounded-md object-cover"
            src={orderDetail.productImage}
            alt="Product Image"
          />
          <div className="flex flex-col space-y-1">
            <div className="text-black text-[12px] font-nunito font-semibold">
              {orderDetail.productName}
            </div>

            {/* Variants */}
            <div className="flex items-center text-xs text-gray-600 space-x-1 mb-2">
              <svg
                width="15"
                height="16"
                viewBox="0 0 10 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_10330_7835)">
                  <path
                    d="M6.90374 3.84511C7.0184 3.58691 7.08211 3.30106 7.08211 3.00033C7.08211 1.84973 6.14936 0.916992 4.99878 0.916992C3.84819 0.916992 2.91545 1.84973 2.91545 3.00033C2.91545 4.07641 3.7313 4.96195 4.77819 5.07212C5.28461 4.35045 6.07219 3.92026 6.90374 3.84511ZM5.47978 7.97791C5.83053 7.22016 5.85178 6.32287 5.47999 5.52341C6.09882 4.67191 7.27349 4.40817 8.20536 4.9462C9.20178 5.52153 9.54319 6.79558 8.9679 7.79199C8.39261 8.78845 7.11844 9.12987 6.12203 8.55458C5.86165 8.40424 5.64603 8.20624 5.47978 7.97791ZM2.61266 4.6782C3.09355 5.36083 3.85999 5.82783 4.73828 5.90558C5.16619 6.86728 4.80724 8.01649 3.87535 8.55453C2.87891 9.12982 1.60476 8.78841 1.02946 7.79199C0.454165 6.79553 0.795573 5.52137 1.79201 4.94608C2.05241 4.79574 2.33176 4.70799 2.61266 4.6782Z"
                    fill="#51D7B1"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_10330_7835">
                    <rect
                      width="10"
                      height="10"
                      fill="white"
                      transform="translate(0 0.5)"
                    />
                  </clipPath>
                </defs>
              </svg>
              <span className="text-[11px]">
                <b>Varian:</b> {orderDetail.variant}
              </span>
            </div>
            {/* Payment Method */}
            <div className="flex items-center text-xs text-gray-600 space-x-1 mb-2">
              <div className="flex items-center space-x-1">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 10 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.16928 4.66667V8.83334C9.16928 9.06346 8.98274 9.25 8.75261 9.25H1.2526C1.02249 9.25 0.835938 9.06346 0.835938 8.83334V4.66667H9.16928ZM9.16928 3.83333H0.835938V2.16667C0.835938 1.93655 1.02249 1.75 1.2526 1.75H8.75261C8.98274 1.75 9.16928 1.93655 9.16928 2.16667V3.83333ZM6.25261 7.16667V8H7.91928V7.16667H6.25261Z"
                    fill="#51D7B1"
                  />
                </svg>
                <span className="text-[11px]">
                <b>Stok:</b> {orderDetail.stock}
              </span>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
              <div className="flex items-center space-x-1 text-[16px] font-semibold text-black">
                Rp {new Intl.NumberFormat('id-ID').format(orderDetail.price)}
              </div>
              <div className="text-white border-2 bg-[#A9A9A9] border-[#A9A9A9] py-0.5 px-1.5 rounded-md">
                {orderDetail.quantity}
              </div>
            </div>
          </div>
        </div>

        <div className="h-px bg-gray-300 my-3" />

        {/* Footer */}
        <div className="flex justify-between text-xs text-gray-600 font-nunito">
          <div>
            <b>Tanggal Berlangganan</b>
            <div>{orderDetail.orderDate}</div>
          </div>
          <div className="mt-4 items-center">
            <svg
              width="71"
              height="2"
              viewBox="0 0 71 2"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 1L71 1.00001"
                stroke="#878787"
                strokeWidth="2"
                strokeDasharray="4 4"
              />
            </svg>
          </div>
          <div>
            <b>Tanggal Berakhir</b>
            <div className="text-right">{orderDetail.submissionDate}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderInformation
