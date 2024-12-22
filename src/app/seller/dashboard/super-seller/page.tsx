'use client'
import React, { useState } from 'react'
import Header from '@/app/layouts/header'
import LayoutUtama from '@/app/layouts/layout-utama'
import { useRouter } from 'next/navigation'
// import 'bootstrap-icons/font/bootstrap-icons.css';
// import { CheckCircle } from 'react-bootstrap-icons'

interface Task {
  id: number
  title: string
  content: string
  isCompleted: boolean
  percentage: number
  sold: number // Add the sold property
  target: number
}

const tasks: Task[] = [
  {
    id: 1,
    title: 'Produk Terjual',
    content:
      'Kamu harus mencapai target produk terjual 50 pcs dalam 30 hari terakhir',
    isCompleted: true,
    percentage: 100, // Contoh persentase pencapaian
    sold: 52, // Contoh jumlah produk yang sudah terjual
    target: 50, // Target produk yang harus terjual
  },
  {
    id: 2,
    title: 'Total Komplain',
    content:
      'Total Komplain kamu lebih dari 40% dari target 30%, ayo tingkatkan lagi kualitas barangmu',
    isCompleted: true,
    percentage: 100, // Sudah selesai
    sold: 25,
    target: 30,
  },
  {
    id: 3,
    title: 'Rating',
    content:
      'Kamu harus mendapatkan minimal rating 4.5 dari penjualanmu dari pelanggan',
    isCompleted: false,
    percentage: 70,
    sold: 4.2, // Jumlah penjualan (misalnya sudah terjual 100 produk)
    target: 4.5, // Target rating bisa berdasarkan penjualan tertentu
  },
  {
    id: 4,
    title: 'Presentase Chat',
    content: 'Kamu harus mencapai presentase respon chat kepada pembeli 70%',
    isCompleted: true,
    percentage: 100, // Sudah selesai
    sold: 80,
    target: 70,
  },
  {
    id: 5,
    title: 'Potensi Pelanggaran',
    content:
      'Kamu harus meminimalisir pembatalan pesanan oleh buyer, maksimalkan penjualanmu',
    isCompleted: false,
    percentage: 50,
    sold: 20, // Contoh jumlah pembatalan pesanan
    target: 40, // Target pembatalan pesanan
  },
]

