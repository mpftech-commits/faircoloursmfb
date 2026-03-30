import React from 'react';
import { motion } from 'framer-motion';
import { 
  Bell, 
  CheckCircle2, 
  AlertCircle, 
  Info, 
  Clock 
} from 'lucide-react';
import { Button, Card } from '../ui';
import { useDashboard } from '../../context/DashboardContext';

export const Notifications: React.FC = () => {
  const { notifications } = useDashboard();
  return (
    <motion.div 
      key="notifications"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-4xl mx-auto space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Notifications</h1>
          <p className="text-slate-500 dark:text-slate-400">Stay updated with the latest loan status and system alerts.</p>
        </div>
        <Button variant="ghost" size="sm" className="text-primary font-bold hover:underline">Mark all as read</Button>
      </div>

      <div className="space-y-4">
        {notifications.map(n => (
          <Card 
            key={n.id} 
            className={`p-6 transition-all flex gap-4 ${
              !n.read 
                ? 'bg-primary/5 dark:bg-primary/10 border-primary/20 dark:border-primary/30 shadow-sm shadow-primary/5'
                : ''
            }`}
          >
            <div className={`p-3 rounded-xl shrink-0 h-fit ${
              n.type === 'success' ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400' :
              n.type === 'warning' ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400' :
              n.type === 'error' ? 'bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400' :
              'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
            }`}>
              {n.type === 'success' ? <CheckCircle2 size={24} /> :
               n.type === 'warning' ? <AlertCircle size={24} /> :
               n.type === 'error' ? <AlertCircle size={24} /> :
               <Info size={24} />}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-bold text-slate-900 dark:text-white">{n.title}</h4>
                <div className="flex items-center gap-1.5 text-slate-400 dark:text-slate-500">
                  <Clock size={14} />
                  <span className="text-xs">{n.timestamp}</span>
                </div>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{n.message}</p>
              {!n.read && (
                <button className="mt-3 text-xs font-bold text-primary hover:underline">Mark as read</button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </motion.div>
  );
};
