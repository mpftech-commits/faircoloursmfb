import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import PageContainer from "../agentdashboardlayout/PageContainer";

export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const passwordRules = {
    length: newPassword.length >= 8,
    uppercase: /[A-Z]/.test(newPassword),
    lowercase: /[a-z]/.test(newPassword),
    number: /[0-9]/.test(newPassword),
    special: /[^A-Za-z0-9]/.test(newPassword),
  };

  const passwordsMatch = newPassword === confirmPassword && confirmPassword !== "";

  return (
    <PageContainer
      title="Change Password"
      subtitle="Update your account password"
    >
      <div className="space-y-5">

        {/* CURRENT PASSWORD */}
        <PasswordInput
          label="Current Password"
          value={currentPassword}
          setValue={setCurrentPassword}
          show={showCurrent}
          toggle={() => setShowCurrent(!showCurrent)}
          placeholder="Enter current password"
        />

        {/* NEW PASSWORD */}
        <PasswordInput
          label="New Password"
          value={newPassword}
          setValue={setNewPassword}
          show={showNew}
          toggle={() => setShowNew(!showNew)}
          placeholder="Enter new password"
        />

        {/* CONFIRM PASSWORD */}
        <PasswordInput
          label="Confirm New Password"
          value={confirmPassword}
          setValue={setConfirmPassword}
          show={showConfirm}
          toggle={() => setShowConfirm(!showConfirm)}
          placeholder="Re-enter new password"
        />

        {/* PASSWORD RULES */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm">
          <p className="font-medium text-blue-800 mb-2">
            Password Requirements
          </p>

          <ul className="space-y-1">

            <Rule valid={passwordRules.length}>
              At least 8 characters long
            </Rule>

            <Rule valid={passwordRules.uppercase}>
              Include uppercase letter
            </Rule>

            <Rule valid={passwordRules.lowercase}>
              Include lowercase letter
            </Rule>

            <Rule valid={passwordRules.number}>
              Include at least one number
            </Rule>

            <Rule valid={passwordRules.special}>
              Include one special character
            </Rule>

          </ul>
        </div>

        {/* PASSWORD MATCH */}
        {confirmPassword && (
          <p
            className={`text-sm ${
              passwordsMatch ? "text-green-600" : "text-red-500"
            }`}
          >
            {passwordsMatch
              ? "Passwords match"
              : "Passwords do not match"}
          </p>
        )}

        {/* SUBMIT BUTTON */}
        <button
          className="w-full bg-green-900 hover:bg-green-800 text-white py-3 rounded-lg font-medium transition"
        >
          Update Password
        </button>

      </div>
    </PageContainer>
  );
}

interface InputProps {
  label: string;
  value: string;
  setValue: (value: string) => void;
  show: boolean;
  toggle: () => void;
  placeholder: string;
}

function PasswordInput({
  label,
  value,
  setValue,
  show,
  toggle,
  placeholder,
}: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">
        {label} <span className="text-red-500">*</span>
      </label>

      <div className="relative">
        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          className="w-full border border-gray-200 rounded-lg px-4 py-3 pr-10 text-sm
          focus:outline-none focus:ring-2 focus:ring-green-700"
        />

        <button
          type="button"
          onClick={toggle}
          className="absolute right-3 top-3 text-gray-500"
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </div>
  );
}

function Rule({
  valid,
  children,
}: {
  valid: boolean;
  children: React.ReactNode;
}) {
  return (
    <li className={`flex items-center gap-2 ${valid ? "text-green-600" : "text-gray-600"}`}>
      <span>{valid ? "✔" : "•"}</span>
      {children}
    </li>
  );
}