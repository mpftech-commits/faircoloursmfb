import { Home, List, User, Settings } from "lucide-react";
import { NavLink } from "react-router-dom";
import UseHideFooter from "../components/UseHideFooter"

export default function Footer() {
 const showFooter = UseHideFooter();


  return (
    <div className={`bg-white border-t border-gray-200 fixed bottom-0 left-0 right-0 z-10 ${showFooter ? "translate-y-0 transition-all duration-500" : "translate-y-full"}`}>
      <div className={`max-w-5xl mx-auto flex justify-around py-3 text-xs font-medium`}>

        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `flex flex-col items-center ${
              isActive ? "text-green-600" : "text-gray-500"
            }`
          }
        >
          <Home size={20} />
          Home
        </NavLink>

        <NavLink
          to="/listings"
          className={({ isActive }) =>
            `flex flex-col items-center ${
              isActive ? "text-green-600" : "text-gray-500"
            }`
          }
        >
          <List size={20} />
          Transactions
        </NavLink>

        <NavLink
          to="agent/messages"
          className={({ isActive }) =>
            `flex flex-col items-center ${
              isActive ? "text-green-600" : "text-gray-500"
            }`
          }
        >
          <User size={20} />
          Customers
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex flex-col items-center ${
              isActive ? "text-green-600" : "text-gray-500"
            }`
          }
        >
          <Settings size={20} />
          Settings
        </NavLink>

      </div>
    </div>
  );
}