import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";

interface Props {
  title: string;
  subtitle: string;
  children: ReactNode;
}

export default function PageContainer({ title, subtitle, children }: Props) {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-4 md:p-8">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">

        <div className="mb-6">
          <Link to="/settings">
            <ArrowLeft  className="text-blue-700 mb-5 cursor-pointer" size={18} />
          </Link>
          <h2 className="text-xl font-semibold text-blue-700">
            {title}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {subtitle}
          </p>
        </div>

        {children}

      </div>
    </div>
  );
}