const RingkasanStatistik = () => {
  const data = [
    ['1 Sept', 'Rp 100.000', 'Rp 90.000'],
    ['2 Sept', 'Rp 200.000', 'Rp 190.000'],
    ['3 Sept', 'Rp 100.000', 'Rp 80.000'],
    ['4 Sept', 'Rp 80.000', 'Rp 70.000'],
    ['5 Sept', 'Rp 200.000', 'Rp 280.000'],
    ['6 Sept', 'Rp 100.000', 'Rp 80.000'],
    ['7 Sept', 'Rp 140.000', 'Rp 120.000'],
    ['8 Sept', 'Rp 100.000', 'Rp 100.000'],
  ]

  const totalGross = data.reduce(
    (sum, item) => sum + parseInt(item[1].replace(/[^\d]/g, '')),
    0,
  )
  const totalNet = data.reduce(
    (sum, item) => sum + parseInt(item[2].replace(/[^\d]/g, '')),
    0,
  )
  return (
    <div className="pt-4 px-4 text-sm font-semibold">
      Ringkasan Statistik Produk
      <div className="flex space-x-6 py-4 items-center justify-center bg-white">
        <div className="flex-1 px-1 py-2 bg-white rounded-lg border-2 shadow-sm">
          <div className="flex flex-col items-center text-sm font-semibold">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22.0039 6H15.0039C11.6902 6 9.00391 8.68629 9.00391 12C9.00391 15.3137 11.6902 18 15.0039 18H22.0039V20C22.0039 20.5523 21.5562 21 21.0039 21H3.00391C2.45163 21 2.00391 20.5523 2.00391 20V4C2.00391 3.44771 2.45163 3 3.00391 3H21.0039C21.5562 3 22.0039 3.44771 22.0039 4V6ZM15.0039 8H23.0039V16H15.0039C12.7947 16 11.0039 14.2091 11.0039 12C11.0039 9.79086 12.7947 8 15.0039 8ZM15.0039 11V13H18.0039V11H15.0039Z"
                fill="black"
              />
            </svg>
            <span>Pendapatan Kotor</span>
          </div>
          <div className="text-center text-sm font-bold">Total</div>
          <div className="text-center text-sm font-bold">
            {' '}
            Rp {totalGross.toLocaleString('id-ID')}
          </div>
        </div>
        <div className="flex-1 px-1 py-2 bg-white rounded-lg border-2 shadow-sm">
          <div className="flex flex-col items-center text-sm font-semibold">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.00391 3.00293H21.0039C21.5562 3.00293 22.0039 3.45064 22.0039 4.00293V20.0029C22.0039 20.5552 21.5562 21.0029 21.0039 21.0029H3.00391C2.45163 21.0029 2.00391 20.5552 2.00391 20.0029V4.00293C2.00391 3.45064 2.45163 3.00293 3.00391 3.00293ZM4.00391 5.00293V19.0029H20.0039V5.00293H4.00391ZM8.50391 14.0029H14.0039C14.28 14.0029 14.5039 13.7791 14.5039 13.5029C14.5039 13.2268 14.28 13.0029 14.0039 13.0029H10.0039C8.6232 13.0029 7.50391 11.8837 7.50391 10.5029C7.50391 9.12221 8.6232 8.00293 10.0039 8.00293H11.0039V6.00293H13.0039V8.00293H15.5039V10.0029H10.0039C9.72777 10.0029 9.50391 10.2268 9.50391 10.5029C9.50391 10.7791 9.72777 11.0029 10.0039 11.0029H14.0039C15.3846 11.0029 16.5039 12.1222 16.5039 13.5029C16.5039 14.8837 15.3846 16.0029 14.0039 16.0029H13.0039V18.0029H11.0039V16.0029H8.50391V14.0029Z"
                fill="black"
              />
            </svg>
            <span>Pendapatan Bersih</span>
          </div>
          <div className="text-center text-sm font-bold">Total</div>
          <div className="text-center text-sm font-bold">
            {' '}
            Rp {totalNet.toLocaleString('id-ID')}
          </div>
        </div>
      </div>
    </div>
  )
}

export default RingkasanStatistik
