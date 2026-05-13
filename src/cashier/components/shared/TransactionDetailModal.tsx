import React from 'react';
import { User, ArrowLeftRight, FileText, Clock, Download } from 'lucide-react';
import { Modal, Button, Badge, StatusBadge } from '../ui';

// Update interface to match the API structure used in the parent component
interface TransactionDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: any | null; // Matches the 'Transactions' type from your previous file
  details: { 
    customer: any | undefined; 
    cashier: any | undefined;
  };
}

export const TransactionDetailModal: React.FC<TransactionDetailModalProps> = ({ 
  isOpen, 
  onClose, 
  transaction, 
  details 
}) => {
  // Guard clause
  if (!transaction) return null;

  const { customer, cashier } = details;

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
        {/* Header Section */}
        <div className="flex items-center justify-between p-6 bg-slate-50 rounded-3xl border border-slate-100">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Transaction ID</p>
            <h4 className="text-lg font-black text-slate-900">{transaction.publicId}</h4>
          </div>
          <div className="text-right">
            <StatusBadge status={transaction.status} />
            <p className="text-sm text-slate-500 mt-2 font-medium">
              {new Date(transaction.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            {/* Customer Information */}
            <div>
              <h5 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                <User size={16} className="text-primary" />
                Customer Information
              </h5>
              <div className="p-4 bg-white border border-slate-100 rounded-2xl space-y-3 shadow-sm">
                <div className="flex justify-between">
                  <span className="text-xs text-slate-400">Name</span>
                  <span className="text-sm font-bold text-slate-600">{customer?.fullName || "N/A"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-slate-400">Customer ID</span>
                  <span className="text-sm font-bold text-slate-600">{customer?.publicId || "N/A"}</span>
                </div>
              
                   <div className="flex justify-between">
                    <span className="text-xs text-slate-400">Phone</span>
                    <span className="text-sm font-bold text-slate-600">{customer?.phone ?? "N/A"}</span>
                  </div>
                   <div className="flex justify-between">
                    <span className="text-xs text-slate-400">Account Status</span>
                    <span className="text-sm font-bold text-slate-600">{customer?.accountStatus ?? "N/A"}</span>
                  </div>
                
              </div>
            </div>

            {/* Transaction Summary */}
            <div>
              <h5 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                <ArrowLeftRight size={16} className="text-primary" />
                Transaction Summary
              </h5>
              <div className="p-4 bg-white border border-slate-100 rounded-2xl space-y-3 shadow-sm">
                <div className="flex justify-between">
                  <span className="text-xs text-slate-400">Type</span>
                  <Badge variant={transaction.type === 'deposit' ? 'success' : 'info'}>
                    {transaction.type}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-slate-400">Amount</span>
                  <span className="text-lg font-black text-primary">
                    ₦{transaction.amount.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-slate-400">Date & Time</span>
                  <span className="text-sm font-bold">
                    {new Date(transaction.createdAt).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Staff / Cashier Information */}
            <div>
              <h5 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                <FileText size={16} className="text-primary" />
                Processing Details
              </h5>
              {cashier ? (
                <div className="p-4 bg-white border border-slate-100 rounded-2xl space-y-3 shadow-sm">
                  <div className="flex justify-between">
                    <span className="text-xs text-slate-400 ">Processed By</span>
                    <span className="text-sm font-bold text-slate-600">{cashier.fullName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-slate-400">Staff ID</span>
                    <span className="text-sm font-bold text-slate-600">{cashier.publicId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-slate-400">Staff Email</span>
                    <span className="text-sm font-bold text-slate-600">{cashier.email}</span>
                  </div>
                </div>
              ) : (
                <div className="p-6 border-2 border-dashed border-slate-100 rounded-2xl text-center">
                  <p className="text-xs text-slate-400">No staff details recorded.</p>
                </div>
              )}
            </div>

            {/* Audit Trail / Notes */}
            <div className="p-6 bg-amber-50 rounded-2xl border border-amber-100">
              <div className="flex gap-3">
                <Clock size={18} className="text-amber-600 shrink-0" />
                <div>
                  <p className="text-xs font-bold text-amber-800 uppercase tracking-wider">Audit Trail</p>
                  <p className="text-xs text-amber-700 mt-1">
                    This {transaction.status} {transaction.type} was recorded on {new Date(transaction.createdAt).toLocaleDateString()} at {new Date(transaction.createdAt).toLocaleTimeString()}.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
