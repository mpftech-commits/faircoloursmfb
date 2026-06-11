import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "./Input";
import { Eye, EyeOff, Loader } from "lucide-react";
import { LoginUser } from "../services/Axios";
import toast from "react-hot-toast";


 interface FormErrors{
  email?: string;
  password?: string;
}

export default function LoginForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean | null>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean | undefined>(false);
  const [error, setError] = useState<FormErrors>({});

  const HandleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let valid = true;
    let newErrors: FormErrors = {};
    if (!emailPattern.test(email)) {
      newErrors.email = 'Please enter a valid email';
      setIsLoading(false);
      valid = false;
      setError(newErrors);
      return valid;
    }

    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (!passwordPattern.test(password)) {
      newErrors.password = 'Password must be at least 8 characters, one Uppercase, one special character and one number';
      valid = false
      setIsLoading(false);
      setError(newErrors);
      return valid;
    }
   

    try {
      const rawResponse = await LoginUser(email!, password!);
      const response = rawResponse?.data ?? rawResponse;
      const accessToken = response?.token ?? response?.accessToken;
      const user = response?.user ?? response?.data?.user;
      console.log("Login response:", rawResponse);
      console.log("Access Token:", accessToken);
      console.log("User:", user);
      toast.success(`Login successful welcome back ${email}`)

      if (!accessToken || !user) {
        throw new Error("Login response did not include token or user data");
      }
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", accessToken);
      setEmail("");
      setPassword("");
      setError({});

      const role = user.role;
      if (role === "admin") {
        navigate("/dashboard");
      } else if (role === "cashier") {
        navigate("/cashier-dashboard");
      } else {
        navigate("/login");
      }
    } catch (error: any) {
      toast.error(error.message)
      const errormessage =
        error.response?.data?.message || error.message || "login failed";
      setError(errormessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('/bg.jpg')",
        }}
      />
      <div className="absolute inset-0 bg-slate-950/40" />

      <div className="relative z-10 flex min-h-screen flex-col justify-between ">
        {/* Logo */}
        {/* <div className="fixed top-0 z-20 flex w-full items-center gap-2 border-b border-white/20 bg-white/70 px-4 pb-3 pt-4 backdrop-blur-md">
        <img
          src="/logo.png"
          alt="faircolors mfb Logo"
          className="pb- px-10 md:w-[20%] w-[20%]"
        />
      </div> */}
      <div className="mx-auto mt-2 w-full max-w-xs rounded-[28px] border-3 border-white bg-white/15 px-6 py-3 shadow-2xl backdrop-blur-xs sm:px-8 ">
      {/* logo */}
      <div className="flex rounded-full w-15 h-15 justify-center items-center bg-white  m-auto overflow-hidden ">
        <img
          src="/logo.png"
          alt="faircolors mfb Logo"
          className=" w-20  object-cover"
        />
      </div>
        {/* Heading */}
        <h2 className="md:text-[20px] text-[15px] font-bold text-blue-900 leading-snug text-center mt-4 ">
          Welcome Back
        </h2>

        <p className="text-white text-[8px] mt-2 text-left">
          Login to access your account, track your finances, and manage your
          customers seamlessly.
        </p>

        {/* form */}

        <form className="flex flex-col mt-1" onSubmit={HandleSignup}>
          <div className=" flex flex-col ">
            <label htmlFor="FullName" className="text-[10px]  text-white pb-2">
                <p className="text-white text-[10px]">Email<span className="text-red-500 ">*</span>
                </p>
            </label>
            <Input
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              placeholder="Enter your phone or email address"
              className={`bg-white py-2 border border-gray-300 rounded-sm p-2 outline-green-900 transition-colors duration-500 text-[10px]`}
            ></Input>
            {error.email && <p className="text-red-500 text-[8px] pt-1">{error.email}</p>}
          </div>
          {/* password */}
          <div className=" flex flex-col relative ">
            <label htmlFor="FullName" className="text-[10px] text-white pb-2">
              <p className="text-white text-[10px]">Password<span className="text-red-500 ">*</span>
                </p>
            </label>
            <Input
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password here"
              className={`bg-white py-2 border border-gray-300 rounded-sm p-2 outline-blue-900 transition-colors duration-500 text-[10px]`}
            ></Input>

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9  cursor-pointer mt-2"
            >
              {showPassword ? <Eye size={12} /> : <EyeOff size={12} />}
            </button>

            {error.password && <p className="text-red-500 text-[8px] pt-1">{error.password}</p>}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-900 text-white py-2 rounded-lg hover:bg-blue-800 transition font-medium text-[10px] flex items-center justify-center gap-2 disabled:bg-gray-400 disabled:animate-pulse disabled:cursor-not-allowed cursor-pointer mt-3"
          >
            {isLoading && (
              <Loader className=" animate-spin" size={18}/>
            )}
            {isLoading ? "Signing in..." : "Sign In"}
          </button>

          {/* <p className="text-center text-[12px]">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-500 font-medium">
              Create an account
            </Link>
          </p> */}
        </form>
      </div>

      {/* Footer */}
      <div className="mt-6 flex justify-between border-t border-white/20 bg-white/70 px-5 py-1 text-xs text-gray-600 backdrop-blur-md md:px-10 fixed bottom-0 z-50 w-full">
        <span className="text-[10px]">© 2026 FairColors MFB</span>

        <div className="flex gap-5 text-[10px]">
          <span className="cursor-pointer hover:underline">Privacy</span>
          <span className="cursor-pointer hover:underline">Terms</span>
          <span className="cursor-pointer hover:underline">Get help</span>
        </div>
      </div>
    </div>
    </div>
  );
}
