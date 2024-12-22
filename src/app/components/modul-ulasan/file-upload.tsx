import { useState } from "react";

interface UploadButtonsProps {
  onUpload: (image: File | null, video: File | null) => void;
}

const UploadButtons: React.FC<UploadButtonsProps> = ({ onUpload }) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const imageFile = e.target.files[0];
      setSelectedImage(imageFile);
      onUpload(imageFile, selectedVideo); // Kirim ke callback
    }
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const videoFile = e.target.files[0];
      setSelectedVideo(videoFile);
      onUpload(selectedImage, videoFile); // Kirim ke callback
    }
  };

  return (
    <div className="flex mt-[8px] items-center justify-between border">
      {/* Button untuk unggah foto */}
      <div>
        <label
          htmlFor="image-upload"
          className="border flex items-center flex-col rounded-lg w-[146px] h-[55px] justify-center"
        >
          <div className="w-[26px] h-[26px]">{/* SVG untuk foto */}</div>
          <p className="font-nunitoBold text-[8px] text-[#727272]">
            Tambahkan Foto
          </p>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
        </label>
      </div>

      {/* Button untuk unggah video */}
      <div>
        <label
          htmlFor="video-upload"
          className="border flex items-center flex-col rounded-lg w-[146px] h-[55px] justify-center"
        >
          <div className="w-[26px] h-[26px] mt-3">{/* SVG untuk video */}</div>
          <p className="font-nunitoBold text-[8px] mb-2 text-[#727272]">
            Tambahkan Video
          </p>
          <input
            id="video-upload"
            type="file"
            accept="video/*"
            className="hidden"
            onChange={handleVideoUpload}
          />
        </label>
      </div>
    </div>
  );
};

export default UploadButtons;
