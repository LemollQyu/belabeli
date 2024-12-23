'use client'
import { useState } from 'react'
import Image from 'next/image'

const VariasiPopup = () => {
  const [selectedSize, setSelectedSize] = useState<number | null>(null)
  const [quantity, setQuantity] = useState(1)

  const product = {
    name: 'Sepatu Anak Sekolah SMP Semua Ukuran | Murah dan Berkualitas.',
    price: 600000,
    colors: ['Hitam', 'Putih', 'Biru'],
    sizes: [15, 16, 17, 18, 19, 20, 21, 22],
    stock: 21,
    images: ['/sepatu1.jpg', '/sepatu2.jpg', '/sepatu3.jpg'],
  }

  const handleSizeSelect = (size: number) => {
    setSelectedSize(size)
  }

  const handleQuantityChange = (type: 'increment' | 'decrement') => {
    if (type === 'increment' && quantity < product.stock) {
      setQuantity((prev) => prev + 1)
    } else if (type === 'decrement' && quantity > 1) {
      setQuantity((prev) => prev - 1)
    }
  }

  const handleSelectProduct = () => {
    if (selectedSize) {
      console.log('Produk dipilih:', {
        size: selectedSize,
        quantity,
      })
      alert('Produk berhasil dipilih!')
    } else {
      alert('Harap pilih ukuran terlebih dahulu!')
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-full max-w-[400px] rounded-lg p-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Varian Tersedia</h2>
          <button
            className="text-gray-500 hover:text-black"
            onClick={() => console.log('Popup closed')}
          >
            ✕
          </button>
        </div>

        {/* Warna */}
        <div className="mb-4">
          <h3 className="text-sm font-semibold">Warna : {product.colors.join(', ')}</h3>
        </div>

        {/* Gambar Produk */}
        <div className="flex gap-2 mb-4">
          {product.images.map((image, index) => (
            <Image
              key={index}
              src={image}
              alt={`Product Image ${index + 1}`}
              width={70}
              height={70}
              className="rounded-md object-cover border border-gray-300"
            />
          ))}
        </div>

        {/* Ukuran */}
        <div className="mb-4">
          <h3 className="text-sm font-semibold mb-2">Ukuran</h3>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => handleSizeSelect(size)}
                className={`w-10 h-10 flex items-center justify-center rounded-md border text-sm ${
                  selectedSize === size
                    ? 'bg-emerald-500 text-white'
                    : 'border-gray-300 text-gray-700 hover:border-gray-400'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Stok */}
        <div className="mb-4">
          <h3 className="text-sm">Stok : {product.stock}</h3>
        </div>

        {/* Kuantitas */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold">Kuantitas</h3>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleQuantityChange('decrement')}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-black hover:bg-gray-300"
            >
              -
            </button>
            <span className="text-sm">{quantity}</span>
            <button
              onClick={() => handleQuantityChange('increment')}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-black hover:bg-gray-300"
            >
              +
            </button>
          </div>
        </div>

        {/* Harga */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold">
            Rp {new Intl.NumberFormat('id-ID').format(product.price * quantity)}
          </h3>
        </div>

        {/* Tombol Pilih Produk */}
        <button
          onClick={handleSelectProduct}
          className="w-full bg-emerald-500 text-white py-3 rounded-md text-center font-semibold hover:bg-emerald-600"
        >
          Pilih Produk
        </button>
      </div>
    </div>
  )
}

export default VariasiPopup
