import InfoCard from "../../components/InfoCard";
import { ArrowLeft } from "lucide-react";

interface Props {
  next: () => void
  prev: () => void
}

export default function Step4BusinessUpload({ next, prev }: Props) {

  return (
    <div className="max-w-md w-full space-y-6">

      <div className="text-center pt-10">
         <ArrowLeft onClick={prev} size={18} className="cursor-pointer animate-ping " />

        <h2 className="text-xl font-semibold text-green-900 ">
          Business Information
        </h2>

        <p className="text-sm text-gray-600">
          Tell us about your real estate business
        </p>

      </div>

      <div>

        <label className="text-sm font-medium">
          Business Name (Optional)
        </label>

        <input
          placeholder="Enter your full name"
          className="w-full border p-3 rounded-lg mt-2 outline-green-900 focus:ring-2 focus:ring-green-900"
        />

      </div>
      <div>

        <label className="text-sm font-medium">
          Select Area of Operation (City)*
        </label>

       <select name="city" id="city" className="w-full border p-3 rounded-lg mt-2 outline-green-900 focus:ring-2 focus:ring-green-900">
          <option value="">Select a city</option>
          <option value="lagos">Lagos</option>
          <option value="abuja">Abuja</option>
          <option value="port-harcourt">Port Harcourt</option>
        </select>

      </div>

      <div>

        <label className="text-sm font-medium">
          Select LG Area*
        </label>

        <select name="lg-area" id="lg-area" className="w-full border p-3 rounded-lg mt-2 outline-green-900 focus:ring-2 focus:ring-green-900">
          <option value="">Select an area</option>
          <option value="ikoyi">Ikoyi</option>
          <option value="victoria-island">Victoria Island</option>
          <option value="london">London</option>
        </select>

      </div>

      <InfoCard
        title="Please Note "
        desc="We are currently just available in these areas."
        items={[
          "Ibadan",
          "Lagos",
          "Abuja",
          "Port Harcourt"
        ]}
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