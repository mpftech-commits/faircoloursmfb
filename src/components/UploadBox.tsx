import { useRef } from "react";
import { Upload } from "lucide-react";

export default function UploadBox() {
  const fileRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    fileRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log("Selected file:", file);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="border border-gray-300 rounded-xl p-10 text-center bg-white cursor-pointer hover:border-green-700 transition"
    >
      <Upload className="mx-auto text-gray-500 mb-3" />

      <p className="text-sm text-gray-700 font-medium">
        Tap to upload
      </p>

      <p className="text-xs text-gray-400">
        PNG, JPG up to 5MB
      </p>

      <input
        type="file"
        accept="image/png, image/jpeg"
        ref={fileRef}
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}
