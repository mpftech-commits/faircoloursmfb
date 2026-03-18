import UploadBox from "../../components/UploadBox";
import InfoCard from "../../components/InfoCard";

interface Props {
  next: () => void
}

export default function Step1UploadID({ next }: Props) {

  return (
    <div className="max-w-md w-full space-y-6">

      <div className="text-center">
        <h2 className="text-xl font-semibold text-green-900">
          Upload Government ID
        </h2>

        <p className="text-sm text-gray-600">
          Verify your identity with a valid government-issued ID
        </p>
      </div>

      <div>
        <label className="text-sm font-medium">
          Select ID Type *
        </label>

        <select className="w-full mt-2 border rounded-lg p-3">
          <option>Choose ID Type</option>
          <option>National ID</option>
          <option>Drivers License</option>
          <option>International Passport</option>
        </select>
      </div>

      <div>
        <label className="text-sm font-medium">
          Upload ID Image *
        </label>

        <div className="mt-2">
          <UploadBox />
        </div>
      </div>

      <InfoCard
        title="Tips"
        desc="Ensure your details are clearly visible and the image is not blurry."
        children={``}
       
      />

      <button
        onClick={next}
        className="w-full bg-green-900 text-white py-3 rounded-lg hover:bg-green-800"
      >
        Continue
      </button>

    </div>
  );
}