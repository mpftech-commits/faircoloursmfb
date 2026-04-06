import { ArrowRight, Building2, CheckCircle, Users2 } from "lucide-react";
import { Link } from "react-router-dom";


export default function JoinRolePage() {
  return (
    <div className="min-h-screen bg-blue-50 flex flex-col justify-between">
      {/* Header */}
      <header className="flex items-center justify-between px-10  border-b border-gray-300 bg-[#fff] fixed w-full">
        <div className="flex items-center gap-2 w-30 h-30">
          <img src="/logo.png" alt="faircolors logo" />
        </div>

        <div className="text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-800 cursor-pointer font-medium">Login</Link>
        </div>
      </header>

      {/* Center Content */}
      <main className="flex flex-col items-center text-center mt-15 mb-20">
        <h1 className="text-3xl font-medium text-blue-800 mb-2 mt-20">
          How would you like to join?
        </h1>
        <p className="text-gray-500 mb-10">
          Select your role to get started with FairColors MFB
        </p>

        <div className="flex gap-6">
          {/* Admin Card */}
          <div className="w-[325px] bg-[#fff] rounded-xl border-3 border-gray-200 shadow-sm p-6 text-left hover:shadow-md hover:border-blue-800 hover:border-3 transition hover:scale-105">
            <div className="w-10 h-10 bg-blue-800 rounded-md mb-4 text-white pt-2 "><Users2 className=" m-auto"/></div>

            <h2 className="font-semibold text-lg text-blue-800 mb-2 ">
              Admin
            </h2>

            <p className="text-sm text-gray-500 mb-4">
             Manage cashiers, View reports, Approve loans, Perform audit checks
            </p>

            <ul className="text-sm text-gray-600 space-y-3 mb-6">
              <li className="flex items-center gap-2"><CheckCircle size={18} className="text-blue-900"/> Recognized and verified by the bank</li>
              <li className="flex items-center gap-2"><CheckCircle size={18} className="text-blue-900"/> Verify and Approve Loans Customer Loans</li>
              <li className="flex items-center gap-2"><CheckCircle size={18} className="text-blue-900"/> Expand your customer network</li>
            </ul>

            <Link to="admin/welcome">
              <button className="text-blue-900 font-medium flex items-center gap-1 cursor-pointer">
                Get Started <ArrowRight size={18}/>
              </button>
            </Link>
          </div>

          {/* Tenant Card */}
          <div className="w-[325px] bg-[#FFF] rounded-xl border-3 border-gray-200 p-6 text-left hover:shadow-md transition hover:border-blue-800 hover:scale-105">
            <div className="w-10 h-10 bg-blue-800 rounded-md text-white pt-2 mb-4 hover:scale-105"><Building2 className="m-auto"/></div>

            <h2 className="font-semibold text-lg text-blue-800 mb-2 font-medium">
              Cashier
            </h2>

            <p className="text-sm text-gray-500 mb-4">
              Connect with customers with ease, track and update customers details in real time
            </p>

            <ul className="text-sm text-gray-600 space-y-3 mb-6">
              <li className="flex items-center gap-2"><CheckCircle size={18} className="text-blue-900"/>Onboard Customers, Update Information </li>
              <li className="flex items-center gap-2"><CheckCircle size={18} className="text-blue-900"/> Secure View Daily Updates in Real-Time</li>
              <li className="flex items-center gap-2"><CheckCircle size={18} className="text-blue-900"/> Manage your Customers with Ease</li>
            </ul>

            <Link to="/cashier-dashboard">
              <button className="text-blue-800 font-medium flex items-center gap-1 cursor-pointer">
                Get Started <ArrowRight size={18}/>
              </button>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="flex justify-between px-10 py-6 text-sm text-gray-500 border-t border-gray-300">
        <span>© {new Date().getFullYear()} FairColors MFB. All rights reserved.</span>

        <div className="flex gap-6">
          <span className="cursor-pointer hover:text-gray-700">Privacy</span>
          <span className="cursor-pointer hover:text-gray-700">Terms</span>
          <span className="cursor-pointer hover:text-gray-700">Get help</span>
        </div>
      </footer>
    </div>
  );
}
