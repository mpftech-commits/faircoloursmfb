import { Home, List, User, Settings, Menu, LayoutDashboard, LogOut, Currency, ReceiptIcon } from "lucide-react";
import { NavLink } from "react-router-dom";
// import { useState } from "react";
import UseHideFooter from "../components/UseHideFooter";

export default function Navigation({ collapsed, setCollapsed }: any)  {
  const showFooter = UseHideFooter();
  // const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      {/* ✅ MOBILE FOOTER */}
      <div
        className={`md:hidden bg-white border-t border-gray-200 fixed bottom-0 left-0 right-0 z-10 
        ${showFooter ? "translate-y-0" : "translate-y-full"} transition-all duration-500`}
      >
        <div className="flex justify-around py-3 text-xs font-medium">
          <NavItem to="/dashboard" icon={<Home size={20} />} label="Home" />
          <NavItem
            to="/listings"
            icon={<List size={20} />}
            label="Transactions"
          />
          <NavItem
            to="/customers"
            icon={<User size={20} />}
            label="Customers"
          />
          <NavItem
            to="/settings"
            icon={<Settings size={20} />}
            label="Settings"
          />
        </div>
      </div>

      {/* ✅ DESKTOP SIDEBAR */}
      <div
        className={`hidden md:flex fixed top-0 left-0 h-screen  bg-white border-r border-gray-200 z-20 flex-col py-6 px-3 transition-all duration-300
  ${collapsed ? "w-20" : "w-60"}`}
        style={{
          ["--sidebar-width" as any]: collapsed ? "5rem" : "16rem",
        }}
      >
        {/* Top Section */}
        <div className="flex items-center justify-between mb-8 px-2">
          {!collapsed && (
            <h2 className="text-lg font-bold text-blue-600 flex items-center gap-3"> <LayoutDashboard /> FairColors</h2>
          )}

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-lg hover:bg-gray-100 transition"
          >
            <Menu size={20} />
          </button>
        </div>

        {/* Nav Items */}
        <nav className="flex flex-col gap-4 text-sm font-medium">
          <NavItem
            collapsed={collapsed}
            to="/dashboard"
            icon={<Home size={20} />}
            label="Home"
          />
          <NavItem
            collapsed={collapsed}
            to="/404"
            icon={<User size={20} />}
            label="Cashiers"
          />
          <NavItem
            collapsed={collapsed}
            to="/404"
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
            to="/404"
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
            collapsed={collapsed}
            to="/login"
            icon={<LogOut size={20}/>}
            label={`Logout`}
             className="text-red-500 mt-[100px] "
          />
        </nav>
      </div>
    </>
  );
}

/* ✅ Reusable Nav Item */
function NavItem({ to, icon, label, className, collapsed = false }: any) {
  return (
    <NavLink
      to={to}
      title={collapsed ? label : ""}
      className={({ isActive }) =>
        `flex flex-col md:flex-row md:justify-start items-center justify-center gap-1 md:gap-3 p-2 rounded-lg transition-all
        ${isActive ? "text-blue-600 bg-green-50" : "text-gray-500 hover:bg-blue-100"} ${className}`
      }
    >
      {icon}
      {!collapsed && (
        <span className="text-xs md:text-sm">{label}</span>
      )}
    </NavLink>
  );
}

