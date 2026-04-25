import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Navigation from "../agentdashboardlayout/Navigation";
import { useState } from "react";

export default function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col overflow-hidden">

      {/* Sidebar */}
        <Navigation collapsed={collapsed} setCollapsed={setCollapsed} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      {/* Main Content */}
      <div
        className={` transition-all duration-300
        ${collapsed ? "md:ml-20" : "md:ml-60"}`}
      >
        
          <div className="">
            <Navbar collapsed={collapsed} mobileOpen={mobileOpen} />
          </div>
         
       
       

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6 mt-20 mb-20 md:mb-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}