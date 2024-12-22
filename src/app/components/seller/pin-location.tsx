"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { LatLngTuple } from "leaflet";
import axios from "axios";
import ReactDOMServer from "react-dom/server";

const customMarkerIcon = L.divIcon({
  className: "custom-icon",
  html: ReactDOMServer.renderToStaticMarkup(
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M18.364 17.364L12 23.7279L5.63604 17.364C2.12132 13.8492 2.12132 8.15076 5.63604 4.63604C9.15076 1.12132 14.8492 1.12132 18.364 4.63604C21.8787 8.15076 21.8787 13.8492 18.364 17.364ZM12 13C13.1046 13 14 12.1046 14 11C14 9.89543 13.1046 9 12 9C10.8954 9 10 9.89543 10 11C10 12.1046 10.8954 13 12 13Z"
        fill="#0095FF"
      />
    </svg>
  ),
  iconSize: [24, 24],
  iconAnchor: [12, 24],
});

const PinLocation = () => {
  const router = useRouter();
  const [address, setAddress] = useState("");
  const [storeAddress, setStoreAddress] = useState("");
  const [city, setCity] = useState("");
  const [position, setPosition] = useState<LatLngTuple>([-6.2088, 106.8456]);

  useEffect(() => {
    const addressData = JSON.parse(localStorage.getItem("addressData") || "{}");
    setAddress(`${addressData.address}, ${addressData.district}, ${addressData.city}, ${addressData.province}, ${addressData.phone}`);
    setCity(addressData.city || "");
  }, []);

  const UpdateMapCenter = ({ position }: { position: LatLngTuple }) => {
    const map = useMap();
    useEffect(() => {
      map.setView(position, 13);
    }, [position, map]);

    return null;
  };

  // Fungsi untuk mendapatkan alamat berdasarkan koordinat
  const fetchAddressFromCoords = async (latitude: number, longitude: number) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
      );
      const data = response.data;
      const formattedAddress = data.display_name;
      setAddress(formattedAddress);

      // Ambil nama kota dari alamat terformat
      const addressParts = formattedAddress.split(", ");
      setCity(addressParts[0]); // Asumsikan nama kota adalah bagian pertama
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };

  // Fungsi untuk menangani perubahan pada input Alamat Toko
  const handleStoreAddressChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setStoreAddress(e.target.value);
    const address = e.target.value;

    // Gunakan geocoding API untuk mendapatkan koordinat berdasarkan alamat toko
    if (address) {
      try {
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`
        );
        const data = response.data[0];
        if (data) {
          const lat = parseFloat(data.lat);
          const lon = parseFloat(data.lon);
          setPosition([lat, lon]);
          fetchAddressFromCoords(lat, lon); // Ambil detail alamat berdasarkan koordinat
        }
      } catch (error) {
        console.error("Error fetching coordinates:", error);
      }
    }
  };

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
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
    <div className="flex flex-col items-center homepage w-[400px] mx-auto py-4 font-nunito pt-20">
      <div className="w-full bg-gray-100 p-3 rounded-lg">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={storeAddress}
            onChange={handleStoreAddressChange}
            placeholder="Carian Alamat"
            className="w-full bg-transparent border-none outline-none font-semibold text-gray-700"
          />
        </div>
      </div>

      <div className="w-full h-[400px] relative z-0 mt-6">
        <MapContainer center={position} zoom={13} scrollWheelZoom={false} className="h-full">
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
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12C14 13.1046 13.1046 14 12 14Z"
              fill="#16A34A"
            />
          </svg>
          <span>Gunakan Lokasi Saat Ini</span>
        </button>
      </div>

      <div className="w-full bg-white px-4 py-6 border-t border-gray-300">
        <p className="font-bold text-[15px] text-center text-emerald-400 flex items-center justify-start">
        <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2"
              >
                <path
                  d="M18.364 17.364L12 23.7279L5.63604 17.364C2.12132 13.8492 2.12132 8.15076 5.63604 4.63604C9.15076 1.12132 14.8492 1.12132 18.364 4.63604C21.8787 8.15076 21.8787 13.8492 18.364 17.364ZM12 13C13.1046 13 14 12.1046 14 11C14 9.89543 13.1046 9 12 9C10.8954 9 10 9.89543 10 11C10 12.1046 10.8954 13 12 13Z"
                  fill="#0095FF"
                />
              </svg>
              {city}
        </p>
        <p className="font-nunito text-[13px] text-start ml-2 text-black-500 mt-2">
          {address}
        </p>
      </div>
    </div>
  );
};

export default PinLocation;
