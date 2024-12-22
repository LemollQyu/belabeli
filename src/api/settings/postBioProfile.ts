"use server";

import network from "../main/network";

type bioProfile = {
  bio: React.SetStateAction<string>;
};

export default async function gantiBioProfile({ bio }: bioProfile) {
  try {
    const api = await network();
    const response = await api.put(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/user/bio`,
      {
        bio: bio,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error ganti bio profile : ", error);
    throw error; 
  }
}
