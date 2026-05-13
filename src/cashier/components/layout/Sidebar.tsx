import React, { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  ChevronLeft,
  LayoutDashboard,
  Users,
  // FileText,
  ArrowLeftRight,
  Bell,
  Settings,
  X,
  type LucideIcon,
  LogOutIcon,
} from "lucide-react";
import { LogoutUser } from "../../../services/Axios";

interface SidebarProps {
  isMobileMenuOpen?: boolean;
  setIsMobileMenuOpen?: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isMobileMenuOpen = false,
  setIsMobileMenuOpen,
}) => {
   const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const handleNavClick:any = () => {
    if (setIsMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

   const handleLogout = async () => {
    try {
      await LogoutUser();
      localStorage.clear();
      navigate("/login");
    } catch (err) {
      console.error("logout failed:", err);
    }
  };

  const SidebarItem:any = ({
    to,
    label,
    title,
    icon: Icon,
    onClick,
    className,
  }: {
    to: string;
    label: string;
    title?: string;
    icon: LucideIcon;
    onClick?: () => void;
    className?: string;
  }) => (
    <NavLink
      to={to}
      title={title}
      onClick={onClick || handleNavClick}
      className={({ isActive }) =>
        `sidebar-item w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300  ${isActive ? "bg-blue-100 text-blue-700 " : "text-gray-500"} ${isSidebarCollapsed ? `justify-center px-0` : ``}`
      }
    >
      <Icon size={20} />
      {!isSidebarCollapsed && <span>{label} </span>}
    </NavLink>
  );

  return (
    <>
      {/* Sidebar - Desktop */}
      <motion.aside
        initial={false}
        animate={{ width: isSidebarCollapsed ? 80 : 260 }}
        className="hidden md:flex flex-col bg-white border-r border-slate-200 z-30 transition-colors duration-300 text-blue-700 font-medium"
      >
        <div className="p-6 flex items-center justify-between">
          {!isSidebarCollapsed && (
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="" />
            </div>
          )}
          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="p-1.5 rounded-lg text-slate-500 cursor-pointer hover:bg-slate-100 transition-colors duration-300"
          >
            {isSidebarCollapsed ? (
              <Menu size={20} />
            ) : (
              <ChevronLeft size={20} />
            )}
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-4 mt-4 p font-medium ">
          <SidebarItem
            to="/cashier-dashboard"
            label="Dashboard"
            icon={LayoutDashboard}
            title="dashboard"
          />
          <SidebarItem
            to="/cashiers/customers"
            label="Customers"
            icon={Users}
            title="customers"
          />
          {/* <SidebarItem
            to="/cashiers/loans"
            label="Loan Applications"
            icon={FileText}
            title="loans"
          /> */}
          <SidebarItem
            to="/cashiers/transactions"
            label="Transactions"
            icon={ArrowLeftRight}
            title="transactions"
          />
          <SidebarItem
            to="/cashiers/notifications"
            label="Notifications"
            icon={Bell}
            title="notifications"
          />
          <SidebarItem
            to="/cashiers/settings"
            label="Settings"
            icon={Settings}
            title="settings"
          />
        </nav>

        <div className="p-4 border-t border-slate-100">
          <Link to="/login" title="logout" className="w-full flex gap-3 items-center"> 
            <button
              className={`sidebar-item w-full  hover:text-red-500 cursor-pointer flex gap-3 items-center ${isSidebarCollapsed ? "justify-center px-0" : ""}`}
              onClick={handleLogout}
            >
              <LogOutIcon size={18} className={`${isSidebarCollapsed ? "" : "hidden text-red-500"} text-red-500`}/>
              {!isSidebarCollapsed && (
                <span className="text-red-500 flex gap-3 items-center">< LogOutIcon size={18}/> Logout</span>
              )}
            </button>
          </Link>
        </div>
      </motion.aside>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setIsMobileMenuOpen?.(false)}
          >
            <motion.div
              initial={{ x: -260 }}
              animate={{ x: 0 }}
              exit={{ x: -260 }}
              className="w-65 h-full bg-white p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2">
              <img src="/logo.png" alt="" />
            </div>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen?.(false)}
                  className="p-2 rounded-lg hover:bg-slate-100 text-slate-500"
                >
                  <X size={20} />
                </button>
              </div>
              <nav className="space-y-2">
                <SidebarItem
                  to="/cashier-dashboard"
                  label="Dashboard"
                  icon={LayoutDashboard}
                />
                <SidebarItem
                  to="/cashiers/customers"
                  label="Customers"
                  icon={Users}
                />
                {/* <SidebarItem
                  to="/cashiers/loans"
                  label="Loan Applications"
                  icon={FileText}
                /> */}
                <SidebarItem
                  to="/cashiers/transactions"
                  label="Transactions"
                  icon={ArrowLeftRight}
                />
                <SidebarItem
                  to="/cashiers/notifications"
                  label="Notifications"
                  icon={Bell}
                />
                <SidebarItem
                  to="/cashiers/settings"
                  label="Settings"
                  icon={Settings}
                />
                {/* <SidebarItem
                  to="/login"
                  label="Logout"
                  icon={LogOutIcon}
                  onClick={handleLogout}
                  className="text-red-500 hover:text-red-600"
                /> */}
              </nav>

               <div className="p-4 border-t mt-4 border-slate-100">
          <Link to="/login" title="logout" className="w-full flex gap-3 items-center"> 
            <button
              className={`sidebar-item w-full  hover:text-red-500 cursor-pointer flex gap-3 items-center ${isSidebarCollapsed ? "justify-center px-0" : ""}`}
              onClick={handleLogout}
            >
              <LogOutIcon size={18} className={`${isSidebarCollapsed ? "" : "hidden text-red-500"} text-red-500`}/>
              {!isSidebarCollapsed && (
                <span className="text-red-500 flex gap-3 items-center">< LogOutIcon size={18}/> Logout</span>
              )}
            </button>
          </Link>
        </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
