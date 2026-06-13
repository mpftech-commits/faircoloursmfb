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
        ${collapsed ? "md:ml-15" : "md:ml-45"}`}
      >

        <div className=" fixed top-0 z-50 bg-white w-full m-auto border-b border-gray-200 ">
          <Navbar collapsed={collapsed} mobileOpen={mobileOpen} />
        </div>




        <main className="flex-1 w-full mx-auto mt-8 ">
          <Outlet />
        </main>
      </div>
    </div>
  );
}