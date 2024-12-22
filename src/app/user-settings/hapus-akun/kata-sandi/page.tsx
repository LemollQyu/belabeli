'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/app/layouts/header'
import LayoutUtama from '@/app/layouts/layout-utama'

const KataSandiForm = () => {
  const [password, setPassword] = useState('')
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [isPasswordValid, setIsPasswordValid] = useState(false)
  const router = useRouter()

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Lakukan validasi kata sandi
    if (password === 'kataSandiBenar') {
      setIsPasswordValid(true)
      router.push('/user-settings/hapus-akun/kode-otp')
    } else {
      alert('Kata sandi salah!')
    }
  }

  return (
    <LayoutUtama>
      <Header title="Kata Sandi" children={undefined} />

      {/* Form Kata Sandi */}
      <div className="min-h-screen flex flex-col justify-between">
        <form onSubmit={handleSubmit} className="container w-[400px] mx-auto p-4 font-nunito mt-20 flex flex-col flex-grow">
          <label className="block text-sm font-semibold mb-2">
            Kata Sandi Saat Ini
          </label>
          <div className="relative mb-6">
            <input
              type={passwordVisible ? 'text' : 'password'}
              value={password}
              onChange={handlePasswordChange}
              className="w-full p-3 rounded-lg border border-gray-300"
              placeholder="Masukkan kata sandi Anda"
              required
            />
            {/* Link Lupa Kata Sandi */}
          <div className="text-right mt-2">
            <a href="/authentikasi/lupa-sandi" className="text-[13px] text-gray-500 hover:underline">
              Lupa Kata Sandi?
            </a>
          </div>
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-4 top-4 font-nunito"
            >
              {passwordVisible ? (
                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 3.0658C17.3924 3.0658 21.8784 6.94556 22.8189 12.0658C21.8784 17.186 17.3924 21.0658 12 21.0658C6.60812 21.0658 2.12215 17.186 1.18164 12.0658C2.12215 6.94556 6.60812 3.0658 12 3.0658ZM12 19.0658C16.2359 19.0658 19.8603 16.1178 20.7777 12.0658C19.8603 8.01383 16.2359 5.0658 12 5.0658C7.7646 5.0658 4.14022 8.01383 3.22278 12.0658C4.14022 16.1178 7.7646 19.0658 12 19.0658ZM12 16.5658C9.51498 16.5658 7.50026 14.5511 7.50026 12.0658C7.50026 9.58052 9.51498 7.5658 12 7.5658C14.4855 7.5658 16.5003 9.58052 16.5003 12.0658C16.5003 14.5511 14.4855 16.5658 12 16.5658ZM12 14.5658C13.381 14.5658 14.5003 13.4465 14.5003 12.0658C14.5003 10.6851 13.381 9.5658 12 9.5658C10.6196 9.5658 9.50026 10.6851 9.50026 12.0658C9.50026 13.4465 10.6196 14.5658 12 14.5658Z" fill="black" />
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.8827 19.2968C16.1814 20.3755 14.1638 21.0002 12 21.0002C6.60812 21.0002 2.12215 17.1204 1.18164 12.0002C1.61832 9.62283 2.81932 7.5129 4.52047 5.93457L1.39366 2.80777L2.80788 1.39355L22.6069 21.1925L21.1927 22.6068L17.8827 19.2968ZM5.9356 7.3497C4.60673 8.56015 3.6378 10.1672 3.22278 12.0002C4.14022 16.0521 7.7646 19.0002 12 19.0002C13.5997 19.0002 15.112 18.5798 16.4243 17.8384L14.396 15.8101C13.7023 16.2472 12.8808 16.5002 12 16.5002C9.51498 16.5002 7.50026 14.4854 7.50026 12.0002C7.50026 11.1196 7.75317 10.2981 8.19031 9.60442L5.9356 7.3497ZM12.9139 14.328L9.67246 11.0866C9.5613 11.3696 9.50026 11.6777 9.50026 12.0002C9.50026 13.3809 10.6196 14.5002 12 14.5002C12.3227 14.5002 12.6309 14.4391 12.9139 14.328ZM20.8068 16.5925L19.376 15.1617C20.0319 14.2268 20.5154 13.1586 20.7777 12.0002C19.8603 7.94818 16.2359 5.00016 12 5.00016C11.1544 5.00016 10.3329 5.10311 9.56342 5.30009L11.9277 7.66435C12.6214 7.33166 13.396 7.18442 14.2338 7.18442C16.4403 7.18442 18.5 9.24415 18.5 12.0002C18.5 13.0937 18.1719 14.0865 17.6541 14.9151L20.8068 16.5925Z" fill="black" />
                </svg>
              )}
            </button>
          </div>

          {/* Tombol Submit */}
          <button
            type="submit"
            className="w-full p-3 bg-emerald-400 text-white rounded-lg mt-auto"
          >
            Lanjutkan
          </button>
        </form>
        
      </div>
    </LayoutUtama>
  )
}

export default KataSandiForm
