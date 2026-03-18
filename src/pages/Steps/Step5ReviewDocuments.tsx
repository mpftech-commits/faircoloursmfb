import InfoCard from "../../components/InfoCard";
import { ArrowLeft } from "lucide-react";
import { viewdetails } from "../../components/Constants";
import { Link } from "react-router-dom";

interface Props {
  next: () => void;
  prev: () => void;
}

export default function Step5ReviewDetails({ next, prev }: Props) {
  
  return (
    <div className="max-w-md w-full space-y-6">
      <div className="text-center mt-5 ">
        <ArrowLeft
          onClick={prev}
          size={18}
          className="cursor-pointer animate-ping "
        />

        <h2 className="text-xl font-semibold text-green-900 text-left mt-5 ">
          Review & Submit
        </h2>

        <p className="text-sm text-gray-600 text-left">
          Please review your information before submitting for verification
        </p>

        <div className="bg-white rounded-lg w-[300px] h-[300px] m-auto mt-10 drop-shadow-sm p-5">
          <h1 className="text-left font-medium">Submitted Details</h1>

          {/* view details */}
          {viewdetails.map((item) => (
            <div key={item.id} className="flex items-center gap-3 mt-3">
              <div className="bg-[#d4f8e575] w-[40px] h-[40px] rounded-lg ">
                {item.icon}
              </div>
              <div>
                <p className="text-gray-400 text-xs text-left">{item.name}</p>
                <h1 className="font-medium text-sm text-left">
                  {item.description}
                </h1>
              </div>
            </div>
          ))}
        </div>
      </div>

      <InfoCard
        title="Please Note "
        desc="the verification process may take up to 24-48 hours. We appreciate your patience and understanding as we work to ensure the security and integrity of our platform."
        
      />

      <Link to="/summary">
        <button
        
        
          className="w-full bg-green-900 text-white py-3 rounded-lg hover:bg-green-800 cursor-pointer mb-3"
        >
          Submit for verification
        </button>
      </Link>
      <button
        onClick={next}
        className="w-full border border-green-900 text-green-900 py-3 rounded-lg hover:bg-gray-50 hover:text-green-900 cursor-pointer "
      >
        Edit information
      </button>
    </div>
  );
}
