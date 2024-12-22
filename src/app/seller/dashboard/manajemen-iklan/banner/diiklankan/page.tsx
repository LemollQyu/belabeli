'use client';

import OrderInformation from '@/app/components/seller/info-order';
import Header from '@/app/layouts/header';
import LayoutUtama from '@/app/layouts/layout-utama';
import React, { useState } from 'react';


const DiiklankanPage = () => {
    const orderDetail = {
        id: '1270511324',
        productName: 'Sepatu Anak Sekolah SMP Semua Ukuran Murah dan Tahan Lama',
        variant: 'Putih, XL',
        price: 600000,
        stock: 210,
        orderDate: '2 Oktober 2024',
        buyerName: 'Annas',
        productImage: '/sepatu.jpg',
        quantity: 1, // Example, add this if needed
        submissionDate: '9 Oktober 2024',
      }

  return (
    <LayoutUtama>
      <Header title="Diiklankan" children={undefined} />
      <div className="container mx-auto font-nunito pt-24">
      <OrderInformation orderDetail={orderDetail} />
      </div>
    </LayoutUtama>
  );
};

export default DiiklankanPage;
