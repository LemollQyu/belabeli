"use server";

import network from "../main/network";

type RekeningUser = {
    id: string; // Simplified to just a string
};

export default async function deleteRekening({ id }: RekeningUser) {
    try {
        const api = await network();
        const response = await api.delete(
            `${process.env.NEXT_PUBLIC_BASE_API_URL}/rekening/${id}`
        );
        return response.data;
    } catch (error) {
        console.error("Error deleting rekening:", error);
        throw error;
    }
}
