import React from 'react';

export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement> & { label?: string }> = ({ label, ...props }) => (
  <div className="space-y-1">
    {label && <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">{label}</label>}
    <input 
      {...props}
      className={`w-full p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 dark:text-white transition-all text-slate-500 ${props.className || ''}`}
    />
  </div>
);
