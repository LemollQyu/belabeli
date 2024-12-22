const TabelRincianPendapatan = () => {
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
    <div className="pt-4 px-4 font-semibold pb-8">
      <span className="text-md font-bold">Tabel Rincian</span>
      <div className="flex flex-col rounded-lg mt-4 border shadow-md overflow-hidden">
        {/* Header */}
        <div className="flex">
          <div className="w-[70px] px-2 py-1 bg-emerald-300 text-white text-sm font-bold text-center">
            {' '}
          </div>
          <div className="flex-1 grid grid-cols-2">
            <div className="px-2 py-3 bg-emerald-400 text-white text-sm font-bold text-center">
              Pendapatan Kotor
            </div>
            <div className="px-2 py-3 bg-emerald-400 text-white text-sm font-bold text-center">
              Pendapatan Bersih
            </div>
          </div>
        </div>
        {/* Data Rows */}
        {data.map(([date, gross, net], index) => (
          <div className="flex" key={index}>
            <div className="w-[70px] px-2 py-2 bg-emerald-400 text-center text-white text-xs border-b border-emerald-400">
              {date}
            </div>
            <div className="flex-1 grid grid-cols-2">
              <div className="px-2 py-2 bg-emerald-50 hover:bg-emerald-100 text-teal-900 text-xs text-center border-b border-emerald-400">
                {gross}
              </div>
              <div className="px-2 py-2 bg-emerald-50 hover:bg-emerald-100 text-teal-900 text-xs text-center border-b border-emerald-400">
                {net}
              </div>
            </div>
          </div>
        ))}
        {/* Total Row */}
        <div className="flex">
          <div className="w-[70px] px-2 py-3 bg-emerald-400 text-center text-white text-sm font-bold">
            Total
          </div>
          <div className="flex-1 grid grid-cols-2">
            <div className="px-2 py-3 bg-emerald-200 text-teal-900 text-sm font-bold text-center">
              Rp {totalGross.toLocaleString('id-ID')}
            </div>
            <div className="px-2 py-3 bg-emerald-200 text-teal-900 text-sm font-bold text-center">
              Rp {totalNet.toLocaleString('id-ID')}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TabelRincianPendapatan
