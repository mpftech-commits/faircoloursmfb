import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import FooterNav from "../agentdashboardlayout/Footer";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">

      {/* Top Navigation */}
      <Navbar />

      {/* Page Content */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-6 md:mt-20 mb-20 mt-22">
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      <FooterNav />

    </div>
  );
}