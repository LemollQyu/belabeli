"use client"
import React from 'react'
import Header from '@/app/layouts/header'
import LayoutUtama from '@/app/layouts/layout-utama'
import { useRouter } from 'next/navigation'

const KelolaProduk: React.FC = () => {
  const router = useRouter()
  const menuItems = [
    {
      label: 'Semua',
      icon: (
        <svg
          width="51"
          height="50"
          viewBox="0 0 51 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M42.166 6.25L46.3327 14.5833V41.6667C46.3327 42.8173 45.4 43.75 44.2493 43.75H6.74935C5.59877 43.75 4.66602 42.8173 4.66602 41.6667V14.5907L8.83268 6.25H42.166ZM25.4993 20.8333L17.166 29.1667H23.416V37.5H27.5827V29.1667H33.8327L25.4993 20.8333ZM39.591 10.4167H11.4077L9.32643 14.5833H41.6743L39.591 10.4167Z"
            className="group-hover:fill-white fill-[#51D7B1]"
          />
        </svg>
      ),
    },
    {
      label: 'Live',
      icon: (
        <svg
          width="51"
          height="50"
          viewBox="0 0 51 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M38.759 38.2588C46.0813 30.9363 46.0813 19.0645 38.759 11.7422L41.7052 8.7959C50.6546 17.7454 50.6546 32.2554 41.7052 41.205L38.759 38.2588ZM12.2424 11.7422C4.92007 19.0645 4.92007 30.9363 12.2424 38.2588L9.29613 41.205C0.346603 32.2554 0.346603 17.7454 9.29613 8.7959L12.2424 11.7422ZM32.8663 32.3659C36.9344 28.2979 36.9344 21.7025 32.8663 17.6345L35.8125 14.6882C41.5077 20.3834 41.5077 29.6171 35.8125 35.3121L32.8663 32.3659ZM18.135 17.6345C14.067 21.7025 14.067 28.2979 18.135 32.3659L15.1887 35.3121C9.49352 29.6171 9.49352 20.3834 15.1887 14.6882L18.135 17.6345ZM25.5007 29.1671C27.8019 29.1671 29.6673 27.3015 29.6673 25.0004C29.6673 22.6992 27.8019 20.8338 25.5007 20.8338C23.1994 20.8338 21.334 22.6992 21.334 25.0004C21.334 27.3015 23.1994 29.1671 25.5007 29.1671Z"
            className="group-hover:fill-white fill-[#51D7B1]"
          />
        </svg>
      ),
    },
    {
      label: 'Habis',
      icon: (
        <svg
          width="51"
          height="50"
          viewBox="0 0 51 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M38 27.0832C40.2767 27.0832 42.4113 27.6919 44.2498 28.7553L44.2496 14.5832L33.8333 4.1665H8.83021C7.68227 4.1665 6.75 5.09161 6.75 6.23275V43.7669C6.75 44.8846 7.67658 45.8332 8.81958 45.8332H27.1723C26.1087 43.9946 25.5 41.86 25.5 39.5832C25.5 32.6796 31.0965 27.0832 38 27.0832ZM45.3658 44.0023L40.9465 39.583L45.3658 35.1636L42.4196 32.2173L38.0002 36.6367L33.5808 32.2173L30.6346 35.1636L35.054 39.583L30.6346 44.0023L33.5808 46.9486L38.0002 42.5292L42.4196 46.9486L45.3658 44.0023Z"
            className="group-hover:fill-white fill-[#51D7B1]"
          />
        </svg>
      ),
    },
    {
      label: 'Stok Sedikit',
      icon: (
        <svg
          width="51"
          height="50"
          viewBox="0 0 51 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M44.2493 6.25H6.74935C5.59877 6.25 4.66602 7.18275 4.66602 8.33333V41.6667C4.66602 42.8173 5.59877 43.75 6.74935 43.75H44.2493C45.4 43.75 46.3327 42.8173 46.3327 41.6667V8.33333C46.3327 7.18275 45.4 6.25 44.2493 6.25ZM25.4993 33.3333C22.0475 33.3333 19.2493 30.5352 19.2493 27.0833H8.83268V10.4167H42.166V27.0833H31.7493C31.7493 30.5352 28.9512 33.3333 25.4993 33.3333ZM33.8327 18.75H27.5827V12.5H23.416V18.75H17.166L25.4993 28.125L33.8327 18.75Z"
            className="group-hover:fill-white fill-[#51D7B1]"
          />
        </svg>
      ),
    },
    {
      label: 'Diarsipkan',
      icon: (
        <svg
          width="51"
          height="50"
          viewBox="0 0 51 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.83333 10.4167H42.1667V6.25H8.83333V10.4167ZM42.1667 18.75H8.83333V14.5833H42.1667V18.75ZM19.25 27.0833H31.75V22.9167H44.25V41.6667C44.25 42.8173 43.3173 43.75 42.1667 43.75H8.83333C7.68275 43.75 6.75 42.8173 6.75 41.6667V22.9167H19.25V27.0833Z"
            className="group-hover:fill-white fill-[#51D7B1]"
          />
        </svg>
      ),
    },
    {
      label: 'Diiklankan',
      icon: (
        <svg
          width="51"
          height="50"
          viewBox="0 0 51 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M29.5548 4.36269C27.2187 2.37194 23.7829 2.37196 21.4471 4.36267L18.6387 6.75592C18.305 7.04027 17.8901 7.2121 17.4531 7.24698L13.775 7.5405C10.7155 7.78465 8.28611 10.2141 8.04197 13.2735L7.74847 16.9516C7.71361 17.3886 7.54172 17.8036 7.25736 18.1372L4.86411 20.9456C2.8734 23.2816 2.87342 26.7173 4.86415 29.0531L7.2574 31.8616C7.54172 32.1954 7.71357 32.6102 7.74845 33.0473L8.04201 36.7252C8.28615 39.7845 10.7156 42.2139 13.7751 42.4581L17.4531 42.7518C17.8901 42.7866 18.3049 42.9585 18.6386 43.2429L21.4469 45.636C23.7829 47.6266 27.2187 47.6268 29.5548 45.636L32.3631 43.2429C32.6967 42.9585 33.1114 42.7866 33.5485 42.7516L37.2267 42.4581C40.286 42.2141 42.7154 39.7847 42.9598 36.7252L43.2531 33.0473C43.2879 32.6102 43.46 32.1952 43.7442 31.8614L46.1375 29.0533C48.1283 26.7173 48.1283 23.2814 46.1375 20.9456L43.7442 18.1371C43.4598 17.8035 43.2881 17.3886 43.2533 16.9516L42.9598 13.2735C42.7156 10.2141 40.286 7.7846 37.2267 7.54048L33.5485 7.24696C33.1114 7.21208 32.6967 7.04027 32.3631 6.75592L29.5548 4.36269ZM31.3929 16.1608L34.3392 19.107L19.6077 33.8385L16.6614 30.892L31.3929 16.1608ZM21.8175 21.3166C20.597 22.537 18.6184 22.537 17.398 21.3166C16.1776 20.0964 16.1776 18.1177 17.398 16.8973C18.6184 15.6769 20.597 15.6769 21.8175 16.8973C23.0379 18.1177 23.0379 20.0964 21.8175 21.3166ZM29.1831 33.1018C27.9627 31.8814 27.9627 29.9029 29.1831 28.6825C30.4035 27.462 32.3821 27.462 33.6025 28.6825C34.8229 29.9029 34.8229 31.8814 33.6025 33.1018C32.3821 34.3223 30.4035 34.3223 29.1831 33.1018Z"
            className="group-hover:fill-white fill-[#51D7B1]"
          />
        </svg>
      ),
    },
    {
      label: 'Etalase',
      icon: (
        <svg
          width="51"
          height="50"
          viewBox="0 0 51 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M46.334 41.6665V45.8332H4.66732V41.6665H6.75065V27.5878C4.23817 25.9061 2.58398 23.0419 2.58398 19.7915C2.58398 18.0683 3.05155 16.4086 3.90319 14.9945L9.55336 5.20817C9.92551 4.56359 10.6133 4.1665 11.3576 4.1665H39.6438C40.3879 4.1665 41.0759 4.56359 41.4479 5.20817L47.0788 14.9618C47.9498 16.4086 48.4173 18.0683 48.4173 19.7915C48.4173 23.0419 46.7632 25.9061 44.2507 27.5878V41.6665H46.334ZM12.5603 8.33317L7.49228 17.1107C7.00917 17.9132 6.75065 18.8309 6.75065 19.7915C6.75065 22.668 9.08251 24.9998 11.959 24.9998C14.1068 24.9998 16.0104 23.688 16.796 21.728C17.4952 19.9836 19.9644 19.9836 20.6636 21.728C21.4492 23.688 23.3527 24.9998 25.5007 24.9998C27.6486 24.9998 29.5521 23.688 30.3377 21.728C31.0369 19.9836 33.5061 19.9836 34.2052 21.728C34.9909 23.688 36.8944 24.9998 39.0423 24.9998C41.9188 24.9998 44.2507 22.668 44.2507 19.7915C44.2507 18.8309 43.9921 17.9132 43.4896 17.0779L38.4409 8.33317H12.5603Z"
            className="group-hover:fill-white fill-[#51D7B1]"
          />
        </svg>
      ),
    },
  ]

  const handleButtonClick = (label: string) => {
    console.log(`Button "${label}" clicked`)
    // Tambahkan logika untuk setiap label di sini
    switch (label) {
      case 'Semua':
        router.push('/seller/dashboard/kelola-produk/semua-produk')
        console.log('Navigasi ke semua produk')
        break
      case 'Live':
        router.push('/seller/dashboard/kelola-produk/live')
        console.log('Navigasi ke produk live')
        break
      case 'Habis':
        router.push('/seller/dashboard/kelola-produk/habis')
        console.log('Navigasi ke produk habis')
        break
      case 'Stok Sedikit':
        router.push('/seller/dashboard/kelola-produk/stok-sedikit')
        console.log('Navigasi ke produk stok sedikit')
        break
      case 'Diarsipkan':
        router.push('/seller/dashboard/kelola-produk/diarsipkan')
        console.log('Navigasi ke produk diarsipkan')
        break
      case 'Diiklankan':
        router.push('/seller/dashboard/kelola-produk/diiklankan')
        console.log('Navigasi ke produk diiklankan')
        break
      case 'Etalase':
        router.push('/seller/dashboard/kelola-produk/live')
        console.log('Navigasi ke produk etalase')
        break
      // Tambahkan case lainnya sesuai kebutuhan
      default:
        console.log(`Tidak ada tindakan untuk ${label}`)
    }
  }

  return (
    <LayoutUtama>
      <Header title="Produk Saya" children={undefined} />

      <div className="container mx-auto p-4 font-nunito pt-20">
        <div className="flex flex-col items-center p-4">
          <div className="grid grid-cols-3 gap-4">
            {menuItems.map((item, index) => (
              <div
                key={index}
                onClick={() => handleButtonClick(item.label)}
                className="flex flex-col items-center justify-center gap-3 p-[10px] w-[95px] h-[105px] rounded-md border border-[#d3d3d3] bg-white group cursor-pointer hover:bg-[#51D7B1]"
                style={{
                  boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.25)',
                }}
              >
                {/* SVG Ikon */}
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 50 50"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-[#51D7B1] group-hover:fill-white" // Warna ikon berubah menjadi putih saat hover
                >
                  {item.icon}
                </svg>

                {/* Label */}
                <div className="text-center font-nunito text-[13px] font-bold leading-[150%] text-[#51D7B1] group-hover:text-white">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </LayoutUtama>
  )
}

export default KelolaProduk
