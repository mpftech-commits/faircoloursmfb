
import { LeftSection } from "../../components/LeftSection";
import SignupForm from "../../components/SignupForm";

export default function Signup() {
  return (
    <div className="min-h-screen bg-[#3e3e3e] flex items-center justify-center px-6">
      <div className="max-w-6xl w-full grid lg:grid-cols-2 rounded-xl overflow-hidden bg-white shadow-2xl">
        {/* LEFT IMAGE */}
        <LeftSection />

        {/* RIGHT SIDE */}
        <SignupForm />
      </div>
    </div>
  );
}
