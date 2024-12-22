"use server";

import network from "../main/network";

type postRekening = {
  bank_name: React.SetStateAction<string>;
  nomor_rekening: React.SetStateAction<string>;
  full_name: React.SetStateAction<string>;
};

type postRekeningResponse = {
    data: any;
    error?: any;
}

export default async function kirimDataRekening({ bank_name, nomor_rekening, full_name }: postRekening): Promise<postRekeningResponse> {
  try {
    const api = await network();
    const response = await api.post(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/rekening`,
      {
        bank_name: bank_name,
        nomor_rekening: nomor_rekening,
        full_name: full_name
      }
    );
    return {
        data: response.data
    };
  } catch (error: any) {
    console.error("Error post rekening : ", error);
    return {
        data: null,
        error: error.response?.data,
      };
  }
}
