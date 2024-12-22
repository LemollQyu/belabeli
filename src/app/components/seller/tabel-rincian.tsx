type TabelRincianProps = {
  startDate: string
  endDate: string
}

const TabelRincian = ({ startDate, endDate }: TabelRincianProps) => {
  const dates = [
    '1 Sept',
    '2 Sept',
    '3 Sept',
    '4 Sept',
    '5 Sept',
    '6 Sept',
    '7 Sept',
    '8 Sept',
  ]
  const data = Array(8).fill({
    followers: '+ 20 Orang',
    visits: '20 Orang',
    ratings: '20 Orang',
  })

  return (
    <div className="pt-4 px-4 font-semibold pb-8">
      {/* Tabel Rincian */}
      <span className="text-md">Tabel Rincian</span>
      <div className="flex flex-col rounded-lg mt-2 border shadow-md overflow-hidden">
        {/* Header */}
        <div className="flex">
          <div className="w-[60px] px-2 py-3 bg-emerald-300 text-white text-xs font-bold text-center">
            {' '}
          </div>
          <div className="flex-1 grid grid-cols-3">
            <div className="px-1 py-3 bg-emerald-400 text-white text-xs font-bold text-center">
              Jumlah Pengikut
            </div>
            <div className="px-2 py-3 bg-emerald-400 text-white text-xs font-bold text-center">
              Toko Dikunjungi
            </div>
            <div className="px-2 py-3 bg-emerald-400 text-white text-xs font-bold text-center">
              Jumlah Rating
            </div>
          </div>
        </div>

        {/* Data Rows */}
        {data.map((item, index) => (
          <div className="flex" key={index}>
            {/* Column: Tanggal */}
            <div className="w-[60px] px-2 py-2 bg-emerald-400 text-center text-white text-xs border-b border-emerald-400">
              {dates[index]}
            </div>
            {/* Columns: Data */}
            <div className="flex-1 grid grid-cols-3">
              <div className="px-1 py-2 bg-emerald-50 hover:bg-emerald-100 text-teal-900 text-xs text-center border-b border-emerald-400">
                {item.followers}
              </div>
              <div className="px-2 py-2 bg-emerald-50 hover:bg-emerald-100 text-teal-900 text-xs text-center border-b border-emerald-400">
                {item.visits}
              </div>
              <div className="px-2 py-2 bg-emerald-50 hover:bg-emerald-100 text-teal-900 text-xs text-center border-b border-emerald-400">
                {item.ratings}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TabelRincian
