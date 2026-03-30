import type { LucideIcon } from 'lucide-react';

export const StatCard = ({ title, value, icon: Icon, trend }: { title: string, value: string | number, icon: LucideIcon, trend?: string }) => (
  <div className="bg-white dark:bg-slate-900  p-6 rounded-2xl shadow-sm border border-slate-100 flex items-start justify-between">
    <div>
      <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
      <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{value}</h3>
      {trend && (
        <p className="text-xs mt-2 text-emerald-600 font-medium">
          {trend} <span className="text-slate-400 font-normal">vs last month</span>
        </p>
      )}
    </div>
    <div className="p-3 bg-slate-50 rounded-xl text-primary">
      <Icon size={20} />
    </div>
  </div>
);
