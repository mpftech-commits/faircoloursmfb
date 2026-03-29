import { Bell } from "lucide-react";

export default function Navbar({ collapsed}: any) {
  return (
    <div className={`w-full bg-white border-b border-gray-200  top-0 left-0 right-0 z-10`}>
      <div className={` fixed  z-50 w-full mx-auto flex items-center bg-white justify-between px-4 py-4 ${collapsed ? "md:max-w-300": "md:max-w-[78rem] md:mr-[200px]"}`} >

        <div>
          <h1 className="text-xl font-semibold text-blue-700">
            Welcome Back, John
          </h1>
          <p className="text-sm text-gray-500">
            Here's your business overview
          </p>
        </div>

        <div className="flex items-center gap-4">
          <Bell size={18} className="text-gray-500" />

          <div className="flex items-center gap-2">
            <img
              src="https://i.pravatar.cc/40"
              className="w-8 h-8 rounded-full"
            />

            <div className="text-right text-xs">
              <p className="font-medium">JohnDoe</p>
              <p className="text-gray-500">johndoe@gmail.com</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}