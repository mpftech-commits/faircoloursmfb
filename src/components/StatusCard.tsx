import type { ReactNode } from "react";

interface Props {
  title: string;
  subtitle?: string;
  right?: string;
  className?: string;
  icon?: ReactNode;
  link?: ReactNode;
  tips?: string[];
}

export default function StatusCard({
  title,
  subtitle,
  right,
  className,
  icon,
  link,
  tips,
}: Props) {
  return (
    <div className={`bg-white border border-gray-200 rounded-lg p-4 flex justify-between items-center`}>
      <div className="flex gap-3 items-center">
        <div className="bg-green-50 p-2 rounded-lg text-green-600">{icon}</div>

        <div className="">
          <p className="text-sm font-medium">{title}</p>
          <p className="text-xs text-gray-500">{subtitle}</p>
          {tips && (
            <ul className="text-xs text-blue-500 list-disc ml-4">
              {tips.map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className={`text-sm font-semibold ${className || "text-green-600"}`}>
        {right && <span>{right}</span>}
        {link}
      </div>
    </div>
  );
}
