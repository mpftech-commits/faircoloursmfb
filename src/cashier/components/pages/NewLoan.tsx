import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeftRight, 
  Check, 
  Search, 
  Plus, 
  Upload, 
  FileText, 
  XCircle, 
  Clock 
} from 'lucide-react';
import { Button, Input, Select, Card } from '../ui';
import { mockCustomers } from '../../mockData';

interface NewLoanData {
  customerId?: string;
  customerName?: string;
  amount?: number;
  duration?: number;
  interestType?: 'fixed' | 'reducing';
}

export const NewLoan: React.FC = () => {
  const navigate = useNavigate();
  const [loanStep, setLoanStep] = useState(1);
  const [newLoanData, setNewLoanData] = useState<NewLoanData>({});
  const customers = mockCustomers;

  const handleApplyLoan = () => {
    // Handle loan application submission
    console.log('Submitting loan application:', newLoanData);
    navigate('/cashier/loans');
  };

  return (
    <motion.div 
      key="new-loan"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="max-w-3xl mx-auto space-y-8"
    >
      <div className="flex items-center gap-4">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 rounded-xl hover:bg-white border border-transparent hover:border-slate-200 transition-all text-slate-600"
        >
          <ArrowLeftRight className="rotate-180" size={20} />
        </button>
        <h1 className="text-2xl font-bold text-slate-900">New Loan Application</h1>
      </div>

      {/* Stepper */}
      <div className="flex items-center justify-between relative px-4">
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 -translate-y-1/2 z-0"></div>
        {[1, 2, 3, 4].map(step => (
          <div key={step} className="relative z-10 flex flex-col items-center gap-2">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
              loanStep === step ? 'bg-primary text-slate-500 ring-4 ring-primary/20' : 
              loanStep > step ? 'bg-emerald-500 text-white' : 'bg-white border-2 border-slate-200 text-slate-400'
            }`}>
              {loanStep > step ? <Check size={20} /> : step}
            </div>
            <span className={`text-[10px] font-bold uppercase tracking-wider ${loanStep === step ? 'text-primary' : 'text-slate-400'}`}>
              {step === 1 ? 'Customer' : step === 2 ? 'Details' : step === 3 ? 'Documents' : 'Review'}
            </span>
          </div>
        ))}
      </div>

      <Card className="p-8">
        {loanStep === 1 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <h2 className="text-xl font-bold text-slate-900">Select Customer</h2>
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input 
                  type="text" 
                  placeholder="Search existing customer..." 
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-slate-500"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {customers.slice(0, 4).map(cust => (
                  <button 
                    key={cust.id}
                    onClick={() => {
                      setNewLoanData({ ...newLoanData, customerId: cust.id, customerName: cust.name });
                      setLoanStep(2);
                    }}
                    className="p-4 rounded-2xl border border-slate-100 hover:border-primary hover:bg-primary/5 text-left transition-all"
                  >
                    <p className="font-bold text-slate-900">{cust.name}</p>
                    <p className="text-xs text-slate-500">{cust.phone}</p>
                  </button>
                ))}
              </div>
              <div className="pt-4 border-t border-slate-50">
                <button className="w-full py-4 rounded-2xl border-2 border-dashed border-slate-200 text-slate-500 font-medium hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
                  <Plus size={20} />
                  Register New Customer
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {loanStep === 2 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <h2 className="text-xl font-bold text-slate-900">Loan Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Input 
                label="Loan Amount ($)"
                type="number" 
                placeholder="e.g. 50000"
                value={newLoanData.amount?.toString() || ''}
                onChange={e => setNewLoanData({...newLoanData, amount: Number(e.target.value)})}
              />
              <Select 
                label="Duration (Months)"
                value={newLoanData.duration?.toString() || '12'}
                onChange={e => setNewLoanData({...newLoanData, duration: Number(e.target.value)})}
                options={[
                  { value: '6', label: '6 Months' },
                  { value: '12', label: '12 Months' },
                  { value: '24', label: '24 Months' },
                  { value: '36', label: '36 Months' },
                ]}
              />
              <div className="space-y-2 sm:col-span-2">
                <label className="text-sm font-medium text-slate-500">Interest Type</label>
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={() => setNewLoanData({...newLoanData, interestType: 'fixed'})}
                    className={`p-4 rounded-xl border-2 transition-all text-left ${newLoanData.interestType === 'fixed' ? 'border-primary bg-primary/5' : 'border-slate-100'}`}
                  >
                    <p className="font-bold text-sm text-slate-500">Fixed Rate</p>
                    <p className="text-xs text-slate-500">Constant interest throughout</p>
                  </button>
                  <button 
                    onClick={() => setNewLoanData({...newLoanData, interestType: 'reducing'})}
                    className={`p-4 rounded-xl border-2 transition-all text-left ${newLoanData.interestType === 'reducing' ? 'border-primary bg-primary/5' : 'border-slate-100'}`}
                  >
                    <p className="font-bold text-sm text-slate-500">Reducing Balance</p>
                    <p className="text-xs text-slate-500">Interest on remaining principal</p>
                  </button>
                </div>
              </div>
            </div>
            <div className="flex justify-between pt-6">
              <Button variant="ghost" onClick={() => setLoanStep(1)}>Back</Button>
              <Button onClick={() => setLoanStep(3)}>Continue</Button>
            </div>
          </motion.div>
        )}

        {loanStep === 3 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <h2 className="text-xl font-bold text-slate-900">Upload Documents</h2>
            <div className="space-y-4">
              <div className="p-8 border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center text-center gap-4 hover:bg-slate-50 transition-all cursor-pointer">
                <div className="p-4 bg-primary/10 rounded-full text-primary">
                  <Upload size={32} />
                </div>
                <div>
                  <p className="font-bold text-slate-900">Click to upload or drag and drop</p>
                  <p className="text-sm text-slate-500">NID, Proof of Income, or Bank Statements (PDF, JPG up to 10MB)</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-3">
                    <FileText className="text-primary" size={20} />
                    <span className="text-sm font-medium">NID_Copy.pdf</span>
                  </div>
                  <button className="text-rose-500 hover:bg-rose-50 p-1 rounded-lg transition-all"><XCircle size={18} /></button>
                </div>
              </div>
            </div>
            <div className="flex justify-between pt-6">
              <Button variant="ghost" onClick={() => setLoanStep(2)}>Back</Button>
              <Button onClick={() => setLoanStep(4)}>Review Application</Button>
            </div>
          </motion.div>
        )}

        {loanStep === 4 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
            <h2 className="text-xl font-bold text-slate-900">Review & Submit</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Customer Info</h3>
                <div>
                  <p className="text-sm text-slate-500">Name</p>
                  <p className="font-bold text-slate-900">{newLoanData.customerName || 'Rahim Ahmed'}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Customer ID</p>
                  <p className="font-bold text-slate-900">{newLoanData.customerId || 'CUST-001'}</p>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Loan Details</h3>
                <div>
                  <p className="text-sm text-slate-500">Amount</p>
                  <p className="font-bold text-slate-900">৳{newLoanData.amount?.toLocaleString() || '50,000'}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Duration</p>
                  <p className="font-bold text-slate-900">{newLoanData.duration || '12'} Months</p>
                </div>
              </div>
            </div>
            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 flex gap-3">
              <Clock className="text-amber-600 shrink-0" size={20} />
              <p className="text-xs text-amber-700">This application will be sent to the administrator for approval. You will be notified once a decision is made.</p>
            </div>
            <div className="flex justify-between pt-6">
              <Button variant="ghost" onClick={() => setLoanStep(3)}>Back</Button>
              <Button 
                onClick={() => handleApplyLoan()}
                className="bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-200"
              >
                Submit Application
              </Button>
            </div>
          </motion.div>
        )}
      </Card>
    </motion.div>
  );
};
