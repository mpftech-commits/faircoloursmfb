import type { ReactNode } from "react";

interface Props {
  value: number;
  label: string;
  icon: ReactNode;
  className: string;
}

export default function OverviewCard({ value, label, icon, className }: Props) {
  return (
    <div
      className={`bg-white border  border-gray-200 rounded-lg p-4 w-full`}
    >
      <div className={`mb-2 ${className}`}>{icon}</div>
      <h2 className="text-xl font-semibold text-gray-800">{value}</h2>

      <p className="text-xs text-gray-500">{label}</p>
    </div>
  );
}
