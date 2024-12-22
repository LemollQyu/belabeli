// src/app/user-settings/ulasan/page.tsx
'use client'

import React from 'react'
import Link from 'next/link'
import Header from '@/app/layouts/header'
import LayoutUtama from '@/app/layouts/layout-utama'

const UlasanPage = () => {
  // Data dummy untuk ulasan
  const reviews = [
    {
      id: 1,
      username: 'Natasya',
      profilePhoto: '/profile.jpg',
      date: '26-09-2024 08.35',
      rating: 5,
      variant: 'Merah',
      comment: 'Bagus sepatunya anakku langsung SALTO',
      productDetails: 'Nama Detail Produk yang dibeli',
      productImages: ['/baju.jpg', '/baju-anak.jpg', '/headphone.jpg'],
    },
    {
      id: 2,
      username: 'Natasya',
      profilePhoto: '/profile.jpg',
      date: '30-09-2024 18.35',
      rating: 4,
      variant: 'Merah',
      comment: 'Bagus sepatunya anakku suka',
      productDetails: 'Nama Detail Produk yang dibeli',
      productImages: ['/baju.jpg', '/baju-anak.jpg', '/headphone.jpg'],
    },
  ]

  return (
    <LayoutUtama>
      <Header title="Detail Ulasan Pesanan" children={undefined} />
      <div className="w-full max-w-[400px] mx-auto py-4 px-4 space-y-6 pt-20">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="bg-[#F5F5F5] rounded-lg p-4 font-nunito"
          >
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center space-x-2">
                <img
                  src={review.profilePhoto}
                  alt={`Foto Profil ${review.username}`}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="font-semibold text-[14px]">
                  {review.username}
                </span>
              </div>
              <span className="text-gray-500 text-[14px]">{review.date}</span>
            </div>
            <div className="flex items-center mb-2 text-[14px]">
              <span className="text-yellow-500">
                {'★'.repeat(review.rating)}
                {'☆'.repeat(5 - review.rating)}
              </span>
              <span className="text-gray-500 ml-2">
                Variasi: {review.variant}
              </span>
            </div>
            <p className="text-gray-700 text-[14px] mb-2">{review.comment}</p>
            <h2 className="text-white text-[12px] mb-2 p-2 rounded-md bg-emerald-400">
              {review.productDetails}
            </h2>
            <div className="flex space-x-2 mb-4">
              {review.productImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Product Image ${index + 1}`}
                  className="w-20 h-20 object-cover rounded-md border"
                />
              ))}
            </div>
            <div className="flex justify-end">
              {' '}
              {/* Wrapper for right alignment */}
              <Link
                href={`/user-settings/ulasan/edit?id=${review.id}`}
                className="mt-2 text-teal-500 text-[14px] underline"
              >
                Perbarui Ulasan
              </Link>
            </div>
          </div>
        ))}
      </div>
    </LayoutUtama>
  )
}

export default UlasanPage
