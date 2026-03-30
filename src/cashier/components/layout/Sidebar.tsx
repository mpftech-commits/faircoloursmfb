import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  ChevronLeft, 
  LayoutDashboard, 
  Users, 
  FileText, 
  ArrowLeftRight, 
  Bell, 
  Settings, 
  LogOut,
 type  LucideIcon
} from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';

export const Sidebar: React.FC = () => {
  const { 
    isSidebarCollapsed, 
    setIsSidebarCollapsed, 
    isMobileMenuOpen, 
    setIsMobileMenuOpen 
  } = useDashboard();
  const SidebarItem = ({ to, label, icon: Icon }: { to: string, label: string, icon: LucideIcon }) => (
    <NavLink 
      to={to}
      onClick={() => setIsMobileMenuOpen(false)}
      className={({ isActive }) => 
        `sidebar-item w-full text-slate-500 dark:text-white ${isActive ? 'sidebar-item-active' : ''} ${isSidebarCollapsed ? 'justify-center px-0' : ''}`
      }
    >
      <Icon size={20} />
      {!isSidebarCollapsed && <span>{label}</span>}
    </NavLink>
  );

  return (
    <>
      {/* Sidebar - Desktop */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarCollapsed ? 80 : 260 }}
        className="hidden md:flex flex-col bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 z-30 transition-colors duration-300 text-blue-700 dark:text-blue-700 font-medium"
      >
        <div className="p-6 flex items-center justify-between">
          {!isSidebarCollapsed && (
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="" />
            </div>
          )}
          <button 
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="p-1.5 rounded-lg  text-slate-500 dark:text-slate-400 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-300"
          >
            {isSidebarCollapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4 font-medium ">
          <SidebarItem to="/cashier-dashboard" label="Dashboard" icon={LayoutDashboard} />
          <SidebarItem to="/cashiers/customers" label="Customers" icon={Users} />
          <SidebarItem to="/cashiers/loans" label="Loan Applications" icon={FileText} />
          <SidebarItem to="/cashiers/transactions" label="Transactions" icon={ArrowLeftRight} />
          <SidebarItem to="/cashiers/notifications" label="Notifications" icon={Bell} />
          <SidebarItem to="/cashiers/settings" label="Settings" icon={Settings} />
        </nav>

        <div className="p-4 border-t border-slate-100 dark:border-slate-800">
          <Link to="/login">
            <button className={`sidebar-item w-full hover:bg-rose-50 hover:text-red-500 dark:hover:bg-rose-900/20 cursor-pointer ${isSidebarCollapsed ? 'justify-center px-0' : ''}`}>
              <LogOut size={20} className='text-red-500'/>
              {!isSidebarCollapsed && <span className='text-red-500'>Logout</span>}
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
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div 
              initial={{ x: -260 }}
              animate={{ x: 0 }}
              exit={{ x: -260 }}
              className="w-[260px] h-full bg-white dark:bg-slate-900 p-6"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center gap-2 mb-8">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold">F</div>
                <span className="font-bold text-xl tracking-tight dark:text-white">FinDash</span>
              </div>
              <nav className="space-y-2">
                <SidebarItem to="." label="Dashboard" icon={LayoutDashboard} />
                <SidebarItem to="customers" label="Customers" icon={Users} />
                <SidebarItem to="loans" label="Loan Applications" icon={FileText} />
                <SidebarItem to="transactions" label="Transactions" icon={ArrowLeftRight} />
                <SidebarItem to="notifications" label="Notifications" icon={Bell} />
                <SidebarItem to="settings" label="Settings" icon={Settings} />
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
