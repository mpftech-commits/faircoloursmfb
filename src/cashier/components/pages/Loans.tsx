import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Eye, 
  Download, 
  FileText 
} from 'lucide-react';
import { StatusBadge, Button, Card } from '../ui';
import { mockLoans } from '../../mockData';

export const Loans: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLoans = useMemo(() => {
    return mockLoans.filter(
      (loan) =>
        loan.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        loan.id.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery]);

  const handleApplyLoan = () => {
    navigate('/cashiers/loans/new');
  };
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
          <h1 className="text-2xl font-bold text-slate-900">Loan Applications</h1>
          <p className="text-slate-500">Track and manage all submitted loan requests.</p>
        </div>
        <Button 
          onClick={() => handleApplyLoan()}
          className="flex items-center justify-center gap-2 bg-blue-700 cursor-pointer"
        >
          <Plus size={20} />
          New Application
        </Button>
      </div>

      <Card className="overflow-hidden">
        <div className="p-4 border-b border-slate-50 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0">
            <Button variant="primary" size="sm">All</Button>
            <Button variant="ghost" size="sm" className="text-slate-600">Pending</Button>
            <Button variant="ghost" size="sm" className="text-slate-600">Approved</Button>
            <Button variant="ghost" size="sm" className="text-slate-600">Rejected</Button>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Search applications..." 
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 text-slate-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 text-slate-500 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-medium">Application ID</th>
                <th className="px-6 py-4 font-medium">Customer</th>
                <th className="px-6 py-4 font-medium">Amount</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Date Submitted</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredLoans.map(loan => (
                <tr key={loan.id} className="hover:bg-slate-100 transition-all">
                  <td className="px-6 py-4 text-sm font-bold text-slate-900">{loan.id}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-400">
                        {loan.customerName.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="text-sm font-medium text-slate-900">{loan.customerName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500 font-medium">₦{loan.amount.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <StatusBadge status={loan.status} />
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">{loan.dateSubmitted}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 transition-all cursor-pointer">
                        <Eye size={18} />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 transition-all cursor-pointer">
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
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
              <FileText size={32} />
            </div>
            <h3 className="font-bold text-slate-900">No applications found</h3>
            <p className="text-slate-500 text-sm mt-1">Try adjusting your search or filters.</p>
          </div>
        )}
      </Card>
    </motion.div>
  );
};
