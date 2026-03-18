import { CheckCircle } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

export default function ListingSubmitted() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-xl shadow-sm p-8 max-w-md w-full text-center">

        <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4 bg-green-50 p-3 rounded-full" />

        <h2 className="text-xl font-semibold text-green-800 mb-2">
          Listing Submitted
        </h2>

        <p className="text-gray-500 text-sm mb-6">
          Your property listing has been submitted successfully. It will be
          reviewed before going live.
        </p>

        <Link to="/dashboard">
            <button
              onClick={() => navigate("/dashboard")}
              className="bg-green-800 text-white px-6 py-2 rounded w-full cursor-pointer text-xs font-medium"
            >
              Go to Dashboard
            </button>
        </Link>
      </div>
    </div>
  );
}