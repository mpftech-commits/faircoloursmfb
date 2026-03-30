import React from 'react';
import { User, ArrowLeftRight, FileText, Clock, Download, ChevronRight, CreditCard } from 'lucide-react';
import { Modal, Button, Badge, StatusBadge } from '../ui';
import type { Transaction, Customer, Loan } from "../../types";

interface TransactionDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: Transaction | null;
  details: { customer: Customer | undefined; loan: Loan | null | undefined };
}

export const TransactionDetailModal: React.FC<TransactionDetailModalProps> = ({ 
  isOpen, 
  onClose, 
  transaction, 
  details 
}) => {
  if (!transaction) return null;

  const { customer, loan } = details;

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      title="Transaction Details"
      size="lg"
      footer={
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>Close</Button>
          <Button onClick={() => window.print()} className="flex items-center gap-2">
            <Download size={16} />
            Download Receipt
          </Button>
        </div>
      }
    >
      <div className="space-y-8">
        <div className="flex items-center justify-between p-6 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-slate-100 dark:border-slate-800">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Transaction ID</p>
            <h4 className="text-2xl font-black text-slate-900 dark:text-white">{transaction.id}</h4>
          </div>
          <div className="text-right">
            <StatusBadge status={transaction.status} />
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 font-medium">{transaction.date}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <h5 className="text-sm font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <User size={16} className="text-primary" />
                Customer Information
              </h5>
              <div className="p-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl space-y-3">
                <div className="flex justify-between">
                  <span className="text-xs text-slate-400">Name</span>
                  <span className="text-sm font-bold dark:text-white">{transaction.customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-slate-400">Customer ID</span>
                  <span className="text-sm font-bold dark:text-white">{transaction.customerId}</span>
                </div>
                {customer ? (
                  <>
                    <div className="flex justify-between">
                      <span className="text-xs text-slate-400">Phone</span>
                      <span className="text-sm font-bold dark:text-white">{customer.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-slate-400">Email</span>
                      <span className="text-sm font-bold dark:text-white">{customer.email}</span>
                    </div>
                  </>
                ) : (
                  <div className="pt-2 border-t border-slate-50 dark:border-slate-800">
                    <p className="text-[10px] text-slate-400 italic">Detailed profile data unavailable for this customer.</p>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h5 className="text-sm font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <ArrowLeftRight size={16} className="text-primary" />
                Transaction Summary
              </h5>
              <div className="p-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl space-y-3">
                <div className="flex justify-between">
                  <span className="text-xs text-slate-400">Type</span>
                  <Badge variant={transaction.type === 'repayment' ? 'success' : 'info'}>
                    {transaction.type}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-slate-400">Amount</span>
                  <span className="text-lg font-black text-primary">৳{transaction.amount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-slate-400">Method</span>
                  <span className="text-sm font-bold dark:text-white">Bank Transfer</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h5 className="text-sm font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <FileText size={16} className="text-primary" />
                Associated Loan
              </h5>
              {loan ? (
                <div className="p-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl space-y-3">
                  <div className="flex justify-between">
                    <span className="text-xs text-slate-400">Loan ID</span>
                    <span className="text-sm font-bold dark:text-white">{loan.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-slate-400">Total Amount</span>
                    <span className="text-sm font-bold dark:text-white">৳{loan.amount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-slate-400">Status</span>
                    <StatusBadge status={loan.status || ''} />
                  </div>
                  <Button variant="ghost" size="sm" className="w-full mt-2">
                    View Full Loan Details
                    <ChevronRight size={14} />
                  </Button>
                </div>
              ) : (
                <div className="p-6 border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-2xl text-center">
                  <p className="text-xs text-slate-400">No loan associated with this transaction.</p>
                </div>
              )}
            </div>

            <div className="p-6 bg-amber-50 dark:bg-amber-900/10 rounded-2xl border border-amber-100 dark:border-amber-900/30">
              <div className="flex gap-3">
                <Clock size={18} className="text-amber-600 shrink-0" />
                <div>
                  <p className="text-xs font-bold text-amber-800 dark:text-amber-400 uppercase tracking-wider">Audit Trail</p>
                  <p className="text-xs text-amber-700 dark:text-amber-500 mt-1">Processed by Mercy Goodness on {transaction.date} at 14:30 PM.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
