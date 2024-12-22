const DetailProduk = ({ dataProduct, dataWithNego }: any) => {
  console.log("data product yang beli = ", dataProduct);
  console.log("data setelah dipotong nego = ", dataWithNego);

  if (dataProduct[0]?.price_negosiasi != null || undefined) {
    console.log("ada data potongan nego");
  } else {
    console.log("tidak ada ptotongan nego");
  }
  // const data =
  //   parseInt(dataProduct[0].product_stock.price_sell) * dataProduct[0].quantity;

  // Menggunakan total keselurahan barang
  // const total = dataProduct.reduce((acc: any, item: any) => {
  //   const price = parseInt(item.product_stock.price_sell);
  //   const quantity = item.quantity;
  //   return acc + price * quantity;
  // }, 0);

  // console.log("total harga = ", total);
  // totalSet(total);
  return (
    <>
      {dataProduct?.map?.((product: any, index: number) => {
        console.log(product);
        return (
          <div key={index} className="px-4 border-gray-300">
            <div className="bg-[#F5F5F5] rounded-lg border-2 mt-6">
              <div className="flex items-center mb-5 p-4 border-b-4">
                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19.2503 12.1388V18.3335H20.167V20.1668H1.83366V18.3335H2.75033V12.1388C1.64483 11.3989 0.916992 10.1387 0.916992 8.7085C0.916992 7.95028 1.12272 7.22002 1.49744 6.59783L3.98352 2.29183C4.14726 2.00821 4.44988 1.8335 4.77737 1.8335H17.2233C17.5507 1.8335 17.8534 2.00821 18.0171 2.29183L20.4947 6.58341C20.878 7.22002 21.0837 7.95028 21.0837 8.7085C21.0837 10.1387 20.3558 11.3989 19.2503 12.1388ZM17.417 12.8083C17.2665 12.825 17.1136 12.8335 16.9587 12.8335C15.8045 12.8335 14.7393 12.355 13.9795 11.5623C13.2197 12.355 12.1545 12.8335 11.0003 12.8335C9.84615 12.8335 8.78098 12.355 8.02116 11.5623C7.26133 12.355 6.19618 12.8335 5.04199 12.8335C4.88708 12.8335 4.73415 12.825 4.58366 12.8083V18.3335H17.417V12.8083ZM5.30659 3.66683L3.07664 7.52894C2.86407 7.88206 2.75033 8.28582 2.75033 8.7085C2.75033 9.97414 3.77634 11.0002 5.04199 11.0002C5.98704 11.0002 6.82461 10.4229 7.1703 9.56054C7.47794 8.79304 8.56438 8.79304 8.87202 9.56054C9.21768 10.4229 10.0552 11.0002 11.0003 11.0002C11.9454 11.0002 12.783 10.4229 13.1286 9.56054C13.4363 8.79304 14.5227 8.79304 14.8303 9.56054C15.176 10.4229 16.0136 11.0002 16.9587 11.0002C18.2243 11.0002 19.2503 9.97414 19.2503 8.7085C19.2503 8.28582 19.1366 7.88206 18.9155 7.5145L16.694 3.66683H5.30659Z"
                    fill="#878787"
                  />
                </svg>
                {/* <div className="ml-2">
                  <svg
                    width="25"
                    height="20"
                    viewBox="0 0 25 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      y="0.5"
                      width="25"
                      height="19"
                      rx="4"
                      fill="#09CBCA"
                    />
                    <path
                      d="M9.50641 13.6C9.21307 13.6 8.91974 13.5767 8.62641 13.53C8.33307 13.49 8.05641 13.4267 7.79641 13.34C7.53641 13.2467 7.30307 13.1333 7.09641 13C6.97641 12.92 6.89307 12.8233 6.84641 12.71C6.79974 12.5967 6.78307 12.4867 6.79641 12.38C6.81641 12.2667 6.85974 12.17 6.92641 12.09C6.99974 12.0033 7.08974 11.95 7.19641 11.93C7.30307 11.91 7.41974 11.94 7.54641 12.02C7.83974 12.1933 8.14974 12.32 8.47641 12.4C8.80307 12.48 9.14641 12.52 9.50641 12.52C10.0331 12.52 10.4164 12.4333 10.6564 12.26C10.8964 12.08 11.0164 11.85 11.0164 11.57C11.0164 11.3367 10.9297 11.1533 10.7564 11.02C10.5897 10.8867 10.2997 10.7767 9.88641 10.69L8.78641 10.46C8.15307 10.3267 7.67974 10.1033 7.36641 9.79C7.05974 9.47 6.90641 9.05 6.90641 8.53C6.90641 8.20333 6.97307 7.90667 7.10641 7.64C7.23974 7.37333 7.42641 7.14333 7.66641 6.95C7.91307 6.75667 8.20307 6.61 8.53641 6.51C8.87641 6.40333 9.24974 6.35 9.65641 6.35C10.0564 6.35 10.4364 6.4 10.7964 6.5C11.1564 6.6 11.4797 6.74667 11.7664 6.94C11.8731 7.01333 11.9431 7.10333 11.9764 7.21C12.0164 7.31667 12.0264 7.42333 12.0064 7.53C11.9864 7.63 11.9397 7.71667 11.8664 7.79C11.7931 7.86333 11.6997 7.90667 11.5864 7.92C11.4797 7.93333 11.3564 7.9 11.2164 7.82C10.9697 7.68 10.7197 7.58 10.4664 7.52C10.2131 7.46 9.93974 7.43 9.64641 7.43C9.33974 7.43 9.07641 7.47333 8.85641 7.56C8.63641 7.64667 8.46641 7.77 8.34641 7.93C8.23307 8.08333 8.17641 8.26667 8.17641 8.48C8.17641 8.72 8.25641 8.91333 8.41641 9.06C8.57641 9.2 8.84974 9.31 9.23641 9.39L10.3264 9.62C10.9864 9.76 11.4764 9.98 11.7964 10.28C12.1231 10.58 12.2864 10.98 12.2864 11.48C12.2864 11.8 12.2197 12.09 12.0864 12.35C11.9597 12.61 11.7731 12.8333 11.5264 13.02C11.2864 13.2067 10.9964 13.35 10.6564 13.45C10.3164 13.55 9.93307 13.6 9.50641 13.6ZM15.585 13.6C15.2917 13.6 14.9983 13.5767 14.705 13.53C14.4117 13.49 14.135 13.4267 13.875 13.34C13.615 13.2467 13.3817 13.1333 13.175 13C13.055 12.92 12.9717 12.8233 12.925 12.71C12.8783 12.5967 12.8617 12.4867 12.875 12.38C12.895 12.2667 12.9383 12.17 13.005 12.09C13.0783 12.0033 13.1683 11.95 13.275 11.93C13.3817 11.91 13.4983 11.94 13.625 12.02C13.9183 12.1933 14.2283 12.32 14.555 12.4C14.8817 12.48 15.225 12.52 15.585 12.52C16.1117 12.52 16.495 12.4333 16.735 12.26C16.975 12.08 17.095 11.85 17.095 11.57C17.095 11.3367 17.0083 11.1533 16.835 11.02C16.6683 10.8867 16.3783 10.7767 15.965 10.69L14.865 10.46C14.2317 10.3267 13.7583 10.1033 13.445 9.79C13.1383 9.47 12.985 9.05 12.985 8.53C12.985 8.20333 13.0517 7.90667 13.185 7.64C13.3183 7.37333 13.505 7.14333 13.745 6.95C13.9917 6.75667 14.2817 6.61 14.615 6.51C14.955 6.40333 15.3283 6.35 15.735 6.35C16.135 6.35 16.515 6.4 16.875 6.5C17.235 6.6 17.5583 6.74667 17.845 6.94C17.9517 7.01333 18.0217 7.10333 18.055 7.21C18.095 7.31667 18.105 7.42333 18.085 7.53C18.065 7.63 18.0183 7.71667 17.945 7.79C17.8717 7.86333 17.7783 7.90667 17.665 7.92C17.5583 7.93333 17.435 7.9 17.295 7.82C17.0483 7.68 16.7983 7.58 16.545 7.52C16.2917 7.46 16.0183 7.43 15.725 7.43C15.4183 7.43 15.155 7.47333 14.935 7.56C14.715 7.64667 14.545 7.77 14.425 7.93C14.3117 8.08333 14.255 8.26667 14.255 8.48C14.255 8.72 14.335 8.91333 14.495 9.06C14.655 9.2 14.9283 9.31 15.315 9.39L16.405 9.62C17.065 9.76 17.555 9.98 17.875 10.28C18.2017 10.58 18.365 10.98 18.365 11.48C18.365 11.8 18.2983 12.09 18.165 12.35C18.0383 12.61 17.8517 12.8333 17.605 13.02C17.365 13.2067 17.075 13.35 16.735 13.45C16.395 13.55 16.0117 13.6 15.585 13.6Z"
                      fill="white"
                    />
                  </svg>
                </div> */}
                <h3
                  className="ml-2 font-nunito font-bold text-[15px]"
                  style={{ color: "#1B1E28" }}
                >
                  {product.product.merchant.name}
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
              <div className="flex flex-col items-start px-4 pb-2">
                <div className="flex items-start mb-1">
                  <img
                    className="w-[100px] h-[100px] rounded-md mr-3"
                    src={product.product.image_product[0].gallery_url}
                    alt="Anugrah Shoes"
                  />
                  <div className="flex flex-col">
                    <h2 className="font-nunito text-gray-700 text-[12px] font-semibold">
                      {product.product.name}
                    </h2>
                    <div className="flex flex-col justify-between py-2">
                      <div className="flex items-center">
                        <svg
                          width="13"
                          height="14"
                          viewBox="0 0 6 8"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="mr-2"
                        >
                          <path
                            d="M5.12133 5.5L3 7.6213L0.87868 5.5C-0.292893 4.3284 -0.292893 2.42892 0.87868 1.25734C2.05025 0.0857688 3.94973 0.0857688 5.12133 1.25734C6.2929 2.42892 6.2929 4.3284 5.12133 5.5ZM3 4.04533C3.3682 4.04533 3.66667 3.74686 3.66667 3.37866C3.66667 3.01047 3.3682 2.712 3 2.712C2.6318 2.712 2.33333 3.01047 2.33333 3.37866C2.33333 3.74686 2.6318 4.04533 3 4.04533Z"
                            fill="#51D7B1"
                          />
                        </svg>
                        <p className="font-nunito text-gray-500 text-[10px]">
                          <span className="font-nunito font-semibold text-gray-700">
                            {product.product.merchant.city},{" "}
                            {product.product.merchant.province}
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
                              fill="#51D7B1"
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
                            {product.product_stock.variation_item_1.name},{" "}
                            {product.product_stock.variation_item_2.name}
                          </span>
                        </p>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-[#0F0F0F] font-nunito text-[14px] font-bold">
                          {dataProduct[0]?.price_negosiasi != 0 ||
                          null ||
                          undefined
                            ? (
                                (product.product_stock.price_sell -
                                  product.price_negosiasi) *
                                product.quantity
                              ).toLocaleString("id-ID", {
                                style: "currency",
                                currency: "IDR",
                                minimumFractionDigits: 0,
                              })
                            : (
                                parseInt(product.product_stock.price_sell) *
                                product.quantity
                              ).toLocaleString("id-ID", {
                                style: "currency",
                                currency: "IDR",
                                minimumFractionDigits: 0,
                              })}
                        </p>
                        {dataProduct[0]?.price_negosiasi != 0 ||
                        null ||
                        undefined ? (
                          <p className="text-[#0F0F0F] font-nunito text-[10px] line-through">
                            (
                            {product.product_stock.price_sell *
                              product.quantity}
                            ){" "}
                          </p>
                        ) : null}
                        <div className="flex flex-col items-center ml-4">
                          <div className="flex items-center justify-center rounded-lg border-2 bg-zinc-400 p-1">
                            <input
                              type="text"
                              value={product.quantity}
                              className="w-5 h-5 bg-zinc-400 font-nunito text-center text-white border-none focus:outline-none"
                              readOnly
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default DetailProduk;
