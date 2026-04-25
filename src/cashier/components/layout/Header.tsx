import { motion, AnimatePresence } from "framer-motion";
import { Search, Plus, Bell, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { mockNotifications } from "../../mockData";

interface HeaderProps {
  onMenuClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const notifications = mockNotifications;
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-8 z-20 transition-colors duration-300">
      <div className="flex items-center gap-4 flex-1">
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 rounded-lg hover:bg-slate-100 text-slate-500"
        >
          <Menu size={24} />
        </button>
        <div className="relative max-w-md w-full hidden sm:block">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search customers or applications..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-slate-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-6">
        <Link to="/404">
          <button className="hidden lg:flex items-center gap-2 bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-primary/90 transition-all shadow-sm shadow-primary/20 cursor-pointer">
            <Plus size={18} />
            <span>Transactions </span>
          </button>
        </Link>

        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 relative"
          >
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
          </button>

          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-200 p-4 z-50"
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold">Notifications</h4>
                  <button className="text-xs text-primary font-medium">
                    Mark all as read
                  </button>
                </div>
                <div className="space-y-3">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`p-3 rounded-xl text-sm ${n.read ? "bg-white" : "bg-slate-50 border border-slate-100"}`}
                    >
                      <p className="font-medium text-slate-900">{n.title}</p>
                      <p className="text-slate-500 text-xs mt-1">{n.message}</p>
                      <p className="text-[10px] text-slate-400 mt-2">
                        {n.timestamp}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-3 pl-3 md:pl-6 border-l border-slate-200">
          <div className="hidden md:block text-right">
            <p className="text-sm font-bold text-slate-900">Mercy Goodness</p>
            <p className="text-xs text-slate-500">Senior Cashier</p>
          </div>
          <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center text-slate-600 overflow-hidden border-2 border-white shadow-sm">
            <img
              src="https://picsum.photos/seed/cashier/100/100"
              alt="Avatar"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>
    </header>
  );
};
