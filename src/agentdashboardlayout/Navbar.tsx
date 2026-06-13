import { Bell } from "lucide-react";

export default function Navbar({ collapsed, mobileOpen }: { collapsed?: boolean; mobileOpen?: boolean }) {

  const savedUser = localStorage.getItem("user");
  const user = savedUser ? JSON.parse(savedUser) : null;

  if (!user) {
    return <p className="text-[10px] px-5 py-3">Please log in to view this content.</p>; // or render a placeholder, or redirect to login
  }

  return (
    <div className={`fixed z-50 w-full flex items-center bg-white justify-between px-4 py-4 transition-all duration-300 `} >
      <div className={`fixed z-50 w-full flex items-center  justify-between px-4 py-4 transition-all duration-300 ${mobileOpen
          ? "md:max-w-full"
          : collapsed
            ? "md:max-w-[calc(100%-5rem)]"
            : "md:max-w-[calc(100%-16rem)]"
        }`} >

        <div>
          <h1 className="text-xs font-semibold text-blue-700">
            Welcome Back, {user.fullName}!
          </h1>
          <p className="text-[8px] text-gray-500">
            Here's your business overview
          </p>
        </div>
        
        <div className={`flex items-center gap-4 absolute right-8`}>
          <Bell size={12} className="text-gray-500" />

          <div className="flex flex-col items-center gap-2">
            <img
              src="https://i.pravatar.cc/40"
              className="w-8 h-8 rounded-full"
            />

            <div className="text-right text-[8px]">
              <p className="font-medium">{user.fullName}</p>
              <p className="text-gray-500">{user.email}</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}