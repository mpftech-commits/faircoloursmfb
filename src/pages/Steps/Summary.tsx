import { Link } from "react-router-dom";
import { LeftSection } from "../../components/LeftSection";
import { Clock } from "lucide-react";


export default function Summary() {
  

  return (
    <div className="min-h-screen grid lg:grid-cols-2 max-w-7xl mx-auto">
      {/* LEFT SIDE */}
      <LeftSection />

      {/* RIGHT SIDE */}
      <div className="bg-[rgb(242,253,245)] ">
         <div className="flex items-center gap-2 mb-12 border-b border-b-gray-300 ">
        <img
          src="/logo.svg"
          alt="OgaLandlord Logo"
          className="pb-5 pt-5 px-10 md:w-[35%] w-[50%]"
        />
      </div>
<div className="p-5  mx-auto bg-white w-[320px] h-[400px] rounded-xl drop-shadow-lg">
<div className="bg-amber-50 text-amber-600 m-auto w-fit p-5 rounded-full mt-3 mb-3"><Clock size={30}/></div>
<h1 className=" text-center py-3 font-medium text-2xl">Verification Pending</h1>
<p className="text-center text-[12px] mb-3">Your documents are being reviewed by our team. This typically takes 24-48 hours.</p>
<div className="bg-white drop-shadow-lg p-5 flex items-center gap-3 mt-3 mb-3 rounded-lg">
<span className="rounded-full bg-amber-700 w-[10px] h-[10px] animate-pulse"></span>
<div>
  <h1 className="font-medium text-[16px]">Under Review</h1>
  <p className=" text-xs text-gray-400" >Submitted 2 hours ago</p>
</div>
</div>
<Link to="/dashboard"><button className="bg-green-900 text-white rounded-lg w-full text-center py-2 cursor-pointer hover:bg-green-700 duration-400 transition-colors mt-5">Go to Dashboard</button></Link>
</div>
       
        {/* FOOTER */}
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
  );
}
