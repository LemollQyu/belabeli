"use client";
import deleteAddress from "@/api/address/deleteAddress";
import updateAddress from "@/api/address/putAddress";
import chooseAddress from "@/api/address/putChooseAddress";
import { AppContext2 } from "@/app/pengaturan/tambah-alamat/page";
import { useRouter } from "next/navigation";
import { useContext } from "react";

interface AlamatProps {
  idKey: number;
  name: string;
  phone: string;
  address: string;
  district: string;
  street: string;
  city: string;
  province: string;
  postalCode: string;
  idAddress: string;
}

const Alamat = ({
  idKey,
  name,
  address,
  district,
  street,
  city,
  province,
  postalCode,
  phone,
  idAddress,
}: AlamatProps) => {
  const router = useRouter();
  const context = useContext(AppContext2);

  // Ensure context is available
  if (!context) {
    throw new Error("AppContext2 must be used within AddressList");
  }

  const { isTrigger, setTrigger } = context;

  const handleDelete = async () => {
    console.log("Deleting address: ", idAddress);

    try {
      const response = await deleteAddress({ idAddress });
      console.log("Delete response:", response);
      setTrigger((prev) => !prev); // Toggle trigger for re-fetch
    } catch (err: any) {
      console.error("Error deleting address:", err);
    }
  };

  const handleChoose = async () => {
    console.log("Choosing address:", idAddress);

    try {
      const response = await chooseAddress({ addressId: idAddress });
      console.log("Choose response:", response);
      if (response.data.code === 200) {
        setTrigger((prev) => !prev); // Toggle trigger for re-fetch
      }
    } catch (err: any) {
      console.error("Error choosing address:", err);
    }
  };

  const handleClick = () => {
    router.push(`/address-data?addressId=${idAddress}&indexAddress=${idKey}`);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex items-start relative">
      <div className="flex-shrink-0">
        <svg
          width="24"
          height="24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          // onClick={handleClick}
          className="cursor-pointer"
        >
          <path
            d="M18.364 17.364L12 23.7279L5.63604 17.364C2.12132 13.8492 2.12132 8.15076 5.63604 4.63604C9.15076 1.12132 14.8492 1.12132 18.364 4.63604C21.8787 8.15076 21.8787 13.8492 18.364 17.364ZM12 13C13.1046 13 14 12.1046 14 11C14 9.89543 13.1046 9 12 9C10.8954 9 10 9.89543 10 11C10 12.1046 10.8954 13 12 13Z"
            fill="#0095FF"
          />
        </svg>
      </div>

      <div onClick={handleChoose} className="ml-6 flex-grow cursor-pointer">
        <h2 className="text-black font-bold">{name}</h2>
        <p className="mt-2 text-gray-700 text-sm">
          {street}, {address}, {district}, {city}
        </p>
        <p className="text-gray-700 text-sm">{province}</p>
        <p className="text-gray-700 text-sm">{postalCode}</p>
      </div>

      <div className="flex-shrink-0">
        <svg
          width="24"
          height="24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          // onClick={handleClick}
          className="cursor-pointer"
        >
          <path
            d="M13.1716 11.9999L8.2218 7.0502L9.636 5.63599L16 11.9999L9.636 18.3639L8.2218 16.9497L13.1716 11.9999Z"
            fill="black"
          />
        </svg>
      </div>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="none"
        onClick={handleDelete}
        className="absolute bottom-5 right-5 cursor-pointer"
      >
        <path
          d="M3.33329 6.66699H16.6666V17.5003C16.6666 17.9606 16.2935 18.3337 15.8333 18.3337H4.16663C3.70639 18.3337 3.33329 17.9606 3.33329 17.5003V6.66699ZM5.83329 4.16699V2.50033C5.83329 2.04009 6.20639 1.66699 6.66663 1.66699H13.3333C13.7935 1.66699 14.1666 2.04009 14.1666 2.50033V4.16699H18.3333V5.83366H1.66663V4.16699H5.83329ZM7.49996 3.33366V4.16699H12.5V3.33366H7.49996ZM7.49996 10.0003V15.0003H9.16663V10.0003H7.49996ZM10.8333 10.0003V15.0003H12.5V10.0003H10.8333Z"
          fill="#7F7F7F"
        />
      </svg>
    </div>
  );
};

export default Alamat;
