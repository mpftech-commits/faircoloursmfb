import React, { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Eye,
  Download,
  FileText,
  Loader2, 
  AlertCircle,
} from "lucide-react";
import { StatusBadge, Button, Card } from "../ui";
import { GetLoans } from "../../../services/Axios";

type loanProps = {
  _id: string;
  publicId: string;
  name: string;
  amount: string;
  duration: string;
  purpose: string;
  status: string;
  dateSubmitted: string;
};

export const Loans: React.FC = () => {
  const [loans, setLoans] = useState<loanProps[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchLoans = async () => {
    setLoading(true);
    setError(null); // Clear previous errors
    try {
      const res = await GetLoans(1, 10);
      // Logic check: ensure we are accessing the right nested data
      const data = res.data?.guarantorData || res.data || [];
      setLoans(data);
    } catch (err: any) {
      console.error("error getting loans:", err.message);
      setError(
        err.message || "Failed to fetch loan applications. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLoans();
  }, []);

  const filteredLoans = useMemo(() => {
    return loans.filter(
      (loan) =>
        loan.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        loan.publicId.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery, loans]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Loan Applications
          </h1>
          <p className="text-slate-500">
            Track and manage all submitted loan requests.
          </p>
        </div>
      </div>

      <Card className="overflow-hidden">
        <div className="p-4 border-b border-slate-50 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0">
            <Button variant="primary" size="sm" className="text-gray-600">
              All
            </Button>
            <Button variant="ghost" size="sm" className="text-slate-600">
              Pending
            </Button>
            <Button variant="ghost" size="sm" className="text-slate-600">
              Approved
            </Button>
            <Button variant="ghost" size="sm" className="text-slate-600">
              Rejected
            </Button>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={16}
              />
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

        <div className="overflow-x-auto min-h-[300px] relative">
          {/* --- LOADING STATE --- */}
          {loading && (
            <div className="absolute inset-0 bg-white/50 backdrop-blur-[1px] z-10 flex flex-col items-center justify-center">
              <Loader2 className="w-8 h-8 text-blue-600 animate-spin mb-2" />
              <p className="text-sm text-slate-500 font-medium">
                Loading applications...
              </p>
            </div>
          )}

          {/* --- ERROR STATE --- */}
          {!loading && error && (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4 text-red-500">
                <AlertCircle size={32} />
              </div>
              <h3 className="font-bold text-slate-900">Something went wrong</h3>
              <p className="text-slate-500 text-sm mt-1 mb-6">{error}</p>
              <Button
                onClick={fetchLoans}
                variant="primary"
                className="mx-auto"
              >
                Try Again
              </Button>
            </div>
          )}

          {/* --- TABLE CONTENT --- */}
          {!error && (
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
                {filteredLoans.map((loan) => (
                  <tr
                    key={loan.publicId}
                    className="hover:bg-slate-100 transition-all"
                  >
                    <td className="px-6 py-4 text-sm font-bold text-slate-900">
                      {loan.publicId}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-400">
                          {loan.name
                            ? loan.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                            : "??"}
                        </div>
                        <span className="text-sm font-medium text-slate-900">
                          {loan.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500 font-medium">
                      ${Number(loan.amount).toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={loan.status} />
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">
                      {loan.dateSubmitted}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 transition-all">
                          <Eye size={18} />
                        </button>
                        <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 transition-all">
                          <Download size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* --- EMPTY STATE --- */}
          {!loading && !error && filteredLoans.length === 0 && (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                <FileText size={32} />
              </div>
              <h3 className="font-bold text-slate-900">
                No applications found
              </h3>
              <p className="text-slate-500 text-sm mt-1">
                1. Try adjusting your search or filters.
              </p>
              <p className="text-slate-500 text-sm mt-1">
                2. Try checking your internet connection.
              </p>
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
};
