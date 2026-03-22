import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "./Input";
import { Eye, EyeOff } from "lucide-react";

export default function LoginForm() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState<boolean | null>(false);
  const [isLoading, setIsLoading] = useState<boolean | undefined>(false);

  const HandleSignup = (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();

    navigate("/dashboard")
 
  };

  return (
    <div className="bg-[rgb(255,255,255)] py-5 flex flex-col justify-between">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-12 border-b border-b-gray-300 ">
        <img
          src="/logo.png"
          alt="OgaLandlord Logo"
          className="pb-5 px-10 md:w-[35%] w-[50%]"
        />
      </div>
      <div className="md:px-20 px-8">
        {/* Heading */}
        <h2 className="md:text-[28px] text-[16px] font-bold text-blue-900 leading-snug text-left">
          Welcome Back
        </h2>

        <p className="text-gray-600 text-[12px] mt-2 text-left">
          Login to access your account, track your finances, and manage your customers seamlessly.
        </p>

        {/* form */}

        <form className="flex flex-col gap-4 mt-10" onSubmit={HandleSignup}>
          <div className=" flex flex-col ">
            <label htmlFor="FullName" className="text-[13px] pb-2">
              Email or Phone<span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              required
              placeholder="Enter your phone or email address"
              className={`bg-white py-2.5 border border-gray-300 rounded-sm p-2 outline-green-900 transition-colors duration-500`}
            ></Input>
          </div>
          {/* password */}
          <div className=" flex flex-col relative ">
            <label htmlFor="FullName" className="text-[13px] pb-2">
              Password<span className="text-red-500">*</span>
            </label>
            <Input
              type={showPassword ? "text" : "Password"}
              placeholder="Enter your email here"
              className={`bg-white py-2.5 border border-gray-300 rounded-sm p-2 outline-blue-900 transition-colors duration-500`}
            ></Input>

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 cursor-pointer mt-2"
            >
              {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-900 text-white py-3 rounded-lg hover:bg-blue-800 transition font-medium text-[16px] flex items-center justify-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed cursor-pointer"
          >
            {isLoading && (
              <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            )}
            {isLoading ? "Signing in..." : "Sign In"}
          </button>

          <p className="text-center text-[12px]">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-500 font-medium">
              Create an account
            </Link>
          </p>
        </form>
      </div>

      {/* Footer */}
      <div className="flex justify-between text-xs md:px-10 px-5 text-gray-500 mt-12 border-t border-gray-300 pt-5">
        <span>© {new Date().getFullYear()} FairColors MFB</span>

        <div className="flex gap-5">
          <span className="hover:underline cursor-pointer">Privacy</span>
          <span className="hover:underline cursor-pointer">Terms</span>
          <span className="hover:underline cursor-pointer">Get help</span>
        </div>
      </div>
    </div>
  );
}
