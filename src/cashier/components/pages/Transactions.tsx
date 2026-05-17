import React, { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { Download, Search, Eye, Loader } from "lucide-react";
import { StatusBadge, Button, Card } from "../ui";
import { TransactionDetailModal } from "../shared/TransactionDetailModal";
import { GetTransaction } from "../../../services/Axios";

// Types defined as per your API structure
type Transactions = {
  publicId: string;
  _id: string;
  phone: string;
  createdAt: string;
  amount: number;
  status: string;
  type: string;
  customerId: {
    fullName: string;
    publicId: string;
  };
  cashierId: {
    email: string;
    fullName: string;
    phone: string;
    publicId: string;
    _id: string;
  };
};

export const Transactions: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  // CHANGED: Initialize as null, not an empty array
  const [selectedTransaction, setSelectedTransaction] = useState<Transactions | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [transactions, setTransactions] = useState<Transactions[]>([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        const res = await GetTransaction(1, 50);
        console.log("API Response:", res);
        // Ensure you are accessing the correct path in your API response
        setTransactions(res.transactions || res.data || []);
      } catch (error) {
        console.error("Failed to fetch transactions:", error);
        setError("Failed to fetch transactions");
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, []);

  const filteredTransactions = useMemo(() => {
    if (!transactions) return [];
    return transactions.filter((tx) => {
      const name = tx.customerId?.fullName?.toLowerCase() || "";
      const id = tx.publicId?.toLowerCase() || "";
      const query = searchQuery.toLowerCase();
      return name.includes(query) || id.includes(query);
    });
  }, [transactions, searchQuery]);

  // Helper to extract initials for the avatar
  const getInitials = (name: string) => {
    return name ? name.split(" ").map(n => n[0]).join("").toUpperCase() : "??";
  };

  // Helper to get color based on transaction type
  const getTypeColor = (type: string) => {
    switch (type) {
      case "deposit":
        return "text-emerald-600";
      case "withdrawal":
        return "text-red-600";
      case "loan":
        return "text-amber-600";
      default:
        return "text-slate-600";
    }
  };

  // Helper to get amount sign based on transaction type
  const getAmountSign = (type: string) => {
    return type === "deposit" ? "+" : "-";
  };

  const exportToCSV = (data: any[], filename: string) => {
    if (data.length === 0) return;
    const headers = ["ID", "Customer", "Type", "Amount", "Status", "Date"].join(",");
    const rows = data.map((tx) => [
      tx.publicId,
      tx.customerId?.fullName,
      tx.type,
      tx.amount,
      tx.status,
      tx.createdAt
    ].join(","));

    const csvContent = "data:text/csv;charset=utf-8," + headers + "\n" + rows.join("\n");
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", `${filename}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) return <div className="flex items-center gap-3 justify-center h-64 animate-pulse font-medium">< Loader size={18} className="animate-spin" />Loading transactions...</div>;
  if (error) return <div className="flex items-center justify-center h-64 text-red-500 font-medium">{error}</div>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Transactions</h1>
          <p className="text-slate-500">History of disbursements, repayments, and fees.</p>
        </div>
        <Button
          variant="outline"
          onClick={() => exportToCSV(filteredTransactions, "transactions")}
          className="flex items-center gap-2"
        >
          <Download size={20} /> Export CSV
        </Button>
      </div>

      <Card className="overflow-hidden">
        <div className="p-4 border-b border-slate-50">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              placeholder="Search by name or ID..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary/20"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 text-slate-500 text-xs uppercase">
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
                <tr key={tx._id} className="hover:bg-slate-50/50 transition-all">
                  <td className="px-6 py-4 text-xs font-bold text-slate-900">{tx.publicId}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-xs font-bold text-indigo-700">
                        {getInitials(tx.customerId?.fullName)}
                      </div>
                      <span className="text-xs font-medium text-slate-900">{tx.customerId?.fullName || "Unknown"}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs font-bold uppercase tracking-wider">
                    <span className={getTypeColor(tx.type)}>
                      {tx.type}
                    </span>
                  </td>
                  <td className={`px-6 py-4 text-xs font-medium flex gap-2 ${getTypeColor(tx.type)}`}>
                    {getAmountSign(tx.type)} ₦{tx.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 ">
                    <StatusBadge status={tx.status} />
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-500">
                    {new Date(tx.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      className="p-2 rounded-lg hover:bg-slate-100 text-slate-500"
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

      {/* MODAL COMPONENT */}
      <TransactionDetailModal
        isOpen={!!selectedTransaction}
        onClose={() => setSelectedTransaction(null)}
        transaction={selectedTransaction}
        // Since API data is already detailed, we pass what we have
        details={{
          customer: selectedTransaction?.customerId,
          cashier: selectedTransaction?.cashierId
        }}
      />
    </motion.div>
  );
};
