// import DashboardLayout from "../layout/DashboardLayout";
import StatusCard from "../../components/StatusCard";
import OverviewCard from "../../components/OverviewCard";
import ActionItem from "../../components/ActionItem";
import {
  Plus,
  Home,
  AlertTriangle,
  CheckCircle,
  LineChart,
  Diamond,
  Clock,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="space-y-4 ">
      <StatusCard
        icon={<CheckCircle size={18} />}
        title="Verification Status"
        subtitle="Verified Agent"
        right="Verified"
        className="bg-green-600 text-white rounded-full px-3 p-1"
      />

      <StatusCard
        icon={<Diamond size={18} />}
        title="Standard Plan"
        subtitle="Renews Feb 14, 2026"
        right=""
        className="underline text-green-600"
        link={
          <Link to="/subscription" className="text-green-600 ml-2 underline">
            Renew
          </Link>
        }
      />

      <StatusCard
        icon={<LineChart size={18} />}
        title="Trust Score"
        subtitle="Excellent Standing"
        right="92"
      />

      <div className="pt-6">
        <h3 className="text-sm font-semibold text-gray-600 mb-3">
          General Overview
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <OverviewCard
            value={12}
            label="Active Listings"
            icon={<Home />}
            className="bg-green-50 text-green-700 w-fit p-3 rounded-lg"
          />
          <OverviewCard
            value={3}
            label="Pending Review"
            icon={<Clock />}
            className="bg-amber-50 text-amber-700 w-fit p-3 rounded-lg"
          />
          <OverviewCard
            value={3}
            label="Rented"
            icon={<CheckCircle />}
            className="bg-blue-50 text-blue-700 w-fit p-3 rounded-lg"
          />
          <OverviewCard
            value={1}
            label="Reports"
            icon={<AlertTriangle />}
            className="bg-red-50 text-red-700 w-fit p-3 rounded-lg"
          />
        </div>
      </div>

      <div className="pt-6 space-y-3">
        <h3 className="text-sm font-semibold text-gray-600">Quick Actions</h3>

        <Link to="/agent/listings">
          <ActionItem
            icon={Plus}
            label="Add New Listing"
            className="bg-green-700 text-white p-2 rounded-full"
          />
        </Link>
        <Link to="/listings">
          <ActionItem
            icon={Home}
            label="Manage Listings"
            className="bg-green-500 text-white p-2 rounded-full"
          />
        </Link>
        <Link to="/agent/reports">
          <ActionItem
            icon={AlertTriangle}
            label="View Reports"
            className="bg-amber-600 text-white p-2 rounded-full"
          />
        </Link>
      </div>
    </div>
  );
}
