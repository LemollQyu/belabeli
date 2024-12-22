"use client";
import deleteCart from "@/api/cart/deleteCart";
import deleteCartItem from "@/api/cart/deleteCartItem";
import getCart from "@/api/cart/getCart";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import LayoutUtama from "../../layouts/layout-utama";
import Header from "../../layouts/header";
import getVoucherMerchant from "@/api/voucher/getVoucherMerchant";
import Loading from "../../components/loading";
import claim from "@/api/voucher/claim";
import postPaymentSession from "@/api/pembayaran/postPaymentSession";

type dataPembayaranType = {
  id: number;
  merchantId: number;
  price: number;
  quantity: number;
  items: any;
  cartId: number;
};

const Home = () => {
  const [dataKeranjang, setDataKeranjang] = useState<any[]>([]);
  const [loadingKeranjang, setLoadingKeranjang] = useState<boolean>(false);
  const [selectedProducts, setSelectedProducts] = useState<
    dataPembayaranType[]
  >([]);

  // const [selectItemsProduct, setItemsProduct] = useState<any>({});
  const [activeCartId, setActiveCartId] = useState<number | null>(null);
  const [totalHarga, setTotalHarga] = useState<number>(0);
  const [isTriggerRefresh, setTriggerRefresh] = useState(false);

  const [merchantId, setMerchantId] = useState<number>(0);

  const [openDiscount, setOpenDiscount] = useState<boolean>(false);
  const [openBlackScreen, setOpenBlackScreen] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      setLoadingKeranjang(true);
      try {
        const response = await getCart();
        if (response.error?.code === 401) {
          router.push("/authentikasi/login");
        }
        setDataKeranjang(response.data?.data || []);
        setLoadingKeranjang(false);
      } catch (err: any) {
        console.log(err.message || err.response);
      }
    }
    fetchData();
  }, [isTriggerRefresh]);

  console.log(dataKeranjang);

  // Function to update the total price immediately
  const updateTotalHarga = (updatedSelectedProducts: any[]) => {
    const total = updatedSelectedProducts.reduce(
      (sum, product) => sum + product.price * product.quantity,
      0
    );
    setTotalHarga(total);
  };

  // Handle product selection and total price update
  const handleSelectProduct = (cartId: number, product: any) => {
    if (activeCartId === null) {
      setActiveCartId(cartId);
      const newSelectedProducts = [
        {
          id: product.id,
          cartId: product.carts_id,
          merchantId: product.data_product.merchants_id,
          price: Number(product.product_stock.price_sell),
          quantity: product.quantity,
          items: {
            products_id: product.products_id,
            product_stocks_id: product.product_stock.id,
            quantity: product.quantity,
            price_negosiasi: product.potongan_harga,
            cart_items_id: product.id,
          },
        },
      ];
      setSelectedProducts(newSelectedProducts);
      updateTotalHarga(newSelectedProducts); // Directly update total price
      return;
    }

    if (activeCartId !== cartId) return;

    const isAlreadySelected = selectedProducts.find((p) => p.id === product.id);
    const newSelectedProducts = isAlreadySelected
      ? selectedProducts.filter((p) => p.id !== product.id)
      : [
          ...selectedProducts,

          {
            id: product.id,
            cartId: product.carts_id,
            merchantId: product.data_product.merchants_id,
            price: Number(product.product_stock.price_sell),
            quantity: product.quantity,
            items: {
              products_id: product.products_id,
              product_stocks_id: product.product_stock.id,
              quantity: product.quantity,
              price_negosiasi: product.potongan_harga,
              cart_items_id: product.id,
            },
          },
        ];

    if (newSelectedProducts.length === 0) setActiveCartId(null);

    setSelectedProducts(newSelectedProducts);
    updateTotalHarga(newSelectedProducts); // Directly update total price
  };

  // Handle quantity changes for selected products
  const handleQuantityChange = (productId: number, delta: number) => {
    const updatedProducts = selectedProducts.map((product) =>
      product.id === productId
        ? { ...product, quantity: Math.max(1, product.quantity + delta) }
        : product
    );
    setSelectedProducts(updatedProducts);
    updateTotalHarga(updatedProducts); // Directly update total price
  };

  const handleDeleteProduct = async (
    cartItemId: number,
    cartItemLength: number,
    cartId: number
  ) => {
    if (cartItemLength === 1) {
      alert("Data keranjang ini sisa 1, yakin mau menghapusnya?");
      try {
        const response = await deleteCart({ cartId });

        console.log(response);

        // Perbarui selectedProducts jika ada produk dari keranjang yang dihapus
        const updatedSelectedProducts = selectedProducts.filter(
          (product) => product.id !== cartItemId
        );
        setSelectedProducts(updatedSelectedProducts);
        updateTotalHarga(updatedSelectedProducts);

        setTriggerRefresh((prev) => !prev);
      } catch (err: any) {
        console.log(err.message || err.response);
      }
    } else {
      console.log("Menghapus produk dari keranjang");
      try {
        const response = await deleteCartItem({
          cartId,
          cartItemId: [cartItemId],
        });

        console.log(response);

        // Perbarui selectedProducts jika ada produk dari keranjang yang dihapus
        const updatedSelectedProducts = selectedProducts.filter(
          (product) => product.id !== cartItemId
        );
        setSelectedProducts(updatedSelectedProducts);
        updateTotalHarga(updatedSelectedProducts);

        setTriggerRefresh((prev) => !prev);
      } catch (err: any) {
        console.log(err.message || err.response);
      }
    }

    console.log("Hapus selesai");
    console.log("Jumlah item cart: ", cartItemLength);
    console.log("Cart item ID: ", cartItemId);
  };

  const [loadingDiscountMerchant, setLoadingDiscountMerchant] = useState(false);
  const [dataDiscount, setDataDiscount] = useState<any>({});

  useEffect(() => {
    async function fetchData() {
      setLoadingDiscountMerchant(true);
      try {
        const response = await getVoucherMerchant({ merchantId: merchantId });

        // console.log(response);
        setDataDiscount(response.data);
        setLoadingDiscountMerchant(false);
      } catch (err: any) {
        console.log(err.message || err.response);
      }
    }

    fetchData();
  }, [merchantId]);

  // console.log("data discount merchant : ", dataDiscount);

  const [itemsArray, setItemsArray] = useState<any[]>([]);

  const [dataPembayaran, setDataPembayaran] = useState<any>({});

  const handlePembayaran = async () => {
    console.log(selectedProducts);
    console.log("beli");

    const items = selectedProducts.map((product) => product.items); // Mengambil 'items' dari setiap produk
    setItemsArray(items); // Menyimpan array hasil ke state

    try {
      const response = await postPaymentSession({
        carts_id: selectedProducts[0].cartId,
        merchants_id: selectedProducts[0].merchantId,
        items: items,
      });

      console.log("ini di try");

      // console.log(response.data.id);

      setDataPembayaran(response.error);

      if (response.error) {
        console.log("error beli sekarang ", response.error);
      }

      if (response?.data?.code == 201) {
        router.push(`/pembayaran?sessionId=${response.data?.data?.id}`);
      }
    } catch (err: any) {
      console.log(err);
    }

    console.log(
      "merchantId = ",
      selectedProducts[0].merchantId,
      "cartId = ",
      selectedProducts[0].cartId,
      "items = ",
      items // Gunakan variabel lokal
    );
  };

  console.log(itemsArray);

  return (
    <LayoutUtama>
      <Header title="Keranjang" children={undefined} />
      <div className="px-4 font-nunito absolute pt-20  items-center w-full left-1/2 -translate-x-1/2 pb-44">
        {dataKeranjang.map((data: any, index: number) => {
          return (
            <>
              {data.type == "negotiation" ? (
                <div
                  key={index}
                  className="relative items-center text-sm transition-all  duration-200 rounded-md cursor-pointer text-black-80 border-white-30  w-full bg-gray-100 mt-3 pb-2"
                >
                  <div className="w-full h-[41px] flex items-center gap-2 px-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="21"
                      viewBox="0 0 20 21"
                      fill="none"
                      onClick={() => {
                        router.push(
                          `/toko/${data?.merchant.name}?merchantId=${data?.merchant.id}&merchantSlug=${data?.merchant.slug}`
                        );
                      }}
                    >
                      <path
                        d="M17.5 11.5352V17.1667H18.3334V18.8334H1.66671V17.1667H2.50004V11.5352C1.49505 10.8626 0.833374 9.71692 0.833374 8.41675C0.833374 7.72747 1.0204 7.06359 1.36106 6.49796L3.62112 2.58341C3.76998 2.32558 4.04509 2.16675 4.34281 2.16675H15.6573C15.955 2.16675 16.2301 2.32558 16.379 2.58341L18.6313 6.48485C18.9797 7.06359 19.1667 7.72747 19.1667 8.41675C19.1667 9.71692 18.505 10.8626 17.5 11.5352ZM15.8334 12.1438C15.6965 12.159 15.5575 12.1667 15.4167 12.1667C14.3675 12.1667 13.3991 11.7317 12.7084 11.0111C12.0176 11.7317 11.0493 12.1667 10 12.1667C8.95079 12.1667 7.98246 11.7317 7.29171 11.0111C6.60096 11.7317 5.63263 12.1667 4.58337 12.1667C4.44254 12.1667 4.30352 12.159 4.16671 12.1438V17.1667H15.8334V12.1438ZM4.82392 3.83341L2.79669 7.34442C2.60345 7.66544 2.50004 8.0325 2.50004 8.41675C2.50004 9.56733 3.43278 10.5001 4.58337 10.5001C5.44251 10.5001 6.20393 9.97533 6.5182 9.19133C6.79787 8.49361 7.78554 8.49361 8.06522 9.19133C8.37946 9.97533 9.14087 10.5001 10 10.5001C10.8592 10.5001 11.6206 9.97533 11.9349 9.19133C12.2145 8.49361 13.2022 8.49361 13.4819 9.19133C13.7961 9.97533 14.5575 10.5001 15.4167 10.5001C16.5673 10.5001 17.5 9.56733 17.5 8.41675C17.5 8.0325 17.3966 7.66544 17.1956 7.3313L15.1761 3.83341H4.82392Z"
                        fill="#878787"
                      />
                    </svg>
                    {data.merchant.super_seller ? (
                      <div className="w-[25px] h-[19px] rounded-lg bg-warnaKedua">
                        <p className="font-nunitoBold text-center text-white text-[10px]">
                          SS
                        </p>
                      </div>
                    ) : null}
                    <h3
                      className="text-[14px] font-nunitoBold text-center"
                      onClick={() => {
                        router.push(
                          `/toko/${data?.merchant.name}?merchantId=${data?.merchant.id}&merchantSlug=${data?.merchant.slug}`
                        );
                      }}
                    >
                      {data.merchant.name}
                    </h3>
                  </div>
                  {/* <p>{data.type}</p> */}
                  <div className="border rounded-lg p-3">
                    <div className="flex flex-col gap-4">
                      {data.cart_item.map((product: any) => (
                        <div
                          key={product.id}
                          className="flex items-center justify-between gap-2"
                        >
                          <label
                            className={`relative w-5 h-5 cursor-pointer ${
                              activeCartId !== null && activeCartId !== data.id
                                ? "opacity-25 cursor-not-allowed"
                                : ""
                            }`}
                          >
                            <input
                              type="checkbox"
                              className="sr-only"
                              checked={
                                !!selectedProducts.find(
                                  (p) => p.id === product.id
                                )
                              }
                              onChange={() =>
                                handleSelectProduct(data.id, product)
                              }
                              disabled={
                                activeCartId !== null &&
                                activeCartId !== data.id
                              }
                            />
                            <div
                              className={`w-[20px] h-[20px] rounded-full border-2 ${
                                selectedProducts.find(
                                  (p) => p.id === product.id
                                )
                                  ? "bg-teal-500 border-teal-500"
                                  : "bg-white border-gray-300"
                              } flex items-center justify-center transition`}
                            >
                              {selectedProducts.find(
                                (p) => p.id === product.id
                              ) && (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="w-[20px] h-[20px] text-white"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              )}
                            </div>
                          </label>
                          <div className="w-[80px] h-[80px] rounded-md">
                            <img
                              src="/image/image.png"
                              alt={product.data_product.name}
                              className="w-full border h-full object-cover rounded-md"
                            />
                          </div>
                          <div className="flex flex-col justify-between gap-2  ">
                            <p className="font-nunito font-bold text-[10px]">
                              {product.data_product.name}
                            </p>
                            <div className="text-[10px] text-gray-500 flex gap-2 border pl-1 border-warnaKedua items-center py-[1.5px] w-[70px] h-[15px]">
                              <p>{product.variation_item[0]?.name}</p>
                              <p>{product.variation_item[1]?.name}</p>
                            </div>
                            <p className="font-nunito font-bold text-[10px]">
                              Rp {Number(product.product_stock.price_sell)}
                            </p>
                          </div>
                          <div className="flex items-end h-[68px]">
                            <div className="flex items-center gap-1">
                              <button className="w-[16px] h-[16px] flex items-center justify-center rounded"></button>
                              <span className="flex justify-center items-center border rounded-md w-[18px] h-[18px] text-[10px]">
                                {selectedProducts.find(
                                  (p) => p.id === product.id
                                )?.quantity || product.quantity}
                              </span>
                              <button className="w-[16px] h-[16px] flex items-center justify-center  rounded"></button>
                              <button
                                onClick={() =>
                                  handleDeleteProduct(
                                    product.id,
                                    data.cart_item.length,
                                    data.id
                                  )
                                }
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 11 12"
                                  fill="none"
                                >
                                  <rect
                                    x="0.25"
                                    y="1"
                                    width="10"
                                    height="10"
                                    rx="0.75"
                                    fill="#09CBCA"
                                  />
                                  <rect
                                    x="0.25"
                                    y="1"
                                    width="10"
                                    height="10"
                                    rx="0.75"
                                    stroke="#09CBCA"
                                    stroke-width="0.5"
                                  />
                                  <path
                                    d="M3.5 4.55H7.5V8.45C7.5 8.61569 7.38808 8.75 7.25 8.75H3.75C3.61193 8.75 3.5 8.61569 3.5 8.45V4.55ZM4.25 3.65V3.05C4.25 2.88432 4.36193 2.75 4.5 2.75H6.5C6.63808 2.75 6.75 2.88432 6.75 3.05V3.65H8V4.25H3V3.65H4.25ZM4.75 3.35V3.65H6.25V3.35H4.75ZM4.75 5.75V7.55H5.25V5.75H4.75ZM5.75 5.75V7.55H6.25V5.75H5.75Z"
                                    fill="#FDFDFD"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div
                    className="w-[300px] sm:w-[320px]  h-[33px] bg-gradient-to-r from-[#83E69B] to-[#00BAE1] rounded-md mx-auto mt-2 flex justify-between px-3 items-center"
                    onClick={() => {
                      setMerchantId(data.merchants_id);
                      console.log("data discount", data.merchants_id);

                      setOpenBlackScreen(true);
                      setOpenDiscount(true);
                    }}
                  >
                    <p className="text-[12px] font-nunitoBold text-white">
                      Diskon Toko{" "}
                      {data.merchant.voucher_merchant?.discount_value}% Tersedia
                    </p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M13.1714 12.0001L8.22168 7.0503L9.63589 5.6361L15.9999 12.0001L9.63589 18.364L8.22168 16.9498L13.1714 12.0001Z"
                        fill="#FDFDFD"
                      />
                    </svg>
                  </div>
                </div>
              ) : (
                <div
                  key={index}
                  className="relative items-center text-sm transition-all  duration-200 rounded-md cursor-pointer text-black-80 border-white-30  w-full bg-gray-100 mt-3 pb-2"
                >
                  <div className="w-full h-[41px] flex items-center gap-2 px-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="21"
                      viewBox="0 0 20 21"
                      fill="none"
                      onClick={() => {
                        router.push(
                          `/toko/${data?.merchant.name}?merchantId=${data?.merchant.id}&merchantSlug=${data?.merchant.slug}`
                        );
                      }}
                    >
                      <path
                        d="M17.5 11.5352V17.1667H18.3334V18.8334H1.66671V17.1667H2.50004V11.5352C1.49505 10.8626 0.833374 9.71692 0.833374 8.41675C0.833374 7.72747 1.0204 7.06359 1.36106 6.49796L3.62112 2.58341C3.76998 2.32558 4.04509 2.16675 4.34281 2.16675H15.6573C15.955 2.16675 16.2301 2.32558 16.379 2.58341L18.6313 6.48485C18.9797 7.06359 19.1667 7.72747 19.1667 8.41675C19.1667 9.71692 18.505 10.8626 17.5 11.5352ZM15.8334 12.1438C15.6965 12.159 15.5575 12.1667 15.4167 12.1667C14.3675 12.1667 13.3991 11.7317 12.7084 11.0111C12.0176 11.7317 11.0493 12.1667 10 12.1667C8.95079 12.1667 7.98246 11.7317 7.29171 11.0111C6.60096 11.7317 5.63263 12.1667 4.58337 12.1667C4.44254 12.1667 4.30352 12.159 4.16671 12.1438V17.1667H15.8334V12.1438ZM4.82392 3.83341L2.79669 7.34442C2.60345 7.66544 2.50004 8.0325 2.50004 8.41675C2.50004 9.56733 3.43278 10.5001 4.58337 10.5001C5.44251 10.5001 6.20393 9.97533 6.5182 9.19133C6.79787 8.49361 7.78554 8.49361 8.06522 9.19133C8.37946 9.97533 9.14087 10.5001 10 10.5001C10.8592 10.5001 11.6206 9.97533 11.9349 9.19133C12.2145 8.49361 13.2022 8.49361 13.4819 9.19133C13.7961 9.97533 14.5575 10.5001 15.4167 10.5001C16.5673 10.5001 17.5 9.56733 17.5 8.41675C17.5 8.0325 17.3966 7.66544 17.1956 7.3313L15.1761 3.83341H4.82392Z"
                        fill="#878787"
                      />
                    </svg>
                    {data.merchant.super_seller ? (
                      <div className="w-[25px] h-[19px] rounded-lg bg-warnaKedua">
                        <p className="font-nunitoBold text-center text-white text-[10px]">
                          SS
                        </p>
                      </div>
                    ) : null}
                    <h3
                      className="text-[14px] font-nunitoBold text-center"
                      onClick={() => {
                        router.push(
                          `/toko/${data?.merchant.name}?merchantId=${data?.merchant.id}&merchantSlug=${data?.merchant.slug}`
                        );
                      }}
                    >
                      {data.merchant.name}
                    </h3>
                  </div>
                  {/* <p>{data.type}</p> */}
                  <div className="border rounded-lg p-3">
                    <div className="flex flex-col gap-4">
                      {data.cart_item.map((product: any) => (
                        <div
                          key={product.id}
                          className="flex items-center justify-between gap-2"
                        >
                          <label
                            className={`relative w-5 h-5 cursor-pointer ${
                              activeCartId !== null && activeCartId !== data.id
                                ? "opacity-25 cursor-not-allowed"
                                : ""
                            }`}
                          >
                            <input
                              type="checkbox"
                              className="sr-only"
                              checked={
                                !!selectedProducts.find(
                                  (p) => p.id === product.id
                                )
                              }
                              onChange={() =>
                                handleSelectProduct(data.id, product)
                              }
                              disabled={
                                activeCartId !== null &&
                                activeCartId !== data.id
                              }
                            />
                            <div
                              className={`w-[20px] h-[20px] rounded-full border-2 ${
                                selectedProducts.find(
                                  (p) => p.id === product.id
                                )
                                  ? "bg-teal-500 border-teal-500"
                                  : "bg-white border-gray-300"
                              } flex items-center justify-center transition`}
                            >
                              {selectedProducts.find(
                                (p) => p.id === product.id
                              ) && (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="w-[20px] h-[20px] text-white"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              )}
                            </div>
                          </label>
                          <div className="w-[80px] h-[80px] rounded-md">
                            <img
                              src="/image/image.png"
                              alt={product.data_product.name}
                              className="w-full border h-full object-cover rounded-md"
                            />
                          </div>
                          <div className="flex flex-col justify-between gap-2  ">
                            <p className="font-nunito font-bold text-[10px]">
                              {product.data_product.name}
                            </p>
                            <div className="text-[10px] text-gray-500 flex gap-2 border pl-1 border-warnaKedua items-center py-[1.5px] w-[70px] h-[15px]">
                              <p>{product.variation_item[0]?.name}</p>
                              <p>{product.variation_item[1]?.name}</p>
                            </div>
                            <p className="font-nunito font-bold text-[10px]">
                              Rp {Number(product.product_stock.price_sell)}
                            </p>
                          </div>
                          <div className="flex items-end h-[68px]">
                            <div className="flex items-center gap-1">
                              <button
                                className="w-[16px] h-[16px] flex items-center justify-center bg-gray-200 rounded"
                                onClick={() =>
                                  handleQuantityChange(product.id, -1)
                                }
                                disabled={
                                  !selectedProducts.find(
                                    (p) => p.id === product.id
                                  )
                                }
                              >
                                -
                              </button>
                              <span className="flex justify-center items-center border rounded-md w-[18px] h-[18px] text-[10px]">
                                {selectedProducts.find(
                                  (p) => p.id === product.id
                                )?.quantity || product.quantity}
                              </span>
                              <button
                                className="w-[16px] h-[16px] flex items-center justify-center bg-gray-200 rounded"
                                onClick={() =>
                                  handleQuantityChange(product.id, 1)
                                }
                                disabled={
                                  !selectedProducts.find(
                                    (p) => p.id === product.id
                                  )
                                }
                              >
                                +
                              </button>
                              <button
                                onClick={() =>
                                  handleDeleteProduct(
                                    product.id,
                                    data.cart_item.length,
                                    data.id
                                  )
                                }
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 11 12"
                                  fill="none"
                                >
                                  <rect
                                    x="0.25"
                                    y="1"
                                    width="10"
                                    height="10"
                                    rx="0.75"
                                    fill="#09CBCA"
                                  />
                                  <rect
                                    x="0.25"
                                    y="1"
                                    width="10"
                                    height="10"
                                    rx="0.75"
                                    stroke="#09CBCA"
                                    stroke-width="0.5"
                                  />
                                  <path
                                    d="M3.5 4.55H7.5V8.45C7.5 8.61569 7.38808 8.75 7.25 8.75H3.75C3.61193 8.75 3.5 8.61569 3.5 8.45V4.55ZM4.25 3.65V3.05C4.25 2.88432 4.36193 2.75 4.5 2.75H6.5C6.63808 2.75 6.75 2.88432 6.75 3.05V3.65H8V4.25H3V3.65H4.25ZM4.75 3.35V3.65H6.25V3.35H4.75ZM4.75 5.75V7.55H5.25V5.75H4.75ZM5.75 5.75V7.55H6.25V5.75H5.75Z"
                                    fill="#FDFDFD"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div
                    className="w-[300px] sm:w-[320px]  h-[33px] bg-gradient-to-r from-[#83E69B] to-[#00BAE1] rounded-md mx-auto mt-2 flex justify-between px-3 items-center"
                    onClick={() => {
                      setMerchantId(data.merchants_id);
                      console.log("data discount", data.merchants_id);

                      setOpenBlackScreen(true);
                      setOpenDiscount(true);
                    }}
                  >
                    <p className="text-[12px] font-nunitoBold text-white">
                      Diskon Toko{" "}
                      {data.merchant.voucher_merchant?.discount_value}% Tersedia
                    </p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M13.1714 12.0001L8.22168 7.0503L9.63589 5.6361L15.9999 12.0001L9.63589 18.364L8.22168 16.9498L13.1714 12.0001Z"
                        fill="#FDFDFD"
                      />
                    </svg>
                  </div>
                </div>
              )}
            </>
          );
        })}
      </div>

      <div className="bottom-[44px] rounded-md overflow-hidden fixed -translate-x-1/2 left-1/2 bottom-0 items-center text-sm transition-all duration-200 cursor-pointer text-black-80 border-white-30 w-full sm:w-[400px]  bg-gray-100 mt-3 shadow-md">
        <div className=" bg-gradient-to-r from-[#83E69B] to-[#00BAE1] p-3 text-white font-medium text-sm flex items-center justify-between">
          <div className="flex items-center space-x-2 pl-1">
            {/* <svg
              width="25"
              height="20"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.50735 0.537493C7.34825 -0.179162 8.58515 -0.179169 9.42613 0.537501L10.4371 1.39906C10.5572 1.50143 10.7065 1.56328 10.8639 1.57584L12.188 1.68151C13.2894 1.76939 14.164 2.64402 14.2519 3.7454L14.3576 5.06951C14.3701 5.22682 14.4319 5.37618 14.5343 5.49631L15.3959 6.50734C16.1126 7.34824 16.1126 8.58514 15.3959 9.42612L14.5343 10.437C14.432 10.5572 14.3701 10.7066 14.3575 10.8639L14.2519 12.188C14.164 13.2894 13.2894 14.164 12.188 14.2518L10.8639 14.3575C10.7065 14.3701 10.5572 14.432 10.4371 14.5344L9.42613 15.3959C8.58515 16.1126 7.34825 16.1125 6.50728 15.3959L5.49628 14.5344C5.37616 14.432 5.22684 14.3701 5.06953 14.3576L3.74543 14.2518C2.64403 14.1639 1.76942 13.2894 1.68153 12.188L1.57585 10.8639C1.56329 10.7066 1.50142 10.5573 1.39907 10.4371L0.537502 9.42604C-0.179161 8.58514 -0.179168 7.34832 0.537487 6.50734L1.39906 5.49634C1.50142 5.37622 1.56331 5.22682 1.57585 5.0695L1.68152 3.74539C1.76941 2.644 2.644 1.76941 3.7454 1.68151L5.06952 1.57585C5.22684 1.56329 5.37619 1.50143 5.49632 1.39906L6.50735 0.537493ZM8.45315 1.67916C8.17288 1.44028 7.76053 1.44028 7.48025 1.67916L6.46925 2.54074C6.10888 2.84784 5.66081 3.03343 5.18883 3.07109L3.86473 3.17676C3.49759 3.20606 3.20606 3.49759 3.17677 3.86473L3.07109 5.18887C3.03343 5.66083 2.84784 6.10886 2.54074 6.46924L1.67917 7.48024C1.44029 7.76052 1.44028 8.17287 1.67917 8.45314L2.54074 9.46414C2.84785 9.82452 3.03343 10.2726 3.07111 10.7445L3.17677 12.0687C3.20606 12.4358 3.49759 12.7274 3.86474 12.7566L5.18882 12.8623C5.66077 12.9 6.10888 13.0856 6.46925 13.3927L7.48025 14.2542C7.7606 14.4931 8.17288 14.4931 8.45315 14.2542L9.46423 13.3926C9.82453 13.0856 10.2726 12.9 10.7446 12.8623L12.0687 12.7566C12.4358 12.7273 12.7274 12.4358 12.7567 12.0687L12.8623 10.7445C12.9 10.2726 13.0855 9.82452 13.3927 9.46422L14.2543 8.45314C14.4932 8.17287 14.4931 7.76059 14.2543 7.48024L13.3927 6.46924C13.0855 6.10886 12.9 5.66081 12.8623 5.18884L12.7567 3.86473C12.7274 3.49759 12.4358 3.20606 12.0687 3.17676L10.7446 3.0711C10.2727 3.03344 9.82453 2.84783 9.46415 2.54073L8.45315 1.67916ZM10.0879 4.7848L11.1485 5.84547L5.84521 11.1488L4.78455 10.0881L10.0879 4.7848ZM6.6407 6.64092C6.20136 7.08027 5.48905 7.08027 5.04971 6.64092C4.61037 6.20164 4.61037 5.48931 5.04971 5.04997C5.48905 4.61062 6.20136 4.61062 6.6407 5.04997C7.08005 5.48931 7.08005 6.20164 6.6407 6.64092ZM9.29233 10.8836C9.73168 11.3229 10.444 11.3229 10.8833 10.8836C11.3227 10.4442 11.3227 9.73197 10.8833 9.29262C10.444 8.85327 9.73168 8.85327 9.29233 9.29262C8.85298 9.73197 8.85298 10.4442 9.29233 10.8836Z"
                fill="#FDFDFD"
              />
            </svg> */}
            {/* <p className="text-white font-semibold text-sm">
              Voucher Diskon 60% Tersedia
            </p> */}
          </div>
          <div className="pr-4">
            {/* <a>
              <svg
                width="8"
                height="14"
                viewBox="0 0 8 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.1714 6.99986L0.22168 2.05006L1.63589 0.63586L7.9999 6.99986L1.63589 13.3638L0.22168 11.9496L5.1714 6.99986Z"
                  fill="#FDFDFD"
                />
              </svg>
            </a> */}
          </div>
        </div>
        <div className="flex w-full justify-between px-2 border-2 items-center py-2">
          <p className="font-nunito text-[12px]">
            Produk dipilih: {selectedProducts.length}
          </p>
          <div className="items-center justify-between">
            <p className="font-nunitoBold text-[12px]">
              Total Harga: Rp.{totalHarga.toLocaleString()}
            </p>
          </div>

          <button
            onClick={handlePembayaran}
            className={` px-6 py-2 rounded-lg ${
              selectedProducts.length === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#51D7B1] text-white rounded-md py-3 px-4 text-xs"
            }`}
            disabled={selectedProducts.length === 0}
          >
            Beli Sekarang
          </button>
        </div>
      </div>
      {openBlackScreen && (
        <div className="fixed z-10 top-0 right-0 bottom-0 left-0 bg-black opacity-50"></div>
      )}
      {openDiscount && (
        <>
          <div className="sm:w-[400px] w-full fixed bottom-0 left-1/2 bg-white -translate-x-1/2 border rounded-t-xl z-20 px-5">
            <div className="flex justify-between  h-[70px] items-center w-full">
              <h1 className="font-nunito font-bold text-[16px]">Voucer Toko</h1>
              <div
                className="cursor-pointer"
                onClick={() => {
                  setOpenBlackScreen(false);
                  setOpenDiscount(false);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                >
                  <path
                    d="M6.99976 5.46871L12.362 0.106445L13.8941 1.63851L8.53181 7.00076L13.8941 12.3629L12.362 13.895L6.99976 8.53281L1.63754 13.895L0.105469 12.3629L5.46771 7.00076L0.105469 1.63851L1.63754 0.106445L6.99976 5.46871Z"
                    fill="black"
                  />
                </svg>
              </div>
            </div>

            <div className="flex items-center mb-6">
              <input
                className="border border-gray-300 rounded-l-md w-full p-2 font-nunito "
                type="text"
                placeholder="Masukkan Voucher"
              />
              <button className="bg-[#51D7B1] text-white px-4 py-2 rounded-r-md hover:bg-[#51D7B1]">
                Gunakan
              </button>
            </div>

            {loadingDiscountMerchant ? (
              <div className="w-full h-[100px] flex justify-center items-center">
                <Loading />
              </div>
            ) : (
              dataDiscount?.map((discount: any, index: number) => {
                console.log(discount);
                return (
                  <div className="space-y-4 ">
                    <div className="bg-gradient-to-r from-[#83E69B] to-[#00BAE1] p-4 rounded-2xl flex justify-between items-center">
                      <div>
                        <p className="text-white font-semibold">
                          Diskon {discount.discount_value}% s/d{" "}
                          {new Intl.NumberFormat("id-ID", {
                            style: "currency",
                            currency: "IDR",
                          }).format(parseFloat(discount.max_discount))}
                        </p>
                        <p className="text-xs font-light text-white">
                          Belanja Min{" "}
                          {new Intl.NumberFormat("id-ID", {
                            style: "currency",
                            currency: "IDR",
                          }).format(parseFloat(discount.minimum_purchase))}
                        </p>
                        <p className="text-xs font-light text-white">
                          Berlaku hingga{" "}
                          {new Date(discount.expiry_date).toLocaleDateString(
                            "id-ID",
                            { day: "numeric", month: "long" }
                          )}
                        </p>
                      </div>
                      <div>
                        {discount.is_claim ? (
                          <button
                            className="bg-blue-100 text-[#41DEFF] px-4 py-1 rounded-lg text-xs font-nunito"
                            disabled
                          >
                            Digunakan
                          </button>
                        ) : (
                          <button
                            onClick={async () => {
                              console.log("handle claim");

                              try {
                                const response = await claim({
                                  discount_id: discount.id,
                                });
                                console.log(response);
                                setDataDiscount((v: any) =>
                                  v.map((item: any, i: number) =>
                                    item.id === discount.id
                                      ? {
                                          ...item,
                                          is_claim: !item.is_claim,
                                        }
                                      : item
                                  )
                                );
                              } catch (err: any) {
                                console.log(err.response);
                              }
                            }}
                            className="bg-white text-[#41DEFF] px-4 py-1 rounded-lg text-xs font-nunito"
                          >
                            Gunakan
                          </button>
                        )}

                        <p className="text-white text-sm font-medium mt-3 text-end">
                          S&K
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })

              // data load api discount merchants
            )}

            <div className="mt-6">
              <button className="w-full bg-[#51D7B1] text-white font-bold py-3 rounded-lg hover:bg-[#51D7B1]">
                Konfirmasi
              </button>
            </div>
          </div>
        </>
      )}
    </LayoutUtama>
  );
};

export default Home;
