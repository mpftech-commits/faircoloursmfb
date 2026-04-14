import { Home, User, Settings, Menu, LogOut, Currency, ReceiptIcon, X } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

import { LogoutUser } from "../services/Axios";

export default function Navigation({ collapsed, setCollapsed }: any)  {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await LogoutUser();
      localStorage.clear();
      navigate("/login");
    } catch (err) {
      console.error("logout failed:", err);
    }
  };

  const closeMobileDrawer = () => setMobileOpen(false);

  const handleNavClick = (action?: () => void) => {
    if (action) action();
    closeMobileDrawer();
  };

  return (
    <>
      {/* Mobile drawer toggle button */}
      <button
        className="md:hidden fixed top-4 left-4 z-500 p-2 rounded-lg bg-white shadow-lg border border-gray-200 text-gray-700"
        onClick={() => setMobileOpen(true)}
        aria-label="Open menu"
      >
        <Menu size={20} />
        
      </button>

      {/* Mobile overlay */}
      <div
        className={`md:hidden fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={closeMobileDrawer}
      />

      {/* Mobile drawer */}
      <div
        className={`md:hidden fixed inset-y-0 left-0 z-500 w-72 bg-white border-r border-gray-200 shadow-xl transform transition-transform duration-300 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="faircolors logo" className=" h-20" />
           
          </div>
          <button
            className="p-2 rounded-lg hover:bg-gray-100 transition"
            onClick={closeMobileDrawer}
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex flex-col gap-4 p-4 text-sm font-medium">
          <NavItem
            to="/dashboard"
            icon={<Home size={20} />}
            label="Home"
            onClick={() => handleNavClick()}
            className="flex gap-3"
          />
          <NavItem
            to="/cashier"
            icon={<User size={20} />}
            label="Cashiers"
            className="flex gap-3"
            onClick={() => handleNavClick()}
          />
          <NavItem
            to="/customer"
            icon={<User size={20} />}
            label="Customers"
            className="flex gap-3"
            onClick={() => handleNavClick()}
          />
          <NavItem
            to="/loan-approval"
            icon={<Currency size={20} />}
            label="Loans"
            className="flex gap-3"
            onClick={() => handleNavClick()}
          />
          <NavItem
            to="/report"
            icon={<ReceiptIcon size={20} />}
            label="Reports"
            className="flex gap-3"
            onClick={() => handleNavClick()}
          />
          <NavItem
            to="/settings"
            icon={<Settings size={20} />}
            label="Settings"
            className="flex gap-3"
            onClick={() => handleNavClick()}
          />
          <NavItem
            to="#"
            icon={<LogOut size={20} />}
            label="Logout"
            className="text-red-500 mt-6 gap-3"
            onClick={() => handleNavClick(handleLogout)}
          />
        </nav>
      </div>

      {/* Desktop sidebar */}
      <div
        className={`hidden md:flex fixed top-0 left-0 h-screen bg-white border-r border-gray-200 z-20 flex-col py-6 px-3 transition-all duration-300 ${collapsed ? "w-20" : "w-60"}`}
        style={{
          ["--sidebar-width" as any]: collapsed ? "5rem" : "16rem",
        }}
      >
        <div className="flex items-center justify-between mb-8 px-2">
          {!collapsed && (
            <h2 className="text-lg font-bold text-blue-600 flex items-center gap-3">
              <img src="/logo.png" alt="faircolors logo" className="w-25" />
            </h2>
          )}

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-lg hover:bg-gray-100 transition"
          >
            <Menu size={20} />
          </button>
        </div>

        <nav className="flex flex-col gap-4 text-sm font-medium">
          <NavItem
            collapsed={collapsed}
            to="/dashboard"
            icon={<Home size={20} />}
            label="Home"
          />
          <NavItem
            collapsed={collapsed}
            to="/cashier"
            icon={<User size={20} />}
            label="Cashiers"
          />
          <NavItem
            collapsed={collapsed}
            to="/customer"
            icon={<User size={20} />}
            label="Customers"
          />
          <NavItem
            collapsed={collapsed}
            to="/loan-approval"
            icon={<Currency size={20} />}
            label="Loans"
          />
          <NavItem
            collapsed={collapsed}
            to="/report"
            icon={<ReceiptIcon size={20} />}
            label="Reports"
          />
          <NavItem
            collapsed={collapsed}
            to="/settings"
            icon={<Settings size={20} />}
            label="Settings"
          />
          <NavItem
            onClick={handleLogout}
            collapsed={collapsed}
            to="#"
            icon={<LogOut size={20} />}
            label="Logout"
            className="text-red-500 mt-[100px]"
          />
        </nav>
      </div>
    </>
  );
}

/* Reusable Nav Item */
function NavItem({ to, icon, label, className = "", collapsed = false, onClick }: any) {
  return (
    <NavLink
      to={to}
      title={collapsed ? label : ""}
      onClick={onClick}
      className={({ isActive }) =>
        `flex md:flex-col md:flex-row md:justify-start items-center justify-start gap-1 md:gap-3 p-2 rounded-lg transition-all ${
          isActive ? "text-blue-600 bg-green-50" : "text-gray-500 hover:bg-blue-100"
        } ${className}`
      }
    >
      {icon}
      {!collapsed && <span className="text-xs md:text-sm">{label}</span>}
    </NavLink>
  );
}

