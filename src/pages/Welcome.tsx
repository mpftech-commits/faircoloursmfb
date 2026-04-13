
import Onboarding from "../components/Onboarding";
import { LeftSection } from "../components/LeftSection";

export default function Welcome() {
  return (
    <div className="min-h-screen bg-[#3e3e3e] flex items-center justify-center overflow-hidden">
      <div className=" w-full grid md:grid-cols-2 rounded-xl overflow-hidden bg-white shadow-2xl">
        {/* LEFT IMAGE */}
        <div className=" overflow-hidden relative">
          <LeftSection />
        </div>

        {/* RIGHT SIDE */}
        <Onboarding />
      </div>
    </div>
  );
}
