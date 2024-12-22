const OrderInformation = ({ orderCode, product, merchant }: any) => {
  console.log("product : ", product, "merchant = ", merchant);
  return (
    <div className="px-4 border-gray-300">
      <div className="bg-[#F5F5F5] rounded-lg mt-6">
        <div className="flex items-center mb-5 p-3 border-b-4">
          <h3
            className="ml-2 font-nunito font-normal text-[15px]"
            style={{ color: "#1B1E28" }}
          >
            Order ID : {orderCode}
          </h3>
          <div className="flex items-center flex-grow justify-end min-w-0">
            <svg
              width="20"
              height="20"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 16.5C4.85786 16.5 1.5 13.1421 1.5 9C1.5 4.85786 4.85786 1.5 9 1.5C13.1421 1.5 16.5 4.85786 16.5 9C16.5 13.1421 13.1421 16.5 9 16.5ZM8.25195 12L13.5553 6.6967L12.4946 5.63604L8.25195 9.8787L6.13066 7.75732L5.06999 8.81805L8.25195 12Z"
                fill="#51D7B1"
              />
            </svg>
          </div>
        </div>
        {product?.map?.((data: any, index: number) => {
          return (
            <div key={index} className="flex flex-col items-start px-4">
              <div className="flex items-start mb-1">
                <img
                  className="w-[100px] h-[100px] rounded-md mr-3"
                  src="https://images.tokopedia.net/img/cache/700/VqbcmM/2023/3/7/1abd04f3-e85a-434e-82de-2ec36e34bf81.jpg"
                  alt="Anugrah Shoes"
                />
                <div className="flex flex-col">
                  <h2 className="font-nunito text-gray-700 text-[12px] font-semibold">
                    {data.product.name}
                  </h2>
                  <div className="flex flex-col justify-between py-2">
                    <div className="flex items-center">
                      <svg
                        width="13"
                        height="15"
                        viewBox="0 0 6 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="mr-2"
                      >
                        <path
                          d="M5.12133 5.5L3 7.6213L0.87868 5.5C-0.292893 4.3284 -0.292893 2.42892 0.87868 1.25734C2.05025 0.0857688 3.94973 0.0857688 5.12133 1.25734C6.2929 2.42892 6.2929 4.3284 5.12133 5.5ZM3 4.04533C3.3682 4.04533 3.66667 3.74686 3.66667 3.37866C3.66667 3.01047 3.3682 2.712 3 2.712C2.6318 2.712 2.33333 3.01047 2.33333 3.37866C2.33333 3.74686 2.6318 4.04533 3 4.04533Z"
                          fill="#0095FF"
                        />
                      </svg>
                      <p className="font-nunito text-gray-500 text-[10px]">
                        <span className="font-nunito font-semibold text-gray-700">
                          {merchant.city}, {merchant.province}
                        </span>
                      </p>
                    </div>
                    <div className="flex items-center mt-1">
                      <svg
                        width="13"
                        height="14"
                        viewBox="0 0 10 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_3271_5966)">
                          <path
                            d="M6.90471 3.86678C7.01938 3.60858 7.08309 3.32273 7.08309 3.02199C7.08309 1.8714 6.15034 0.93866 4.99975 0.93866C3.84917 0.93866 2.91642 1.8714 2.91642 3.02199C2.91642 4.09808 3.73227 4.98362 4.77917 5.09378C5.28559 4.37211 6.07317 3.94193 6.90471 3.86678ZM5.48075 7.99958C5.8315 7.24183 5.85275 6.34453 5.48096 5.54508C6.0998 4.69358 7.27446 4.42984 8.20634 4.96787C9.20275 5.5432 9.54417 6.81724 8.96888 7.81366C8.39359 8.81012 7.11942 9.15153 6.123 8.57624C5.86263 8.42591 5.647 8.22791 5.48075 7.99958ZM2.61363 4.69987C3.09453 5.38249 3.86097 5.84949 4.73925 5.92724C5.16717 6.88895 4.80821 8.03816 3.87632 8.5762C2.87988 9.15149 1.60573 8.81008 1.03044 7.81366C0.455141 6.8172 0.79655 5.54303 1.79299 4.96774C2.05338 4.81741 2.33274 4.72966 2.61363 4.69987Z"
                            fill="black"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_3271_5966">
                            <rect
                              width="10"
                              height="10"
                              fill="white"
                              transform="translate(0 0.521973)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                      <p className="px-2 font-nunito font-medium text-gray-600 text-[10px]">
                        Varian :{" "}
                        <span className="font-nunito font-semibold text-gray-700">
                          {data.product_stock.variation_item_1.name},{" "}
                          {data.product_stock.variation_item_2.name}
                        </span>
                      </p>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-[#0F0F0F] font-nunito text-[16px] font-bold">
                        Rp {data.price}
                      </p>
                      <div className="flex flex-col items-center ml-4">
                        <div className="flex items-center justify-center rounded-lg border-2 bg-zinc-400 p-1">
                          <input
                            type="text"
                            value={data.quantity}
                            className="w-5 h-5 bg-zinc-400 font-nunito text-center text-white border-none focus:outline-none"
                            readOnly
                          />
                        </div>
                        <p className="text-[11px] text-blue-500 cursor-pointer mt-1 underline"></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderInformation;
