import axios from "axios";


export default async function Logout (token: string) {

    const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/v1/logout`,
        {},
        {
            headers: {
                'Authorization': token,
                'Accept': 'application/json'
              }
        }

        
    )

    return response
}