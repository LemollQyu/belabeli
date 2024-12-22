"use server";

import axios from "axios";
import network from "../main/network";

type DataAddress = {
  addressId: string | null;
  nama_lengkap: string;
  nomor_telepon: string;
  provinsi: string;
  kota: string;
  kecamatan: string;
  kode_pos: string;
  nama_jalan: string;
  instruksi_pengiriman: string;
};

export default async function updateAddress({
  addressId, // ID address yang akan diupdate

  nama_lengkap,
  nomor_telepon,
  provinsi,
  kota,
  kecamatan,
  kode_pos,
  nama_jalan,
  instruksi_pengiriman,
}: DataAddress) {
  try {
    const api = await network();
    const response = await api.put(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/address/${addressId}`,
      {
        nama_lengkap,
        nomor_telepon,
        provinsi,
        kota,
        kecamatan,
        kode_pos,
        nama_jalan,
        instruksi_pengiriman,
      }
    );
    return {
      data: response.data,
    };
  } catch (error: any) {
    return {
      data: null,
      error: error.response?.data || error.message,
    };
  }
}
