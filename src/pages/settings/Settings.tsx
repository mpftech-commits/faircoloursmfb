import {
  User,
  Building2,
  FileText,
  Lock,
  HelpCircle,
  LogOut,
} from "lucide-react";

import SettingsItem from "../../components/settingscomponent/SettingsItem";
import UserCard from "../../components/settingscomponent/UserCard";
import {Link} from "react-router-dom"

export default function Settings() {
  return (
    <div className="min-h-screen bg-white  px-8 py-6">
      <div className="w-full max-w-[1200px] space-y-6">

        {/* Header */}
        <div className="bg-white drop-shadow-lg p-5 rounded-lg">
          <h1 className="text-xl font-semibold text-green-700">Settings</h1>
          <p className="text-sm text-gray-500">
            Manage your account and preferences
          </p>
        </div>

        {/* User Card */}
        <UserCard name="John Doe" email="johndoe@gmail.com" />

        {/* Settings List */}
        <div className="space-y-3 flex flex-col">

          <Link to="/settings/personal-info">
            <SettingsItem
            
              icon={<User size={18} />}
              title="Personal Info"
              className="bg-blue-50 text-blue-500 p-2 rounded-lg "
            />
          </Link>

          <Link to="/settings/business-info">
            <SettingsItem
              icon={<Building2 size={18} />}
              title="Business Info"
              className="bg-green-50 text-green-500 p-2 rounded-lg "
            />
          </Link>

          <Link to="/settings/my-document">
            <SettingsItem
              icon={<FileText size={18} />}
              title="Documents"
              className="bg-yellow-50 text-yellow-500 p-2 rounded-lg "
            />
          </Link>

          <Link to="/settings/change-password">
            <SettingsItem
              icon={<Lock size={18} />}
              title="Change Password"
              className="bg-purple-50 text-purple-500 p-2 rounded-lg "
            />
          </Link>

          <Link to="/settings/help-support">
            <SettingsItem
              icon={<HelpCircle size={18} />}
              title="Help Center"
              className="bg-gray-50 text-gray-500 p-2 rounded-lg "
            />
          </Link>

          <Link to="/login">
            <SettingsItem
              icon={<LogOut size={18} />}
              title="Logout"
              danger
              className="bg-red-50 text-red-500 p-2 rounded-lg "
            />
          </Link>

        </div>

        {/* Footer */}
        <div className="text-center text-xs text-gray-400 pt-6">
          OgaLandlord Agent v1.0.0
        </div>
      </div>
    </div>
  );
}