const PendaftaranSuperSeller: React.FC = () => {
  const router = useRouter()
  const [isAgreed, setIsAgreed] = useState(false)
  const [selectedTask, setSelectedTask] = useState<Task | null>(tasks[0] || null)
  const isTaskCompleted = selectedTask?.percentage === 100
  const completedTasks = tasks.filter((task) => task.percentage === 100).length
  const totalTasks = tasks.length

  // Hitung persentase progress
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0
  // Konten untuk bagian bawah ketika persentasenya 100%
  const taskCompletionMessage = isTaskCompleted ? (
    <div className="completion-message">
      {selectedTask?.title === 'Produk Terjual' && (
        <p>
          Selamat produk kamu sudah terjual {selectedTask.sold} pcs dari total
          target {selectedTask.target} pcs pesanan.
        </p>
      )}
      {selectedTask?.title === 'Total Komplain' && (
        <p>
          Selamat total komplain kamu kurang dari {selectedTask.sold}% dari
          target 30%, ayo tingkatkan lagi kualitas barangmu.
        </p>
      )}
      {selectedTask?.title === 'Rating' && (
        <p>
          Selamat rating toko kamu sudah {selectedTask.sold} dari total target{' '}
          {selectedTask.target}.
        </p>
      )}
      {selectedTask?.title === 'Presentase Chat' && (
        <p>
          Selamat kamu telah menyelesaikan tugas, harus mendapatkan presentase
          respon chat kepada pembeli {selectedTask.target}%.
        </p>
      )}
      {selectedTask?.title === 'Potensi Pelanggaran' && (
        <p>
          Selamat, kamu telah meminimalisir pembatalan pesanan oleh buyer,
          maksimalkan penjualanmu.
        </p>
      )}
    </div>
  ) : null  /*************  ✨ Codeium Command ⭐  *************/
  /**
   * Opens the terms popup
   */
  /******  e27a1972-f8cf-4c0c-8bf3-690273ee0acb  *******/
  const handleOpenTermsPopup = () => {
    setShowTermsPopup(true)
  }

  const handleContinue = () => {
    console.log("Tombol konfirmasi diklik")
    console.log("Checkbox disetujui:", isAgreed)
    router.push('/seller/dashboard/super-seller/informasi-akun') // Arahkan ke halaman rekening bank
  }

  const handleCloseTermsPopup = () => {
    setShowTermsPopup(false)
  }

  const [showTermsPopup, setShowTermsPopup] = useState(false)

  const handleCheckboxChange = () => {
    setIsAgreed(!isAgreed)
  }

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task)
  }

  const closePopup = () => {
    setSelectedTask(null)
  }

  const renderIcon = (title: string, isCompleted: boolean) => {
    const baseRect = isCompleted ? '#FDFDFD' : '#D7D7D7' // Background color based on completion
    const basePath = isCompleted ? '#51D7B1' : '#A9A9A9' // Path color based on completion

    switch (title) {
      case 'Produk Terjual':
        return (
          <svg
            width="40"
            height="40"
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="32" height="32" rx="16" fill={baseRect} />
            <path
              d="M16.0039 8.66602C17.8449 8.66602 19.3373 10.1584 19.3373 11.9993V13.3327H21.3373C21.7055 13.3327 22.0039 13.6312 22.0039 13.9993V21.9994C22.0039 22.3676 21.7055 22.666 21.3373 22.666H10.6706C10.3024 22.666 10.0039 22.3676 10.0039 21.9994V13.9993C10.0039 13.6312 10.3024 13.3327 10.6706 13.3327H12.6706V11.9993C12.6706 10.1584 14.163 8.66602 16.0039 8.66602ZM19.3373 15.3327H18.0039V15.9994C18.0039 16.3676 18.3024 16.666 18.6706 16.666C19.0125 16.666 19.2943 16.4087 19.3328 16.0771L19.3373 15.9994V15.3327ZM14.0039 15.3327H12.6706V15.9994C12.6706 16.3676 12.9691 16.666 13.3372 16.666C13.6791 16.666 13.9609 16.4087 13.9994 16.0771L14.0039 15.9994V15.3327ZM16.0039 9.99935C14.9388 9.99935 14.0681 10.832 14.0073 11.8818L14.0039 11.9993V13.3327H18.0039V11.9993C18.0039 10.9342 17.1713 10.0636 16.1215 10.0027L16.0039 9.99935Z"
              fill={basePath}
            />
          </svg>
        )
      case 'Total Komplain':
        return (
          <svg
            width="40"
            height="40"
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="32" height="32" rx="16" fill={baseRect} />
            <path
              d="M15.9987 22.6673C12.3168 22.6673 9.33203 19.6825 9.33203 16.0007C9.33203 12.3188 12.3168 9.33398 15.9987 9.33398C19.6806 9.33398 22.6654 12.3188 22.6654 16.0007C22.6654 19.6825 19.6806 22.6673 15.9987 22.6673ZM15.332 18.0007V19.334H16.6654V18.0007H15.332ZM15.332 12.6673V16.6673H16.6654V12.6673H15.332Z"
              fill={basePath}
            />
          </svg>
        )
      case 'Rating':
        return (
          <svg
            width="40"
            height="40"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="32" height="32" rx="16" fill={baseRect} />
            <path
              d="M16.0005 19.3327L12.082 21.7261L13.1474 17.2597L9.66016 14.2726L14.2372 13.9056L16.0005 9.66602L17.7639 13.9056L22.3409 14.2726L18.8537 17.2597L19.9191 21.7261L16.0005 19.3327Z"
              fill={basePath}
            />
          </svg>
        )
      case 'Presentase Chat':
        return (
          <svg
            width="40"
            height="40"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="32" height="32" rx="16" fill={baseRect} />
            <path
              d="M12.8595 21.8835L9.33203 22.6673L10.1159 19.1399C9.61566 18.2044 9.33203 17.1357 9.33203 16.0007C9.33203 12.3188 12.3168 9.33398 15.9987 9.33398C19.6806 9.33398 22.6654 12.3188 22.6654 16.0007C22.6654 19.6825 19.6806 22.6673 15.9987 22.6673C14.8637 22.6673 13.795 22.3837 12.8595 21.8835Z"
              fill={basePath}
            />
          </svg>
        )
      case 'Potensi Pelanggaran':
        return (
          <svg
            width="40"
            height="40"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="32" height="32" rx="16" fill={baseRect} />
            <path
              d="M15.9987 22.6663C12.3168 22.6663 9.33203 19.6815 9.33203 15.9997C9.33203 12.3178 12.3168 9.33301 15.9987 9.33301C19.6806 9.33301 22.6654 12.3178 22.6654 15.9997C22.6654 19.6815 19.6806 22.6663 15.9987 22.6663ZM15.9987 15.0569L14.1131 13.1712L13.1703 14.1141L15.0559 15.9997L13.1703 17.8853L14.1131 18.8281L15.9987 16.9425L17.8843 18.8281L18.8271 17.8853L16.9415 15.9997L18.8271 14.1141L17.8843 13.1712L15.9987 15.0569Z"
              fill={basePath}
            />
          </svg>
        )
      // Tambahkan ikon lainnya sesuai dengan judul
      default:
        return null
    }
  }

  return (
    <LayoutUtama>
      <Header title="Pendaftaran Super Seller" children={undefined} />

      <div className="container mx-auto font-nunito pt-24 px-6">
        <div className="bg-white border-2 rounded-[12px] shadow-lg py-3">
          <h2 className="px-3 text-[16px] font-bold mb-2 border-b-2 border-gray-400">
            Tugas Super Seller
          </h2>

          {/* Task List */}
          <div className="space-y-6 py-3 px-4">
            {tasks.map((task) => (
              <div
                key={task.id}
                onClick={() => handleTaskClick(task)}
                className="rounded-lg cursor-pointer hover:bg-gray-200 flex items-start"
              >
                {/* Icon */}
                {task.percentage === 100 ? (
                  <svg
                    width="25"
                    height="24"
                    viewBox="0 0 25 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="shrink-0"
                  >
                    <path
                      d="M12.2612 22C6.6178 22 2.04297 17.5228 2.04297 12C2.04297 6.47715 6.6178 2 12.2612 2C17.9044 2 22.4793 6.47715 22.4793 12C22.4793 17.5228 17.9044 22 12.2612 22ZM11.242 16L18.4674 8.92893L17.0223 7.51472L11.242 13.1716L8.35189 10.3431L6.90681 11.7574L11.242 16Z"
                      fill="#51D7B1"
                    />
                  </svg>
                ) : (
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="shrink-0"
                  >
                    <path
                      d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM11.0026 16L6.75999 11.7574L8.17421 10.3431L11.0026 13.1716L16.6595 7.51472L18.0737 8.92893L11.0026 16Z"
                      fill="black"
                    />
                  </svg>
                )}

                {/* Task Content */}
                <div className="ml-2 ">
                  <h3 className="text-[13px] font-semibold">{task.title}</h3>
                  <p className="text-[9px]">{task.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Terms and Conditions */}
        <div className="mt-3 px-2 py-2 flex items-center justify-start w-full">
          <input
            type="checkbox"
            checked={isAgreed}
            onChange={() => setShowTermsPopup(true)}
            className="mr-2"
          />
          <label className="text-[11px] text-black">
            Saya Menyetujui dan Mengerti Syarat & Ketentuan Super Seller
          </label>
        </div>

        {/* Button */}
        <div>
          <button
            onClick={handleContinue}
            disabled={!isAgreed}
            className={`mt-2 w-full py-3 rounded ${
              isAgreed
                ? 'bg-[#51D7B1] text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Konfirmasi
          </button>
        </div>
      </div>

      {/* Popup Syarat dan Ketentuan */}
      {showTermsPopup && (
        <div className="fixed inset-0 z-50 flex justify-center items-end">
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={handleCloseTermsPopup}
          ></div>
          <div className="bg-white p-6 h-[430px] text-black rounded-t-[24px] w-full max-w-md shadow-lg z-50 animate-slide-up relative overflow-hidden">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-[16px] text-black font-semibold">
                Syarat & Ketentuan Menjadi Super Seller
              </h1>
              <svg
                onClick={handleCloseTermsPopup}
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                className="cursor-pointer"
              >
                <path
                  d="M6.99976 5.46871L12.362 0.106445L13.8941 1.63851L8.53181 7.00076L13.8941 12.3629L12.362 13.895L6.99976 8.53281L1.63754 13.895L0.105469 12.3629L5.46771 7.00076L0.105469 1.63851L1.63754 0.106445L6.99976 5.46871Z"
                  fill="black"
                />
              </svg>
            </div>
            {/* Isi Syarat dan Ketentuan */}
            <ul className="w-full max-h-[240px] overflow-y-auto border text-[14px] rounded-[24px] font-medium p-[12px]">
              <li className="font-nunito mb-2">
                Dalam konteks e-commerce di Indonesia, program{' '}
                <strong>"Super Seller"</strong> membawa berbagai keuntungan bagi
                penjual yang mencapai status ini. Berikut adalah beberapa
                manfaat:
              </li>
              <li className="font-nunito mb-2">
                <strong>1. Peningkatan Visibilitas:</strong> Produk dari Super
                Seller sering kali mendapatkan posisi lebih tinggi dalam hasil
                pencarian dan rekomendasi, meningkatkan peluang produk dilihat
                oleh lebih banyak calon pembeli.
              </li>
              <li className="font-nunito mb-2">
                <strong>2. Badge Kepercayaan:</strong> Adanya badge atau label
                "Super Seller" membuat toko lebih terpercaya di mata pembeli,
                sehingga bisa meningkatkan tingkat konversi penjualan.
              </li>
              <li className="font-nunito mb-2">
                <strong>3. Akses ke Program Promo Eksklusif:</strong> Super
                Seller biasanya diikutsertakan dalam program promosi eksklusif
                yang diselenggarakan oleh platform e-commerce, seperti Flash
                Sale atau Campaign besar yang membantu meningkatkan penjualan.
              </li>
              <li className="font-nunito mb-2">
                <strong>4. Dukungan Layanan Pelanggan Prioritas:</strong>{' '}
                Penjual dengan status Super Seller sering mendapatkan dukungan
                pelanggan yang lebih cepat dan prioritas dibandingkan dengan
                penjual lainnya.
              </li>
              <li className="font-nunito mb-2">
                <strong>5. Fasilitas Pengiriman yang Lebih Baik:</strong>{' '}
                Platform e-commerce sering memberikan diskon pengiriman atau
                kerja sama dengan kurir tertentu untuk mempermudah dan
                mengurangi biaya pengiriman bagi Super Seller.
              </li>
              <li className="font-nunito mb-2">
                <strong>
                  6. Komisi Lebih Rendah atau Bebas Biaya Transaksi:
                </strong>{' '}
                Beberapa platform memberikan potongan komisi atau bahkan
                membebaskan biaya transaksi bagi Super Seller, yang dapat
                mengurangi biaya operasional mereka.
              </li>
              <li className="font-nunito mb-2">
                <strong>7. Akses ke Data dan Insight Lebih Mendalam:</strong>{' '}
                Super Seller biasanya diberikan akses ke analitik yang lebih
                lengkap untuk membantu mereka menganalisis performa penjualan,
                perilaku pembeli, serta merencanakan strategi yang lebih baik.
              </li>
              <li className="font-nunito mb-2">
                <strong>8. Peningkatan Kecepatan Pencairan Dana:</strong>{' '}
                Beberapa platform mempercepat proses pencairan dana hasil
                penjualan untuk Super Seller, memberikan mereka akses lebih
                cepat ke uang tunai.
              </li>
              <li className="font-nunito mb-2">
                <strong>.9 Proteksi Penjual:</strong> Super Seller sering kali
                mendapatkan proteksi lebih dari platform dalam hal sengketa atau
                masalah pengembalian barang, sehingga mereka lebih terlindungi
                dari klaim yang tidak valid.
              </li>
              <li className="font-nunito mb-2">
                <strong>10. Dukungan Pengembangan Usaha:</strong> Beberapa
                platform mungkin juga memberikan pelatihan, tips, atau webinar
                eksklusif untuk membantu Super Seller dalam mengembangkan
                usahanya.
              </li>
            </ul>

            {/* Checkbox Agree */}
            <div className="flex items-center justify-start w-full mt-4 ml-2">
              <input
                type="checkbox"
                checked={isAgreed}
                onChange={() => setIsAgreed(!isAgreed)}
                className="mr-2"
              />
              <label className="text-[12px]">
                Saya Menyetujui dan Mengerti Syarat & Ketentuan Super Seller
              </label>
            </div>

            {/* Button Setuju */}
            <button
              onClick={handleCloseTermsPopup}
              className="mt-4 w-full h-[45px] rounded-md bg-[#51D7B1] text-white flex justify-center items-center"
              disabled={!isAgreed}
            >
              Setuju
            </button>
          </div>
        </div>
      )}

      {/* Popup Task Detail */}
      {/* Popup Task Detail */}
      {selectedTask && (
        <div className="fixed inset-0 flex items-end justify-center z-50 font-nunito">
          {/* Background Overlay */}
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={closePopup}
          ></div>

          {/* Popup Content */}
          <div className="bg-white py-4 px-6 h-[250px] text-black rounded-t-[24px] w-full max-w-md shadow-lg relative overflow-hidden animate-slide-up flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-[16px] text-black font-semibold">
                {selectedTask.title}
              </h1>
              <svg
                onClick={closePopup}
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                className="cursor-pointer"
              >
                <path
                  d="M6.99976 5.46871L12.362 0.106445L13.8941 1.63851L8.53181 7.00076L13.8941 12.3629L12.362 13.895L6.99976 8.53281L1.63754 13.895L0.105469 12.3629L5.46771 7.00076L0.105469 1.63851L1.63754 0.106445L6.99976 5.46871Z"
                  fill="black"
                />
              </svg>
            </div>

            {/* Icons Row */}
            <div className="border-4 border-gray-300 rounded-[16px] p-2 mb-2">
              <div className="relative flex items-center justify-between mb-4">
                {/* Left Icon */}
                <div className="flex flex-col items-center justify-center">
                  {renderIcon(selectedTask.title, true)}
                  <h1 className="text-[10px] text-black font-semibold text-center mt-1">
                    {selectedTask.title}
                  </h1>
                </div>

                {/* Progress Bar */}
                <div className="relative w-[200px] h-[8px] bg-gray-300 rounded-full">
                  <div
                    className="absolute top-0 left-0 h-full rounded-full"
                    style={{
                      width: `${selectedTask.percentage}%`,
                      background: 'linear-gradient(to right, #83E69B, #00BAE1)',
                    }}
                  ></div>

                  {/* Center Icon */}
                  {selectedTask.percentage < 100 && (
                    <div
                      className="absolute top-[-20px] flex flex-col items-center justify-center"
                      style={{
                        left: `calc(${selectedTask.percentage}% - 12px)`,
                        transform: 'translateX(-50%)',
                      }}
                    ></div>
                  )}
                </div>

                {/* Right Icon */}
                <div className="flex flex-col items-center justify-center">
                  {selectedTask.percentage === 100
                    ? // When the percentage is 100%, show the icon with `true`
                      renderIcon(selectedTask.title, true)
                    : // Otherwise, show the icon with `false`
                      renderIcon(selectedTask.title, false)}
                  <h1 className="text-[10px] text-black font-semibold text-center mt-1">
                    {selectedTask.title}
                  </h1>
                </div>
              </div>

              {/* Task Content */}
              <div className="w-full max-h-[200px] overflow-y-auto text-[14px] rounded-[8px] font-medium p-[12px] text-left">
                {selectedTask.percentage === 100 ? (
                  <div>
                    {selectedTask.title === 'Produk Terjual' && (
                      <p>
                        Selamat produk kamu sudah terjual {selectedTask.sold}{' '}
                        pcs dari total target {selectedTask.target} pcs pesanan.
                      </p>
                    )}
                    {selectedTask.title === 'Total Komplain' && (
                      <p>
                        Selamat total komplain kamu kurang dari{' '}
                        {selectedTask.sold}% dari target 30%, ayo tingkatkan
                        lagi kualitas barangmu.
                      </p>
                    )}
                    {selectedTask.title === 'Rating' && (
                      <p>
                        Selamat rating toko kamu sudah {selectedTask.sold} dari
                        total target
                        {selectedTask.target}.
                      </p>
                    )}
                    {selectedTask.title === 'Presentase Chat' && (
                      <p>
                        Selamat kamu telah menyelesaikan tugas, harus
                        mendapatkan presentase respon chat kepada pembeli{' '}
                        {selectedTask.target}%.
                      </p>
                    )}
                    {selectedTask.title === 'Potensi Pelanggaran' && (
                      <p>
                        Selamat, kamu telah meminimalisir pembatalan pesanan
                        oleh buyer, maksimalkan penjualanmu.
                      </p>
                    )}
                  </div>
                ) : (
                  <p>{selectedTask.content}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </LayoutUtama>
  )
}

export default PendaftaranSuperSeller
