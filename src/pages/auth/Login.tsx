import { LeftSection } from "../../components/LeftSection";
import LoginForm from "../../components/LoginForm";

export default function Login() {
  return (
    <div className="min-h-screen bg-[#3e3e3e] flex items-center justify-center ">
      <div className=" w-full grid md:grid-cols-2 grid-cols-1 rounded-xl  bg-white shadow-2xl relative">
        {/* LEFT IMAGE */}
        <div className="">
          <LeftSection />
        </div>

        {/* RIGHT SIDE */}
        <div className="   ">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
