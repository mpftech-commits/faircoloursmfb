import { Bell } from "lucide-react";

export default function Navbar() {
  return (
    <div className="bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-10">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-4 fl">

        <div>
          <h1 className="text-xl font-semibold text-green-700">
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