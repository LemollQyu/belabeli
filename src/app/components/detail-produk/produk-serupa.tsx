import { useState, useEffect } from "react";
import ProductCard from "@/app/homepage/list-product/page";

export default function ProdukSerupa({ dataProduk, dataPage }: any) {
  // console.log(dataProduk);
  // console.log(dataPage);

  return (
    <div className="mt-[10px] w-full px-5 border-[#f1f1f1] pb-[28px]">
      <h1 className="text-[12px] font-nunitoBold">Produk Serupa</h1>
      <div className="mt-[10px] w-full px-3 sm:px-6 gap-2 border">
        {/* produk serupa */}
        <div className="grid grid-cols-2 gap-y-4 py-4 justify-items-center">
          {dataProduk?.map((product: any, index: any) => (
            <ProductCard
              key={index}
              title={product.name}
              imageUrl={product.image_product[0]?.gallery_url}
              originalPrice={Number(product.first_price_sell).toLocaleString(
                "id-ID",
                {
                  style: "currency",
                  currency: "IDR",
                }
              )}
              discountLabel={product.discount}
              rating={product.rating_product.rating}
              location={`${product.merchant.city}, ${product.merchant.country}`}
              discountedPrice={Number(
                product.first_price_after_discount
              ).toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
              })}
              soldCount={product.sold_quantity}
              linkHref={`/product/${product.slug}`}
              page={dataPage}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
