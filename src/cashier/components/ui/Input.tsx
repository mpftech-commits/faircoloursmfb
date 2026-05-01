import React from 'react';

export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement> & { label?: string; error?: string }> = ({ label, error, className, ...props }) => (
  <div className="space-y-1">
    {label && <label className="text-xs font-bold text-slate-400  uppercase tracking-wider">{label}</label>}
    <input
      {...props}
      className={`w-full p-3 bg-slate-50  border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-700/20 transition-all text-slate-500 ${error ? 'border-rose-500 focus:border-rose-600' : 'border-slate-200 '} ${className || ''}`}
    />
    {error ? <p className="text-xs text-rose-600">{error}</p> : null}
  </div>
);
