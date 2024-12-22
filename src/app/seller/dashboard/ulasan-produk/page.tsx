'use client'
import React, { useState } from 'react'
import Header from '@/app/layouts/header'
import LayoutUtama from '@/app/layouts/layout-utama'
import Filter from '@/app/components/seller/popup-filter'
import Link from 'next/link'

// interface Review {
//   date: string
//   reply: string | null
// }

type Review = {
  id: number
  user: string
  profilePhoto: string
  date: string
  rating: number
  variant: string
  comment: string
  productName: string
  productImages: string[]
  reply: string | null
  replyDate: string | null
}

const ProductReviews = ({
  review,
}: {
  review: { id: number; date: string; reply: string | null }
}) => {
  const [activeTab, setActiveTab] = useState('Semua Ulasan')
  const [expandedReview, setExpandedReview] = useState<number | null>(null)
  const [editingReplyId, setEditingReplyId] = useState<number | null>(null)
  const [editedReply, setEditedReply] = useState<string>('')
  const [replyInputId, setReplyInputId] = useState<number | null>(null)
  const [replyText, setReplyText] = useState<string>('')
  const [isReplying, setIsReplying] = useState(false)

  type Review = {
    id: number
    user: string
    profilePhoto: string
    date: string
    rating: number
    variant: string
    comment: string
    productName: string
    productImages: string[]
    reply: string | null
    replyDate: string | null
  }

  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 1,
      user: 'Natasya',
      profilePhoto: '/profile.jpg',
      date: '26-09-2024 08:35',
      rating: 4,
      variant: 'Merah',
      comment:
        'Bagus sepatunya anakku langsung SALTO, saya kira dengan harga segitu barangnya jelek, ternyata barangnya melebihi eskpektasi saya.',
      productName: 'Kaos Distro Hitam Keren Kekinian Trend',
      productImages: ['/baju.jpg', '/baju-anak.jpg', '/headphone.jpg'],
      reply: 'Terima kasih kak ulasannya :)',
      replyDate: '24 September 2024',
    },
    {
      id: 2,
      user: 'Budi',
      profilePhoto: '/image/ktp.jpg',
      date: '27-09-2024 12:15',
      rating: 5,
      variant: 'Hitam',
      comment:
        'Kualitas produk sangat memuaskan, pengiriman cepat. Sangat direkomendasikan untuk yang cari produk berkualitas!',
      productName: 'Sepatu Sneakers Sporty Elegan',
      productImages: ['/sepatu.jpg', '/image/sepatu.jpg'],
      reply: 'Kami senang mendengar itu, Kak Budi!',
      replyDate: '27 September 2024',
    },
    {
      id: 3,
      user: 'Siti',
      profilePhoto: '/image/sicepat.jpg',
      date: '25-09-2024 09:10',
      rating: 3,
      variant: 'Biru',
      comment:
        'Produknya lumayan bagus, tapi ukuran agak sedikit lebih besar dari biasanya. Semoga ada peningkatan di masa depan.',
      productName: 'Tas Ransel Stylish dengan Banyak Kompartemen',
      productImages: ['/tas.jpg', '/tshirt.jpg'],
      reply: null,
      replyDate: null,
    },
    {
      id: 4,
      user: 'Andi',
      profilePhoto: '/image/produk/parrot.jpg',
      date: '28-09-2024 18:45',
      rating: 2,
      variant: 'Hijau',
      comment:
        'Sayangnya produk kurang sesuai dengan ekspektasi saya. Warnanya tidak seperti yang di gambar.',
      productName: 'Jaket Hoodie Premium Nyaman',
      productImages: ['/image/sepatu-rusak.jpg', '/image/sepatu.jpg'],
      reply:
        'Mohon maaf atas ketidaknyamanannya, Kak Andi. Kami akan meningkatkan kualitas produk.',
      replyDate: '29 September 2024',
    },
    {
      id: 6,
      user: 'Aminah',
      profilePhoto: '/headphone.jpg',
      date: '25-09-2024 09:10',
      rating: 5,
      variant: 'Biru',
      comment:
        'Produknya bagus,  ukurannya pas sekali dengan saya. Terima kasih seller.',
      productName: 'Tas Ransel Stylish dengan Banyak Kompartemen',
      productImages: ['/headphone.jpg', '/jam.jpg'],
      reply: null,
      replyDate: null,
    },
  ])

  const filteredReviews =
    activeTab === 'Semua Ulasan'
      ? reviews
      : activeTab === 'Dibalas'
      ? reviews.filter((review) => review.reply)
      : reviews.filter((review) => !review.reply)

  const toggleExpandReview = (id: number) => {
    setExpandedReview(expandedReview === id ? null : id)
  }
  const handleEditReply = (id: number, reply: string) => {
    setEditingReplyId(id)
    setEditedReply(reply)
  }

  // Function to save the edited reply
  const saveReply = (reviewId: number) => {
    const updatedReviews = reviews.map((review) =>
      review.id === reviewId
        ? {
            ...review,
            reply: editedReply,
            replyDate: new Date().toLocaleString(),
          }
        : review,
    )
    setReviews(updatedReviews) // Directly update the reviews state
    setEditingReplyId(null) // Reset editing state
  }

  // const saveEditedReply = (id: number) => {
  //   setReviews((prevReviews: Review[]) =>
  //     prevReviews.map((review: Review) =>
  //       review.id === id
  //         ? {
  //             ...review,
  //             reply: editedReply,
  //             replyDate: new Date().toLocaleDateString('id-ID', {
  //               day: '2-digit',
  //               month: 'long',
  //               year: 'numeric',
  //             }),
  //           }
  //         : review,
  //     ),
  //   )
  //   setEditingReplyId(null)
  //   setEditedReply('')
  //   console.log(`Saving reply for ID: ${id}, Reply: ${editedReply}`)
  // }

  const handleReplyClick = (id: number) => {
    setReplyInputId(replyInputId === id ? null : id) // Toggle input
    setReplyText('') // Reset teks respons
    setIsReplying(true) // Menandai bahwa user ingin membalas
  }

  const handleCancelReply = () => {
    setIsReplying(false)
    setReplyText('')
  }

  const handleSendReply = () => {
    // Logika untuk mengirim balasan
    console.log(`Balasan untuk review ${review.id}: ${replyText}`)
    setIsReplying(false)
  }

  // Pembungkus untuk menangani event onClick
  const handleClickWrapper = (event: React.MouseEvent<HTMLButtonElement>) => {
    handleReplyClick(review.id) // Memanggil handleReplyClick dengan id yang sesuai
  }

  // const saveReply = (id: number) => {
  //   setReviews((prevReviews) =>
  //     prevReviews.map((review) =>
  //       review.id === id
  //         ? {
  //             ...review,
  //             reply: editedReply,
  //             replyDate: new Date().toLocaleDateString('id-ID', {
  //               day: '2-digit',
  //               month: 'long',
  //               year: 'numeric',
  //             }),
  //           }
  //         : review,
  //     ),
  //   )
  //   console.log(`Reply saved for review ID: ${id}, Text: ${replyText}`)

  //   setEditingReplyId(null)
  //   setEditedReply('')
  // }

  const saveEditedReply = (id: number) => {
    setReviews((prevReviews) =>
      prevReviews.map((review) =>
        review.id === id
          ? {
              ...review,
              reply: editedReply,
              replyDate: new Date().toLocaleDateString('id-ID', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
              }),
            }
          : review,
      ),
    )
    console.log(`Saving reply for ID: ${id}, Reply: ${editedReply}`)
    setEditingReplyId(null)
    setEditedReply('')
  }

  return (
    <LayoutUtama>
      <Header title="Ulasan Produk" children={undefined} />
      <div className="container mx-auto py-4 font-nunito pt-20">
        {/* Tab Navigation */}
        <div className="flex border-b relative text-[14px]">
          {['Semua Ulasan', 'Belum Dibalas', 'Dibalas'].map((tab) => (
            <button
              key={tab}
              className={`flex-1 py-2 font-semibold ${
                activeTab === tab ? 'text-black' : 'text-gray-500'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
          <span
            className="absolute bottom-0 h-0.5 bg-black transition-all duration-300"
            style={{
              width: '33.33%',
              transform: `translateX(${
                activeTab === 'Semua Ulasan'
                  ? '0%'
                  : activeTab === 'Belum Dibalas'
                  ? '100%'
                  : '200%'
              })`,
            }}
          />
        </div>

        {/* Reviews */}
        <div className="mt-4 px-4 space-y-6">
          {filteredReviews.map((review) => (
            <div
              key={review.id}
              className="bg-[#F5F5F5] rounded-lg p-4 font-nunito"
            >
              {/* Header Section */}
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center space-x-2">
                  <img
                    src={review.profilePhoto}
                    alt={`Foto Profil ${review.user}`}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="font-semibold text-[14px]">
                    {review.user}
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-black text-[12px]">{review.date}</span>

                  {/* Conditionally render the "Balas" button if the review doesn't have a reply */}
                  {!review.reply && (
                    <button
                      className="bg-teal-500 text-white text-[14px] px-4 py-1 rounded-md"
                      onClick={() => handleReplyClick(review.id)}
                    >
                      {replyInputId === review.id ? 'Tutup' : 'Balas'}
                    </button>
                  )}
                </div>
              </div>

              {/* Rating Section */}
              <div className="flex items-center mb-2 text-[14px]">
                <span className="text-yellow-500">
                  {'★'.repeat(review.rating)}
                  {'☆'.repeat(5 - review.rating)}
                </span>
                <span className="text-black ml-2">
                  <b>Variasi: </b>
                  {review.variant}
                </span>
              </div>

              {/* Comment Section */}
              <p
                className="text-black text-[14px] mb-2"
                onClick={() => toggleExpandReview(review.id)}
              >
                {expandedReview === review.id
                  ? review.comment
                  : `${review.comment.slice(0, 50)}...`}
                <span className="text-teal-500 cursor-pointer ml-1">
                  {expandedReview === review.id
                    ? 'Lebih Sedikit'
                    : 'Selengkapnya'}
                </span>
              </p>
              <h2 className="text-white text-[13px] mb-2 p-2 rounded-md bg-emerald-400">
                {review.productName}
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

              {/* Reply Section */}
              {!review.reply && replyInputId === review.id && (
                <div>
                  <textarea
                    value={editedReply}
                    onChange={(e) => {
                      const words = e.target.value
                        .trim()
                        .split(/\s+/)
                        .filter(Boolean)
                      if (words.length <= 50) {
                        setEditedReply(e.target.value)
                      }
                    }}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-teal-500"
                    placeholder="Tulis balasan maksimal 50 kata..."
                  />
                  <div className="text-gray-500 text-[12px]">
                    {editedReply.trim().split(/\s+/).filter(Boolean).length}
                    /50 Kata
                  </div>
                  <div className="flex justify-end mt-2 space-x-2">
                    <button
                      onClick={() => setEditingReplyId(null)}
                      className="bg-gray-300 px-4 py-2 rounded-md text-black"
                    >
                      Batal
                    </button>
                    <button
                      onClick={() => saveReply(review.id)}
                      className="bg-teal-500 px-4 py-2 rounded-md text-white"
                      disabled={
                        editedReply.trim().split(/\s+/).filter(Boolean).length >
                        50
                      }
                    >
                      Simpan
                    </button>
                  </div>
                </div>
              )}

              {/* Existing Reply Section */}
              {/* Existing Reply */}
              {review.reply && (
                <div>
                  <span className="text-black text-[14px] font-medium mb-2 block">
                    Balasan Anda:
                  </span>
                  <div className="bg-gray-100 p-4 rounded-md border border-gray-300 mb-2">
                    {editingReplyId === review.id ? (
                      <div>
                        <textarea
                          value={editedReply}
                          onChange={(e) => {
                            const words = e.target.value
                              .trim()
                              .split(/\s+/)
                              .filter(Boolean)
                            if (words.length <= 50) {
                              setEditedReply(e.target.value)
                            }
                          }}
                          className="w-full p-2 border border-gray-300 rounded-md focus:outline-teal-500"
                          placeholder="Tulis balasan maksimal 50 kata..."
                        />
                        <div className="text-gray-500 text-[12px]">
                          {
                            editedReply.trim().split(/\s+/).filter(Boolean)
                              .length
                          }
                          /50 Kata
                        </div>
                        <div className="flex justify-end mt-2 space-x-2">
                          <button
                            onClick={() => setEditingReplyId(null)}
                            className="bg-gray-300 px-4 py-2 rounded-md text-black"
                          >
                            Batal
                          </button>
                          <button
                            onClick={() => saveEditedReply(review.id)}
                            className="bg-teal-500 px-4 py-2 rounded-md text-white"
                            disabled={
                              editedReply.trim().split(/\s+/).filter(Boolean)
                                .length > 50
                            }
                          >
                            Simpan
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center space-x-2">
                            <span className="text-black text-[14px] font-semibold">
                              Toko Penjual
                            </span>
                            <span className="bg-emerald-400 text-center font-semibold text-white text-[10px] w-14 px-1 py-1 rounded-md">
                              Penjual
                            </span>
                          </div>
                          <span className="text-black text-[12px]">
                            {review.replyDate}
                          </span>
                        </div>
                        <p className="text-black text-[14px] mb-3">
                          {review.reply}
                        </p>
                        <div className="text-gray-500 text-[12px]">
                          {review.reply
                            ? review.reply.trim().split(/\s+/).filter(Boolean)
                                .length
                            : 0}
                          /50 Kata
                        </div>
                        <div className="flex justify-end space-x-3 mt-3">
                          <button
                            onClick={() =>
                              handleEditReply(review.id, review.reply || '')
                            }
                            className="text-gray-400 hover:text-teal-500"
                          >
                            {/* Button Edit */}
                            <svg
                              width="18"
                              height="18"
                              viewBox="0 0 18 18"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M11.7959 7.18209L10.7353 6.12143L3.75 13.1067V14.1674H4.81066L11.7959 7.18209ZM12.8566 6.12143L13.9172 5.06078L12.8566 4.00011L11.7959 5.06078L12.8566 6.12143ZM5.43198 15.6674H2.25V12.4854L12.3263 2.40912C12.6192 2.11623 13.094 2.11623 13.3869 2.40912L15.5083 4.53044C15.8012 4.82333 15.8012 5.29821 15.5083 5.5911L5.43198 15.6674Z"
                                fill="#A9A9A9"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </LayoutUtama>
  )
}
export default ProductReviews
