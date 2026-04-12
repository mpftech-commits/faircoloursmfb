
import { LeftSection } from "../../components/LeftSection";
import SignupForm from "../../components/SignupForm";

export default function Signup() {
  return (
    <div className="min-h-screen bg-[#3e3e3e] flex items-center justify-center">
      <div className="max-w-6xl w-full grid md:grid-cols-2 rounded-xl overflow-hidden bg-white shadow-2xl">
        {/* LEFT IMAGE */}
        <div className=" overflow-hidden relative">
          <LeftSection />
        </div>

        {/* RIGHT SIDE */}
        <SignupForm />
      </div>
    </div>
  );
}
