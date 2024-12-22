import axios from "axios";
import network from "./main/network";

export default async function LogoutAfterCP () {

    try {

        const api = await network();
        const response = await api.post(
            `${process.env.NEXT_PUBLIC_BASE_API_URL}/v1/logout`,
        );
        return {
            data: response.data
        };
      } catch (error: any) {
        console.error("Error request otp email : ", error);
        return {
            data: null,
            error: error.response?.data,
          };
      }


}