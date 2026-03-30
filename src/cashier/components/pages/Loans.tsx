import React from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Eye, 
  Download, 
  FileText 
} from 'lucide-react';
import { StatusBadge, Button, Card } from '../ui';
import { useDashboard } from '../../context/DashboardContext';

export const Loans: React.FC = () => {
  const { filteredLoans, searchQuery, setSearchQuery, handleApplyLoan } = useDashboard();
  return (
    <motion.div 
      key="loans"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Loan Applications</h1>
          <p className="text-slate-500 dark:text-slate-400">Track and manage all submitted loan requests.</p>
        </div>
        <Button 
          onClick={() => handleApplyLoan()}
          className="flex items-center justify-center gap-2"
        >
          <Plus size={20} />
          New Application
        </Button>
      </div>

      <Card className="overflow-hidden">
        <div className="p-4 border-b border-slate-50 dark:border-slate-800 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0">
            <Button variant="primary" size="sm">All</Button>
            <Button variant="ghost" size="sm" className="text-slate-600 dark:text-slate-400">Pending</Button>
            <Button variant="ghost" size="sm" className="text-slate-600 dark:text-slate-400">Approved</Button>
            <Button variant="ghost" size="sm" className="text-slate-600 dark:text-slate-400">Rejected</Button>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Search applications..." 
                className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 dark:text-white text-slate-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-medium">Application ID</th>
                <th className="px-6 py-4 font-medium">Customer</th>
                <th className="px-6 py-4 font-medium">Amount</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Date Submitted</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
              {filteredLoans.map(loan => (
                <tr key={loan.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-all hover:bg-slate-100">
                  <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">{loan.id}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-400 dark:text-slate-400">
                        {loan.customerName.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="text-sm font-medium text-slate-900 dark:text-white">{loan.customerName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400 font-medium">${loan.amount.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <StatusBadge status={loan.status} />
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">{loan.dateSubmitted}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-all cursor-pointer">
                        <Eye size={18} />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-all cursor-pointer">
                        <Download size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredLoans.length === 0 && (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-slate-50 dark:bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300 dark:text-slate-700">
              <FileText size={32} />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white">No applications found</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Try adjusting your search or filters.</p>
          </div>
        )}
      </Card>
    </motion.div>
  );
};
