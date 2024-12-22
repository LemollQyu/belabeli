import getUserProfile from "@/api/settings/getUserProfile";
import postPhotoProfile from "@/api/settings/postPhotoProfile";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDropzone, Accept } from "react-dropzone";

// Define the PhotoType interface if needed for later
interface PhotoType {
  foto_profile: string;
}

const ProfilePhoto = () => {

    const [image, setImage] = useState<string | null>(null);
    const [loadingImaage, setLoadingImage] = useState<boolean>(false);

    const onDrop = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const formData = new FormData();
      formData.append("foto_profile", file);

      console.log(formData);

      try {
        setLoadingImage(true)
        const response = await postPhotoProfile(formData);
        console.log("Photo upload response:", response.data);
        window.location.reload()

        if (response.error !== null) {
          console.log("Photo error", response.error.message);
        }

        setLoadingImage(false)
      } catch (error) {
        setLoadingImage(false)
        console.error("Failed to upload photo:", error);
      }
    }
  };

  const accept: Accept = {
    "image/*": [], // Accept all image types
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept,
  });

  useEffect(() => {
    async function handleGetDataUserProfile() {
      setLoadingImage(true)
      const response = await getUserProfile();
      console.log("User profile data:", response.data);
      setImage(response.data?.photo);
      setLoadingImage(false)
    }
    handleGetDataUserProfile();
  }, []);

  return (
    <div className="flex flex-col items-center mb-4">
      <div className="flex items-center">
      <img
        src={
          loadingImaage
            ? '/1488.gif'
            : image === 'https://picsum.photos/500/500'
            ? image
            : `${process.env.NEXT_PUBLIC_BASE_API_URL_2}/storage/${image}`
        }
        className="rounded-full"
        style={{ width: "100px", height: "100px", objectFit: "cover" }}
      />

      </div>
      <div
        {...getRootProps()}
        className="cursor-pointer text-[#0095FF] font-bold text-sm mt-4"
      >
        <input {...getInputProps()} />
        Ubah Foto Profil
      </div>
    </div>
  );
};

export default ProfilePhoto;
