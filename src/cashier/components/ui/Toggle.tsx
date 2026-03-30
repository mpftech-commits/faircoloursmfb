import React from 'react';
import { motion } from 'framer-motion';

export const Toggle: React.FC<{
  enabled: boolean;
  onChange: (val: boolean) => void;
  label?: string;
  description?: string;
  icon?: React.ReactNode;
  className?: string;
}> = ({ enabled, onChange, label, description, icon }) => (
  <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-all">
    <div className="flex items-center gap-4">
      {icon && (
        <div className="p-2 bg-white dark:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-400 shadow-sm">
          {icon}
        </div>
      )}
      <div>
        {label && <p className="font-bold text-sm text-slate-900 dark:text-white">{label}</p>}
        {description && <p className="text-xs text-slate-500 dark:text-slate-400">{description}</p>}
      </div>
    </div>
    <button 
      onClick={() => onChange(!enabled)}
      className={`w-12 h-6 rounded-full transition-all relative ${enabled ? 'bg-primary' : 'bg-slate-300 dark:bg-slate-700'}`}
    >
      <motion.div 
        animate={{ x: enabled ? 24 : 4 }}
        className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm"
      />
    </button>
  </div>
);
