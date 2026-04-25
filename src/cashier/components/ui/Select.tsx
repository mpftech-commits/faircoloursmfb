import React from 'react';

export const Select: React.FC<React.SelectHTMLAttributes<HTMLSelectElement> & { label?: string; options: { value: string; label: string }[] }> = ({ label, options, ...props }) => (
  <div className="space-y-1">
    {label && <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">{label}</label>}
    <select 
      {...props}
      className={`w-full p-3 bg-slate-50  border border-slate-200  rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-700/20  transition-all appearance-none text-slate-500 ${props.className || ''}`}
    >
      {options.map(opt => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  </div>
);
