import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Download, Search, Eye } from "lucide-react";
import { StatusBadge, Button, Card } from "../ui";
import { TransactionDetailModal } from "../shared/TransactionDetailModal";
import { mockTransactions, mockCustomers, mockLoans } from "../../mockData";
import type { Transaction } from "../../types";

export const Transactions: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);

  const filteredTransactions = useMemo(() => {
    return mockTransactions.filter(
      (txn) =>
        txn.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        txn.id.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery]);

  const getTransactionDetails = (transaction: Transaction) => {
    const customer = mockCustomers.find((c) => c.id === transaction.customerId);
    const loan = mockLoans.find((l) => l.id === transaction.loanId);
    return { customer, loan };
  };

  const exportToCSV = (data: any[], filename: string) => {
    if (data.length === 0) return;
    const headers = Object.keys(data[0]).join(",");
    const rows = data.map((obj) =>
      Object.values(obj)
        .map((val) =>
          typeof val === "string" ? `"${val.replace(/"/g, '""')}"` : val,
        )
        .join(","),
    );
    const csvContent =
      "data:text/csv;charset=utf-8," + headers + "\n" + rows.join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${filename}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
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
          <h1 className="text-2xl font-bold text-slate-900">Transactions</h1>
          <p className="text-slate-500">
            History of disbursements, repayments, and fees.
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => exportToCSV(filteredTransactions, "transactions")}
          className="flex items-center justify-center gap-2"
        >
          <Download size={20} />
          Export CSV
        </Button>
      </div>

      <Card className="overflow-hidden">
        <div className="p-4 border-b border-slate-50 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:max-w-xs">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={16}
            />
            <input
              type="text"
              placeholder="Search transactions..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 text-slate-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 text-slate-500 text-xs uppercase tracking-wider">
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
            <tbody className="divide-y divide-slate-50">
              {filteredTransactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-50/50 transition-all">
                  <td className="px-6 py-4 text-sm font-bold text-slate-900">
                    {tx.id}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600">
                        {tx.customerName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <span className="text-sm font-medium text-slate-900">
                        {tx.customerName}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-xs font-bold uppercase tracking-wider ${
                        tx.type === "disbursement"
                          ? "text-primary"
                          : tx.type === "repayment"
                            ? "text-emerald-600"
                            : "text-slate-500"
                      }`}
                    >
                      {tx.type}
                    </span>
                  </td>
                  <td
                    className={`px-6 py-4 text-sm font-bold ${
                      tx.type === "repayment"
                        ? "text-emerald-600"
                        : "text-slate-900"
                    }`}
                  >
                    {tx.type === "repayment" ? "+" : "-"}$
                    {tx.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={tx.status} />
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">
                    {tx.date}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 transition-all"
                      onClick={() => setSelectedTransaction(tx)}
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

      <TransactionDetailModal
        isOpen={!!selectedTransaction}
        onClose={() => setSelectedTransaction(null)}
        transaction={selectedTransaction}
        details={
          selectedTransaction
            ? getTransactionDetails(selectedTransaction)
            : { customer: undefined, loan: undefined }
        }
      />
    </motion.div>
  );
};
