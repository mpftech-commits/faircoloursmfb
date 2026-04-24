import React, { useState } from 'react';
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

export const Sidebar: React.FC = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const SidebarItem = ({
    to,
    label,
    title,
    icon: Icon,
  }: {
    to: string;
    label: string;
    title?: string;
    icon: LucideIcon;
  }) => (
    <NavLink
      to={to}
      title={title}
      onClick={() => setIsMobileMenuOpen(false)}
      className={({ isActive }) =>
        `sidebar-item w-full  flex gap-4 items-center px-2 py-2  ${isActive ? "bg-blue-100 text-blue-700 py-1 rounded-lg" : "text-gray-500 "} ${isSidebarCollapsed ? `justify-center px-0` : ``}`
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
            {isSidebarCollapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-3 mt-4 font-medium ">
          <SidebarItem to="/cashier-dashboard" label="Dashboard" icon={LayoutDashboard} title='dashboard'/>
          <SidebarItem to="/cashiers/customers" label="Customers" icon={Users} title='customers'/>
          <SidebarItem to="/cashiers/loans" label="Loan Applications" icon={FileText} title='loans'/>
          <SidebarItem to="/cashiers/transactions" label="Transactions" icon={ArrowLeftRight} title='transactions'/>
          <SidebarItem to="/cashiers/notifications" label="Notifications" icon={Bell} title='notifications'/>
          <SidebarItem to="/cashiers/settings" label="Settings" icon={Settings} title='settings'/>
        </nav>

        <div className="p-4 border-t border-slate-100">
          <Link to="/login" title='logout'>
            <button className={`sidebar-item w-full hover:bg-rose-50 hover:text-red-500 cursor-pointer flex items-center gap-4 py-1 px-2 rounded-lg ${isSidebarCollapsed ? 'justify-center px-0' : ''}`}>
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
            <div className="bg-green-800 text-red-500">  <Menu size={20} />  </div>
            <motion.div 
              initial={{ x: -260 }}
              animate={{ x: 0 }}
              exit={{ x: -260 }}
              className="w-65 h-full bg-white p-6"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center gap-2 mb-8">
                <div className="w-8 h-8 bg-blue-700 rounded-lg flex items-center justify-center text-white font-bold">F</div>
                <span className="font-bold text-xl tracking-tight">FinDash</span>
              </div>
              <nav className="space-y-2">
                <SidebarItem to="." label="Dashboard" icon={LayoutDashboard}  />
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
