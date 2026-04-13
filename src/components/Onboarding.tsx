import { CheckCircle, Shield, LineChartIcon } from "lucide-react";
import { Link } from "react-router-dom";

export default function Onboarding() {
  return (
    <div className="min-h-screen bg-[rgb(255,255,255)] py-5 flex flex-col justify-between relative">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-12 border-b border-b-gray-300 fixed w-full bg-[#fff] top-0 ">
        <img src="/logo.png" alt="Fair Colors" className="pb-5 px-8 w-50 pt-2" />
      </div>

      <div className="md:px-7 px-8 lg:mt-40 md mt-25">
        {/* Heading */}
        <h2 className="text-[20px] md:text-xl font-semibold text-blue-900 leading-snug text-center">
          Start as a FairColors MFB Cashier
        </h2>

        <p className="text-gray-600 text-[12px] mt-2 text-center">
          Join our network, manage transactions easily, and earn while serving
          your community.
        </p>

        {/* Features */}
        <div className="space-y-4 mt-8">
          <div className="flex gap-3 items-center text-sm">
            <CheckCircle size={16} className="text-blue-700" />
            Recognized and verified by the bank
          </div>

          <div className="flex gap-3 items-center text-sm">
            <Shield size={16} className="text-blue-700" />
            Safe and reliable financial services
          </div>

          <div className="flex gap-3 items-center text-sm">
            <LineChartIcon size={16} className="text-blue-700" />
            Expand your customer network
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-4 mt-10">
          <Link
            to="/signup"
            className="bg-blue-900 text-white py-3 rounded-lg hover:bg-blue-800 transition font-medium text-[16px] text-center"
          >
            <button>Create Account</button>
          </Link>

          <Link
            to="/login"
            className="border border-gray-300 py-3 rounded-lg hover:bg-gray-100 transition font-medium text-[16px] text-center"
          >
            <button>Log in</button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between text-xs md:px-10 px-4 text-gray-500 mt-12 border-t border-gray-300 pt-5">
        <span>© 2026 FairColors Microfinance Bank</span>

        <div className="flex gap-5">
          <span className="hover:underline cursor-pointer">Privacy</span>
          <span className="hover:underline cursor-pointer">Terms</span>
          <span className="hover:underline cursor-pointer">Get help</span>
        </div>
      </div>
    </div>
  );
}
