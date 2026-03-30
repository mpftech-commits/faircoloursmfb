import React from 'react';
import { motion } from 'framer-motion';
import { 
  Download, 
  Search, 
  Eye 
} from 'lucide-react';
import { StatusBadge, Button, Card } from '../ui';
import { useDashboard } from '../../context/DashboardContext';

export const Transactions: React.FC = () => {
  const { filteredTransactions, searchQuery, setSearchQuery, exportToCSV, setSelectedTransaction } = useDashboard();
  return (
    <motion.div 
      key="transactions"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Transactions</h1>
          <p className="text-slate-500 dark:text-slate-400">History of disbursements, repayments, and fees.</p>
        </div>
        <Button 
          variant="outline"
          onClick={() => exportToCSV(filteredTransactions, 'transactions')}
          className="flex items-center justify-center gap-2"
        >
          <Download size={20} />
          Export CSV
        </Button>
      </div>

      <Card className="overflow-hidden">
        <div className="p-4 border-b border-slate-50 dark:border-slate-800 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search transactions..." 
              className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 dark:text-white text-slate-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-medium">Transaction ID</th>
                <th className="px-6 py-4 font-medium">Customer</th>
                <th className="px-6 py-4 font-medium">Type</th>
                <th className="px-6 py-4 font-medium">Amount</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
              {filteredTransactions.map(tx => (
                <tr key={tx.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-all">
                  <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-slate-100">{tx.id}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-600 dark:text-slate-400">
                        {tx.customerName.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="text-sm font-medium text-slate-900 dark:text-slate-200">{tx.customerName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-bold uppercase tracking-wider ${
                      tx.type === 'disbursement' ? 'text-primary' : 
                      tx.type === 'repayment' ? 'text-emerald-600' : 'text-slate-500 dark:text-slate-400'
                    }`}>
                      {tx.type}
                    </span>
                  </td>
                  <td className={`px-6 py-4 text-sm font-bold ${
                    tx.type === 'repayment' ? 'text-emerald-600' : 'text-slate-900 dark:text-slate-100'
                  }`}>
                    {tx.type === 'repayment' ? '+' : '-'}${tx.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={tx.status} />
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">{tx.date}</td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => setSelectedTransaction(tx)}
                      className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 hover:bg-slate-100 text-slate-500 transition-all"
                    >
                      <Eye size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </motion.div>
  );
};
