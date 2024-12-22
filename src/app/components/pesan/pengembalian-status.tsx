"use client";

const PengembalianStatus = () => {

  return (
  <>
    <div className="flex flex-col justify center mb-2">
        <div className="flex flex-wrap text-center w-full bg-gray-100 border-2 border-[#2EC99D] text-[#2EC99D] py-2 px-4 rounded-lg">
            Seller telah memproses pengajuan pengembalian Anda ke retur. Silakan melanjutkan proses.
            <button className="bg-[#2EC99D] w-full px-2 py-1 mt-2 text-white rounded-md">Proses Refund</button>
        </div>
    </div>
  </>
  );
};

export default PengembalianStatus;
