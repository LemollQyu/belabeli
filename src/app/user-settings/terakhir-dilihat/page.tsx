'use client'

import React, { useEffect, useState } from 'react'
import ProductCard from '@/app/homepage/list-product/page'
import LayoutUtama from '@/app/layouts/layout-utama'
import Header from '@/app/layouts/header'
import getLastViewed from '@/api/settings/getProductTerakhirDilihat'

// Definisikan tipe untuk data produk
interface Product {
  id: string;
  usersId: string;
  merchantId: string;
  title: string;
  discountedPrice: string;
  originalPrice: string;
  discountLabel: string;
  rating: string;
  soldCount: string;
  location: string;
  imageUrl: string;
  linkHref: string;
}

const TerakhirDilihat = () => {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    async function fetchFollowedStores() {
      try {
        const response = await getLastViewed(); // Assume this fetches API response
        console.log("Fetched followed stores data", response.data.data_product);
        const initialStores: Product[] = response.data.data_product.map((item: any) => ({
          id: item.id,
          usersId: item.users_id,
          merchantId: item.merchants_id,
          title: item.name,
          discountedPrice: parseInt(item.first_price_after_discount),
          originalPrice: parseInt(item.first_price_sell),
          discountLabel: item.discount,
          rating: item.rating_product.rating,
          soldCount: item.sold_quantity,
          location: `${item.merchant.city}, ${item.merchant.province}`,
          imageUrl: item.image_product[0].gallery_url,
          linkHref: `/product/${item.slug}`,
        }));
  
        // Set the transformed data into the state
        setProducts(initialStores);
      } catch (error) {
        console.error("Failed to fetch followed stores data", error);
      }
    }
  
    fetchFollowedStores();
  }, []);

  return (
    <LayoutUtama>
      {/* Header */}
      <Header title="Terakhir Dilihat" children={undefined} />

      {/* Konten Utama */}
      <div className="container w-full max-w-[400px] mx-auto p-4 font-nunito mt-20">
        <div className="ml-3 grid grid-cols-2 gap-4">
          {products.map((product, index) => (
            <ProductCard page={0} key={index} {...product} />
          ))}
        </div>
          <span className="w-full mt-20 items-center justify-center flex">{(products.length? '' : 'Belum ada produk terakhir dilihat')}</span>
      </div>
    </LayoutUtama>
  )
}

export default TerakhirDilihat
