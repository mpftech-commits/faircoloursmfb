import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  MoreVertical 
} from 'lucide-react';
import { StatusBadge, Button, Card } from '../ui';
import { mockCustomers } from '../../mockData';

export const Customer: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCustomers = useMemo(() => {
    return mockCustomers.filter(
      (cust) =>
        cust.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cust.phone.includes(searchQuery),
    );
  }, [searchQuery]);

  const handleApplyLoan = (customer: typeof mockCustomers[0]) => {
    navigate('/cashiers/loans/new', { state: { customer } });
  };
  return (
    <motion.div 
      key="customers"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Customers</h1>
          <p className="text-slate-500 dark:text-slate-400">Manage and view your client database.</p>
        </div>
        <Button className="flex items-center justify-center gap-2">
          <Plus size={20} />
          Add New Customer
        </Button>
      </div>

      <Card className="overflow-hidden">
        <div className="p-4 border-b border-slate-50 dark:border-slate-800 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
            <input 
              type="text" 
              placeholder="Search by name or phone..." 
              className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 dark:text-white text-slate-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button variant="outline" size="sm" className="flex-1 sm:flex-none gap-2 text-slate-500">
              <Filter size={16} />
              Filter
            </Button>
            <Button variant="outline" size="sm" className="flex-1 sm:flex-none gap-2 text-slate-500">
              <Download size={16} />
              Export
            </Button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-medium">Name</th>
                <th className="px-6 py-4 font-medium">Contact</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Joined Date</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
              {filteredCustomers.map(cust => (
                <tr key={cust.id} className=" dark:hover:bg-slate-800/50 transition-all hover:bg-slate-100">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                        {cust.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-500 dark:text-white">{cust.name}</p>
                        <p className="text-xs text-slate-400 dark:text-slate-500">{cust.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-slate-500 dark:text-slate-300">{cust.phone}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-500">{cust.email}</p>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={cust.status} />
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">{cust.joinedDate}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => handleApplyLoan(cust)}
                        className="p-2 rounded-lg hover:bg-primary/10 text-primary transition-all" 
                        title="Apply for Loan"
                      >
                        <Plus size={18} />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-all">
                        <Eye size={18} />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 transition-all">
                        <MoreVertical size={18} />
                      </button>
                    </div>
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
