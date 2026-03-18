import { LeftSection } from "../components/LeftSection";
import VerifyComponent from "../components/VerifyComponent";


export default function VerifyPhone() {
  return (
   <div className="min-h-screen bg-[rgb(242,253,245)]">
<div className="grid grid-cols-1 lg:grid-cols-2 gap-5 max-w-7xl mx-auto p-5">
<div className="w-full rounded-xl overflow-hidden">
  <LeftSection />
</div>
<div className="w-full rounded-xl overflow-hidden">
  <div className="flex items-center gap-2 mb-12 border-b border-b-gray-300 ">
        <img
          src="/logo.svg"
          alt="OgaLandlord Logo"
          className="pb-5 md:px-10 md:w-[35%] w-[40%]"
        />
      </div>
      <div className="flex items-center gap-2 mb-12">
        <img src="/icons.svg" alt="OgaLandlord Logo" className="pb-5 px-10 w-full" />
      </div>
  <VerifyComponent />

  {/* Footer */}

 <div className="flex justify-between text-xs md:px-10 px-5 text-gray-500 mt-12 border-t border-gray-300 pt-5">
        <span>© {new Date().getFullYear()} OgaLandlord</span>

        <div className="flex gap-5">
          <span className="hover:underline cursor-pointer">Privacy</span>
          <span className="hover:underline cursor-pointer">Terms</span>
          <span className="hover:underline cursor-pointer">Get help</span>
        </div>
      </div>
</div>
</div>
    
   </div>
  );
}
