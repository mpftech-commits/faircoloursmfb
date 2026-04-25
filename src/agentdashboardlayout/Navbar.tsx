import { Bell } from "lucide-react";

export default function Navbar({ collapsed, mobileOpen }: { collapsed?: boolean; mobileOpen?: boolean }) {

const savedUser = localStorage.getItem("user");
const user = savedUser ? JSON.parse(savedUser) : null;

if (!user) {
  return <p>Please log in to view this content.</p>; // or render a placeholder, or redirect to login
}

  return (
    <div className={`w-full bg-white border-b border-gray-200 top-0 left-0 right-0 z-10 `}>
      <div className={`fixed z-50 w-full mx-auto flex items-center bg-white justify-between px-4 py-10 transition-all duration-300  ${
        mobileOpen 
          ? "md:max-w-full" 
          : collapsed 
            ? "md:max-w-[calc(100%-5rem)]" 
            : "md:max-w-[calc(100%-15rem)]"
      }`} >

        <div className="hidden md:block">
          <h1 className="text-xl font-semibold text-blue-700">
            Welcome Back, {user.fullName}!
          </h1>
          <p className="text-sm text-gray-500">
            Here's your business overview
          </p>
        </div>

        <div className={`flex items-center gap-4 absolute right-5 `}>
          <Bell size={18} className="text-gray-500" />

          <div className="flex flex-col items-center gap-2">
            <img
              src="https://i.pravatar.cc/40"
              className="w-8 h-8 rounded-full"
            />

            <div className="text-right text-xs">
              <p className="font-medium">{user.fullName}</p>
              
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}