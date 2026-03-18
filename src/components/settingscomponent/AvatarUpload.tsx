import { useRef, useState } from "react";

export default function AvatarUpload() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<string | null>(null);

  const handleSelectImage = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  return (
    <div className="flex items-center gap-4 mb-6">

      {/* Avatar */}
      <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-900 flex items-center justify-center text-white font-semibold">

        {image ? (
          <img
            src={image}
            alt="avatar"
            className="w-full h-full object-cover"
          />
        ) : (
          "JD"
        )}

      </div>

      {/* Change Photo Button */}
      <button
        type="button"
        onClick={handleSelectImage}
        className="text-sm text-green-700 font-medium hover:underline"
      >
        Change Photo
      </button>

      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageChange}
        accept="image/*"
        className="hidden"
      />

    </div>
  );
}