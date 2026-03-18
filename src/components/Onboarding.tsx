import { CheckCircle, Shield, LineChartIcon } from "lucide-react"
import {Link} from "react-router-dom"

export default function Onboarding() {

  return (
    <div className="bg-[rgb(242,253,245)] py-5 flex flex-col justify-between">

 {/* Logo */}
        <div className="flex items-center gap-2 mb-12 border-b border-b-gray-300 ">
          
            <img src="/logo.svg" alt="OgaLandlord Logo" className="pb-5 px-10 w-[35%]" />
         
        </div>
        <div className="flex items-center gap-2 mb-12 ">
           <img src="/icons.svg" alt="OgaLandlord Logo" className="pb-5 px-10" />
        </div>
      <div className="md:px-20 px-8">

       

        {/* Heading */}
        <h2 className="text-[28px] font-semibold text-green-900 leading-snug text-center">
          Join FairColors MFB as a Verified Cashier
        </h2>

        <p className="text-gray-600 text-[12px] mt-2 text-center">
          Get trusted by Clients and grow your business.
        </p>

        {/* Features */}
        <div className="space-y-4 mt-8">

          <div className="flex gap-3 items-center text-sm">
            <CheckCircle size={16} className="text-green-700"/>
            Verified Staff badge
          </div>

          <div className="flex gap-3 items-center text-sm">
            <Shield size={16} className="text-green-700"/>
            Build trust with Customers
          </div>

          <div className="flex gap-3 items-center text-sm">
            <LineChartIcon size={16} className="text-green-700"/>
            Grow your Customer Base
          </div>

        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-4 mt-10">

          <Link to="/signup" className="bg-green-900 text-white py-3 rounded-lg hover:bg-green-800 transition font-medium text-[16px] text-center">
            <button >
              Create Account
            </button>
          </Link>

          <Link to="/login" className="border border-gray-300 py-3 rounded-lg hover:bg-gray-100 transition font-medium text-[16px] text-center">
            <button >
              Log in
            </button>
          </Link>

        </div>

      </div>

      {/* Footer */}
      <div className="flex justify-between text-xs md:px-10 px-4 text-gray-500 mt-12 border-t border-gray-300 pt-5">

        <span>© {new Date().getFullYear()} FairColors Microfinance Bank</span>

        <div className="flex gap-5">
          <span className="hover:underline cursor-pointer">Privacy</span>
          <span className="hover:underline cursor-pointer">Terms</span>
          <span className="hover:underline cursor-pointer">Get help</span>
        </div>

      </div>

    </div>
  )
}