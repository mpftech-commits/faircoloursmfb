import { Home, User, Settings, Menu, LogOut, Currency, ReceiptIcon, X } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

import { LogoutUser } from "../services/Axios";
import toast from "react-hot-toast";

export default function Navigation({ collapsed, setCollapsed, mobileOpen, setMobileOpen }: any) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await LogoutUser();
      localStorage.clear();
      toast.success("logged oyut successfully")
      navigate("/login");
    } catch (err:any) {
      toast.error(err.message)
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
        <Menu size={16} />

      </button>

      {/* Mobile overlay */}
      <div
        className={`md:hidden fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={closeMobileDrawer}
      />

      {/* Mobile drawer */}
      <div
        className={`md:hidden fixed inset-y-0 left-0 z-500 w-45 bg-white border-r border-gray-200 shadow-xl transform transition-transform duration-300 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="faircolors logo" className=" h-8 " />

          </div>
          <button
            className="p-2 rounded-lg hover:bg-gray-100 transition"
            onClick={closeMobileDrawer}
            aria-label="Close menu"
          >
            <X size={14} />
          </button>
        </div>

        <nav className="flex flex-col gap-2 p-4 text-sm font-medium">
          <NavItem
            to="/dashboard"
            icon={<Home size={14} />}
            label="Home"
            onClick={() => handleNavClick()}
            className="flex gap-3"
          />
          <NavItem
            to="/cashier"
            icon={<User size={14} />}
            label="Cashiers"
            className="flex gap-3"
            onClick={() => handleNavClick()}
          />
          <NavItem
            to="/customer"
            icon={<User size={14} />}
            label="Customers"
            className="flex gap-3"
            onClick={() => handleNavClick()}
          />
          <NavItem
            to="/loan-approval"
            icon={<Currency size={14} />}
            label="Loans"
            className="flex gap-3"
            onClick={() => handleNavClick()}
          />
          <NavItem
            to="/report"
            icon={<ReceiptIcon size={14} />}
            label="Reports"
            className="flex gap-3"
            onClick={() => handleNavClick()}
          />
          <NavItem
            to="/404"
            icon={<Settings size={14} />}
            label="Settings"
            className="flex gap-3"
            onClick={() => handleNavClick()}
          />
          <NavItem
            to="#"
            icon={<LogOut size={14} />}
            label="Logout"
            className="text-red-500 mt-4 gap-3"
            onClick={() => handleNavClick(handleLogout)}
          />
        </nav>
      </div>

      {/* Desktop sidebar */}
      <div
        className={`hidden md:flex fixed top-0 left-0 h-screen bg-white border-r border-gray-200 z-20 flex-col py-4 px-3 transition-all duration-300 ${collapsed ? "w-15" : "w-45"}`}
        style={{
          ["--sidebar-width" as any]: collapsed ? "5rem" : "16rem",
        }}
      >
        <div className="flex items-center justify-between mb-4 px-2">
          {!collapsed && (
            <h2 className="text-lg font-bold text-blue-600 flex items-center gap-3">
              <img src="/logo.png" alt="faircolors logo" className="w-20" />
            </h2>
          )}

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-lg hover:bg-gray-100 transition"
          >
            <Menu size={12} />
          </button>
        </div>

        <nav className="flex flex-col gap-2 text-[8px] font-medium">
          <NavItem
            collapsed={collapsed}
            to="/dashboard"
            icon={<Home size={12} />}
            label="Home"
          />
          <NavItem
            collapsed={collapsed}
            to="/cashier"
            icon={<User size={12} />}
            label="Cashiers"
          />
          <NavItem
            collapsed={collapsed}
            to="/customer"
            icon={<User size={12} />}
            label="Customers"
          />
          <NavItem
            collapsed={collapsed}
            to="/loan-approval"
            icon={<Currency size={12} />}
            label="Loans"
          />
          <NavItem
            collapsed={collapsed}
            to="/report"
            icon={<ReceiptIcon size={12} />}
            label="Reports"
          />
          <NavItem
            collapsed={collapsed}
            to="/404"
            icon={<Settings size={12} />}
            label="Settings"
          />
          <NavItem
            onClick={handleLogout}
            collapsed={collapsed}
            to="#"
            icon={<LogOut size={11} />}
            label="Logout"
            className="text-red-500 mt-6"
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
        `flex md:flex-col md:flex-row md:justify-start text-[8px] items-center justify-start gap-1 md:gap-2 p-1.5 rounded-lg transition-all ${isActive ? "text-blue-600 bg-green-50" : "text-gray-500 hover:bg-blue-100"
        } ${className}`
      }
    >
      {icon}
      {!collapsed && <span className="text-[10px] md:text-[10px]">{label}</span>}
    </NavLink>
  );
}

