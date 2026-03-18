import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";

interface Props {
  icon: React.ReactNode;
  title: string;
  danger?: boolean;
  className?: string;
  Link?: ReactNode;
}

export default function SettingsItem({ icon, title, danger, className, Link }: Props) {
  return (
    <div
      className={`flex items-center justify-between p-4 rounded-lg border border-gray-300 bg-white cursor-pointer transition hover:bg-gray-50
      ${danger ? "text-red-500" : "text-gray-700"} ${Link ? "hover:bg-gray-50" : ""}`}
    >
      <div className="flex items-center gap-3">
        <div className={` ${className}`} >{icon}</div>
        <p className="text-sm font-medium">{title}</p>
      </div>

      <ChevronRight
        size={18}
        className={`${danger ? "text-red-400" : "text-gray-400"}`}
      />
    </div>
  );
}