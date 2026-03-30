import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Users, 
  FileText, 
  Clock, 
  CheckCircle2, 
  Download, 
  Plus, 
  Eye 
} from 'lucide-react';
import { StatCard } from '../shared/StatCard';
import { StatusBadge, Button, Card } from '../ui';
import { useDashboard } from '../../context/DashboardContext';

export const CashierDashboard: React.FC = () => {
  const { loans, activityLogs, handleApplyLoan, exportToCSV } = useDashboard();

  return (
    <motion.div 
      key="dashboard"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Welcome back, Mercy!</h1>
          <p className="text-slate-500 dark:text-slate-400">Here's what's happening with your applications today.</p>
        </div>
        <div className="flex items-center gap-3 text-gray-900">
          <Button 
            variant="outline"
            onClick={() => exportToCSV(loans, 'loan_report')}
            className="flex items-center gap-2 "
          >
            <Download size={16} />
            Export Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatCard title="Total Customers" value="1,284" icon={Users} trend="+12%" />
        <StatCard title="Loans Submitted" value="452" icon={FileText} trend="+5.4%" />
        <StatCard title="Pending Approvals" value="28" icon={Clock} />
        <StatCard title="Approved Loans" value="384" icon={CheckCircle2} trend="+8.2%" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 overflow-hidden">
          <div className="p-6 border-b border-slate-50 dark:border-slate-800 flex items-center justify-between">
            <h3 className="font-bold text-slate-900 dark:text-white">Recent Loan Applications</h3>
            <Link to="/loans" className="text-sm text-primary font-medium hover:underline">View All</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-100 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4 font-medium">Customer</th>
                  <th className="px-6 py-4 font-medium">Amount</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium">Date</th>
                  <th className="px-6 py-4 font-medium"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800  ">
                {loans.slice(0, 5).map(loan => {
                  return (
                    <tr key={loan.id} className=" text-slate-500 transition-all group dark:hover:bg-slate-800 hover:bg-slate-100">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-600 dark:text-white">
                            {loan.customerName.split(' ').map(n => n[0]).join('')}
                          </div>
                          <span className="text-sm font-medium text-slate-900 dark:text-white">{loan.customerName}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-500 dark:text-white">${loan.amount.toLocaleString()}</td>
                      <td className="px-6 py-4">
                        <StatusBadge status={loan.status} />
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-500 dark:text-white">{loan.dateSubmitted}</td>
                      <td className="px-6 py-4 text-right">
                        <button className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500  group-hover:opacity-100 transition-all">
                          <Eye size={16} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-bold text-slate-900 dark:text-white mb-6">Quick Actions</h3>
          <div className="space-y-3">
            <button 
              onClick={() => handleApplyLoan()}
              className="w-full flex items-center gap-4 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-primary/30 hover:bg-primary/5 transition-all group"
            >
              <div className="p-3 bg-primary/10 rounded-xl text-primary group-hover:bg-primary group-hover:text-white transition-all">
                <Plus size={20} />
              </div>
              <div className="text-left">
                <p className="font-bold text-slate-900 dark:text-white">Apply for Loan</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Submit a new application</p>
              </div>
            </button>
            <Link 
              to="/customers"
              className="w-full flex items-center gap-4 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-primary/30 hover:bg-primary/5 transition-all group"
            >
              <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-600 dark:text-slate-400 group-hover:bg-primary group-hover:text-white transition-all">
                <Users size={20} />
              </div>
              <div className="text-left">
                <p className="font-bold text-slate-900 dark:text-white">Add Customer</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Register a new client</p>
              </div>
            </Link>
            <button className="w-full flex items-center gap-4 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-primary/30 hover:bg-primary/5 transition-all group">
              <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-600 dark:text-slate-400 group-hover:bg-primary group-hover:text-white transition-all">
                <Download size={20} />
              </div>
              <div className="text-left">
                <p className="font-bold text-slate-900 dark:text-white">Download Forms</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Get offline documents</p>
              </div>
            </button>
          </div>

          <div className="mt-8">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Recent Activity</h4>
            <div className="space-y-4">
              {activityLogs.slice(0, 4).map(log => (
                <div key={log.id} className="flex gap-3">
                  <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                    log.type === 'loan' ? 'bg-primary' : 
                    log.type === 'customer' ? 'bg-emerald-500' : 
                    log.type === 'auth' ? 'bg-amber-500' : 'bg-slate-400'
                  }`}></div>
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-300">{log.action}: <span className="font-bold">{log.details}</span></p>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500">{log.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </motion.div>
  );
};
