import InfoCard from "../../components/InfoCard";
import { ArrowLeft } from "lucide-react";

interface Props {
  next: () => void
  prev: () => void
}

export default function Step2IDDetails({ next, prev }: Props) {

  return (
    <div className="max-w-md w-full space-y-6">

      <div className="text-center pt-10">
        <ArrowLeft onClick={prev} size={18} className="cursor-pointer animate-ping " />

        <h2 className="text-xl font-semibold text-green-900 ">
          Enter ID Details
        </h2>

        <p className="text-sm text-gray-600">
          Provide your identification number and verify your name
        </p>

      </div>

      <div>

        <label className="text-sm font-medium">
          ID Number *
        </label>

        <input
          placeholder="Enter your NIN or Voter's Card number"
          className="w-full border p-3 rounded-lg mt-2 outline-green-900 focus:ring-2 focus:ring-green-900"
        />

      </div>

      <div>

        <label className="text-sm font-medium">
          Full Name (as on ID)
        </label>

        <input
          placeholder="John Doe"
          className="w-full border p-3 rounded-lg mt-2 outline-green-900 focus:ring-2 focus:ring-green-900"
        />

      </div>

      <InfoCard
        title="Please Note That"
        desc="Make sure that the name matches exactly as it appears on your ID document."
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