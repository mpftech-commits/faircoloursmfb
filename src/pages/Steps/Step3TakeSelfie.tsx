import { useRef, useState, useEffect } from "react";
import InfoCard from "../../components/InfoCard";
import { ArrowLeft } from "lucide-react";

interface Props {
  next: () => void;
  prev: () => void;
}

export default function Step3Selfie({ next, prev }: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [photo, setPhoto] = useState<string | null>(null);

  // Start Camera
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Camera access denied:", error);
    }
  };

  useEffect(() => {
    startCamera();

    // stop camera when component unmounts
    return () => {
      streamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  // Take Photo
  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx?.drawImage(video, 0, 0);

    const image = canvas.toDataURL("image/png");
    setPhoto(image);

    // stop camera after capture
    streamRef.current?.getTracks().forEach((track) => track.stop());
  };

  // Retake Photo
  const retakePhoto = () => {
    setPhoto(null);
    startCamera();
  };

  return (
    <div className="max-w-md w-full space-y-6 text-center">
      <ArrowLeft
        onClick={prev}
        size={18}
        className="cursor-pointer animate-ping mt-5"
      />
      <h2 className="text-xl font-semibold text-green-900 mt-10">
        Take a Selfie
      </h2>

      <p className="text-sm text-gray-600">
        Position your face inside the frame and capture your photo
      </p>

      {/* Camera Preview */}
      {!photo && (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="rounded-full h-[300px] w-[200px] m-auto  border-4 border-green-200 mb-5 object-cover before:border-6 before:border-green-600"
        />
      )}

      {/* Captured Photo */}
      {photo && (
        <img
          src={photo}
          className="rounded-full h-[300px] w-[200px] m-auto  border-4 border-green-500 object-cover mb-5"
        />
      )}

      <canvas ref={canvasRef} className="hidden" />

      {/* Buttons */}
      <div className="flex flex-col gap-3 justify-center">
        {!photo && (
          <button
            onClick={capturePhoto}
            className="bg-green-900 text-white px-6 py-3 rounded-lg hover:bg-green-800 transition mb-3"
          >
            Capture
          </button>
        )}
        <InfoCard
          title="Tips"
          items={[
            "Remove glasses from face",
            "Ensure good lighting",
            "Look directly at the camera",
          ]}
        />

        {photo && (
          <>
            <button
              onClick={retakePhoto}
              className="border px-5 py-3 rounded-lg hover:bg-gray-100 transition"
            >
              Retake
            </button>

            <button
              onClick={next}
              className="bg-green-900 text-white px-6 py-3 rounded-lg hover:bg-green-800 transition"
            >
              Continue
            </button>
          </>
        )}
      </div>
    </div>
  );
}
