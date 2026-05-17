import React from 'react';
import { jsPDF } from 'jspdf';
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

  const downloadReceiptPdf = () => {
    if (!transaction) return;

    const doc = new jsPDF({ unit: 'pt', format: 'a4' });
    const leftX = 40;
    const topY = 50;
    const col1Width = 160;
    const col2Width = 360;
    const pageHeight = 842;
    const rowPadding = 8;

    const sections = [
      {
        title: 'Transaction Details',
        items: [
          ['Transaction ID', transaction.publicId || 'N/A'],
          ['Type', transaction.type || 'N/A'],
          ['Status', transaction.status || 'N/A'],
          ['Amount', `₦${Number(transaction.amount || 0).toLocaleString()}`],
          ['Date & Time', new Date(transaction.createdAt).toLocaleString()],
        ],
      },
      {
        title: 'Customer Details',
        items: [
          ['Customer Name', customer?.fullName || 'N/A'],
          ['Customer ID', customer?.publicId || customer?._id || 'N/A'],
          ['Customer Phone', customer?.phone || 'N/A'],
          ['Account Status', customer?.accountStatus || 'N/A'],
        ],
      },
      {
        title: 'Processing Details',
        items: [
          ['Processed By', cashier?.fullName || 'N/A'],
          ['Staff ID', cashier?.publicId || cashier?._id || 'N/A'],
          ['Staff Email', cashier?.email || 'N/A'],
        ],
      },
    ];

    const drawTableHeader = (y: number) => {
      doc.setFontSize(20);
      doc.setFont('helvetica', 'bold');
      doc.text('FairColours MFB Receipt', leftX, y);
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text(`Receipt generated: ${new Date().toLocaleString()}`, leftX, y + 24);

      const tableTop = y + 45;
      doc.setFillColor(241, 245, 249);
      doc.rect(leftX, tableTop, col1Width + col2Width, 24, 'F');
      doc.setDrawColor(200, 200, 200);
      doc.setLineWidth(0.5);
      doc.rect(leftX, tableTop, col1Width + col2Width, 24);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('Field', leftX + rowPadding, tableTop + 16);
      doc.text('Value', leftX + col1Width + rowPadding, tableTop + 16);
      return tableTop + 24;
    };

    const drawSectionTitle = (y: number, title: string) => {
      const titleHeight = 26;
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(51, 65, 85);
      doc.text(title, leftX, y + 16);
      doc.setDrawColor(226, 232, 240);
      doc.setLineWidth(0.5);
      doc.line(leftX, y + titleHeight, leftX + col1Width + col2Width, y + titleHeight);
      doc.setTextColor(0, 0, 0);
      return y + titleHeight + 6;
    };

    let currentY = drawTableHeader(topY);

    const addPageIfNeeded = (nextY: number) => {
      if (nextY > pageHeight - 80) {
        doc.addPage();
        currentY = drawTableHeader(40);
      }
    };

    sections.forEach((section) => {
      addPageIfNeeded(currentY + 40);
      currentY = drawSectionTitle(currentY, section.title);

      section.items.forEach(([label, value]) => {
        const wrappedValue = doc.splitTextToSize(value, col2Width - rowPadding * 2);
        const rowHeight = Math.max(24, wrappedValue.length * 14 + rowPadding * 2);
        addPageIfNeeded(currentY + rowHeight);

        doc.setDrawColor(220, 220, 220);
        doc.setLineWidth(0.5);
        doc.rect(leftX, currentY, col1Width + col2Width, rowHeight);
        doc.line(leftX + col1Width, currentY, leftX + col1Width, currentY + rowHeight);

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(11);
        doc.text(label, leftX + rowPadding, currentY + 16);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(11);
        doc.text(wrappedValue, leftX + col1Width + rowPadding, currentY + 16);

        currentY += rowHeight;
      });
    });

    doc.save(`receipt-${transaction.publicId || 'transaction'}.pdf`);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Transaction Details"
      size="lg"
      footer={
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>Close</Button>
          <Button onClick={downloadReceiptPdf} className="flex items-center gap-2">
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
