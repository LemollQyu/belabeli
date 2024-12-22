import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { LatLngTuple } from "leaflet";
import axios from "axios";
import ReactDOMServer from "react-dom/server";

const customMarkerIcon = L.divIcon({
  className: "custom-icon",
  html: ReactDOMServer.renderToStaticMarkup(
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18.364 17.364L12 23.7279L5.63604 17.364C2.12132 13.8492 2.12132 8.15076 5.63604 4.63604C9.15076 1.12132 14.8492 1.12132 18.364 4.63604C21.8787 8.15076 21.8787 13.8492 18.364 17.364ZM12 13C13.1046 13 14 12.1046 14 11C14 9.89543 13.1046 9 12 9C10.8954 9 10 9.89543 10 11C10 12.1046 10.8954 13 12 13Z"
        fill="#0095FF"
      />
    </svg>
  ),
  iconSize: [24, 24],
  iconAnchor: [12, 24],
});

const PinLocation = ({ dataLokasi, location }: any) => {
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [suburb, setSuburb] = useState("");
  const [postcode, setPostcode] = useState("");
  const [position, setPosition] = useState<LatLngTuple>([-6.2088, 106.8456]);
  const [responseAddress, setResponseAddress] = useState<any>({});
  const [responseAddressData, setResponseAddressData] = useState<any>({});

  console.log(responseAddress);
  location(responseAddressData);

  useEffect(() => {
    setAddress("Pilih lokasi anda saat ini");
  }, []);

  const UpdateMapCenter = ({ position }: { position: LatLngTuple }) => {
    const map = useMap();
    useEffect(() => {
      map.setView(position, 13);
    }, [position, map]);

    return null;
  };

  const fetchAddressFromCoords = async (
    latitude: number,
    longitude: number
  ) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
      );
      const data = response.data;

      setAddress(data.display_name);
      console.log("response data pin location = ", response);
      setResponseAddress(response);
      setResponseAddressData(response.data.address);

      console.log("dala addressnya = ", responseAddressData);

      // Ambil detail spesifik dari address
      const addressDetails = data.address || {};
      setCity(
        addressDetails.city ||
          addressDetails.town ||
          addressDetails.village ||
          ""
      );
      setState(addressDetails.state || "");

      // Pastikan "suburb" yang diambil adalah kecamatan, bukan RT/RW atau nama lingkungan
      // Kita periksa apakah "suburb" ada dan sesuai dengan format nama kecamatan
      const suburbValue =
        addressDetails.suburb || addressDetails.neighbourhood || "";
      const isSuburbValid = !suburbValue.match(/^[0-9]{1,3}\/[0-9]{1,3}$/); // Cek jika bukan format RT/RW
      setSuburb(isSuburbValid ? suburbValue : "");

      setPostcode(addressDetails.postcode || "");

      // Kirim data ke parent
      dataLokasi({
        address: data.display_name,
        city:
          addressDetails.city ||
          addressDetails.county ||
          addressDetails.village ||
          "",
        state: addressDetails.state || "",
        suburb: isSuburbValid ? suburbValue : "", // Kirim hanya jika valid
        postcode: addressDetails.postcode || "",
      });
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("Geolocation berhasil:", position); // Cek apakah geolokasi berhasil
          const { latitude, longitude } = position.coords;
          setPosition([latitude, longitude]);
          fetchAddressFromCoords(latitude, longitude);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      alert("Geolocation tidak didukung oleh browser ini.");
    }
  };

  const handleMarkerDragEnd = (event: any) => {
    const { lat, lng } = event.target.getLatLng();
    setPosition([lat, lng]);
    fetchAddressFromCoords(lat, lng);
  };

  return (
    <div className="flex flex-col items-center homepage w-[400px] mx-auto py-4 font-nunito">
      <div className="w-full h-[400px] relative z-0 mt-10">
        <MapContainer
          center={position}
          zoom={13}
          scrollWheelZoom={false}
          className="h-full"
        >
          <TileLayer
            attribution='&copy; <Link href="https://www.openstreetmap.org/copyright">OpenStreetMap</Link> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker
            position={position}
            icon={customMarkerIcon}
            draggable={true}
            eventHandlers={{ dragend: handleMarkerDragEnd }}
          >
            <Popup>Lokasi terpilih. Anda dapat mengubahnya.</Popup>
          </Marker>
          <UpdateMapCenter position={position} />
        </MapContainer>
        <button
          onClick={handleUseCurrentLocation}
          className="absolute bottom-4 right-4 bg-emerald-100 border border-emerald-400 px-2 py-2 rounded-lg shadow-md text-emerald-600 font-medium flex items-center space-x-2"
          style={{
            zIndex: 1000,
            pointerEvents: "auto",
          }}
        >
          <span className="font-nunito text-[12px]">
            Gunakan Lokasi Saat Ini
          </span>
        </button>
      </div>

      <div className="w-full bg-white px-4 py-6 border-t border-gray-300">
        <p className="font-bold text-[18px] mb-2  text-emerald-400">{city}</p>
        <p className="text-[13px]">Provinsi: {state}</p>
        <p className="text-[13px]">Kecamatan: {suburb || "Tidak Diketahui"}</p>
        <p className="text-[13px]">Kode Pos: {postcode}</p>
        <p className="font-nunito text-[13px] text-start text-black-500 mt-2">
          Alamat: {address}
        </p>
      </div>
    </div>
  );
};

export default PinLocation;
