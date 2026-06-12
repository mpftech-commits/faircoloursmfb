import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Navigation from "../agentdashboardlayout/Navigation";
import { useState } from "react";

export default function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col overflow-hidden">

      {/* Sidebar */}
      <Navigation collapsed={collapsed} setCollapsed={setCollapsed} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      {/* Main Content */}
      <div
        className={` transition-all duration-300
        ${collapsed ? "md:ml-20" : "md:ml-45"}`}
      >

        <div className=" w-full bg-red-300 border-b border-gray-200 top-0 left-0 right-0 z-10">
          <Navbar collapsed={collapsed} mobileOpen={mobileOpen} />
        </div>




        <main className="flex-1 w-full mx-auto px-4 py-6  md:mb-0 mt-15">
          <Outlet />
        </main>
      </div>
    </div>
  );
}