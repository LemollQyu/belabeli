"use server";

import axios from "axios";
import network from "../main/network";

type dataAddress = {
  nama_lengkap: string;
  nomor_telepon: string;
  provinsi: string;
  kota: string;
  kecamatan: string;
  kode_pos: string;
  nama_jalan: string;
  instruksi_pengiriman: string;
};

export default async function postAddress({
  nama_lengkap,
  nomor_telepon,
  provinsi,
  kota,
  kecamatan,
  kode_pos,
  nama_jalan,
  instruksi_pengiriman,
}: dataAddress) {
  try {
    const api = await network();
    const response = await api.post(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/address`,
      {
        nama_lengkap: nama_lengkap,
        nomor_telepon: nomor_telepon,
        provinsi: provinsi,
        kota: kota,
        kecamatan: kecamatan,
        kode_pos: kode_pos,
        nama_jalan: nama_jalan,
        instruksi_pengiriman: instruksi_pengiriman,
      }
    );
    return {
      data: response.data,
    };
  } catch (error: any) {
    return {
      data: null,
      error: error.response?.data,
    };
  }
}
