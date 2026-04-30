import React, { useState, useMemo, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Users, 
  FileText, 
  Clock, 
  CheckCircle2, 
  Download, 
  Plus, 
  Eye 
} from 'lucide-react';
import { StatCard } from '../shared/StatCard';
import { StatusBadge, Button, Card } from '../ui';
import { mockLoans, mockActivityLogs } from '../../mockData';
import { GetTransaction } from '../../../services/Axios';

type Transactions = {
  publicId: string;
  _id: string;
  name: string;
  phone: string;
  dateCreated: string;
  amount: string;
  status: string;
}

export const CashierDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery] = useState("");
  const [transactions, setTransactions] = useState<Transactions[]>([]);

  // Transaction Logic
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await GetTransaction(1, 10);
        console.log("Fetched transactions:", res);
        setTransactions(res?.data ?? []);
      } catch (error) {
        console.error("Failed to fetch transactions:", error);
      }
    };
    fetchTransactions();
  }, []);

  const filteredTransactions = useMemo(() => {
    return transactions?.filter(
      (transaction) =>
        transaction.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        transaction._id
          .toString()
          .toLowerCase()
          .includes(searchQuery.toLowerCase()),
    );
  }, [transactions, searchQuery]);

  const handleApplyLoan = () => {
    navigate("/cashiers/loans/new");
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
      key="dashboard"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 ">
            Welcome back, Mercy!
          </h1>
          <p className="text-slate-500">
            Here's what's happening with your applications today.
          </p>
        </div>
        <div className="flex items-center gap-3 text-gray-900">
          <Button
            variant="outline"
            onClick={() => exportToCSV(filteredTransactions, "loan_report")}
            className="flex items-center gap-2 "
          >
            <Download size={16} />
            Export Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatCard
          title="Total Customers"
          value="1,284"
          icon={Users}
          trend="+12%"
        />
        <StatCard
          title="Loans Submitted"
          value="452"
          icon={FileText}
          trend="+5.4%"
        />
        <StatCard title="Pending Approvals" value="28" icon={Clock} />
        <StatCard
          title="Approved Loans"
          value="384"
          icon={CheckCircle2}
          trend="+8.2%"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 overflow-hidden">
          <div className="p-6 border-b border-slate-50  flex items-center justify-between">
            <h3 className="font-bold text-slate-900 ">
              Recent Loan Applications
            </h3>
            <Link
              to="/loans"
              className="text-sm text-primary font-medium hover:underline"
            >
              View All
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-100  text-slate-500  text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4 font-medium">Customer</th>
                  <th className="px-6 py-4 font-medium">Amount</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium">Date</th>
                  <th className="px-6 py-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 ">
                {filteredTransactions
                  .slice(0, 5)
                  .map((transaction: Transactions) => {
                    return (
                      <tr
                        key={transaction._id}
                        className=" text-slate-500 transition-all group  hover:bg-slate-100"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-slate-100  flex items-center justify-center text-xs font-bold text-slate-600 ">
                              {transaction.name
                                .split(" ")
                                .map((n: string) => n[0])
                                .join("")}
                            </div>
                            <span className="text-sm font-medium text-slate-900 ">
                              {transaction.name}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-500 ">
                          ₦{transaction.amount.toLocaleString()}
                        </td>
                        <td className="px-6 py-4">
                          <StatusBadge status={transaction.status} />
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-500 ">
                          {transaction.dateCreated}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-500  group-hover:opacity-100 transition-all">
                            <Eye size={16} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-bold text-slate-900  mb-6">Quick Actions</h3>
          <div className="space-y-3">
            <button
              onClick={() => handleApplyLoan()}
              className="w-full flex items-center gap-4 p-4 rounded-2xl border border-slate-100 hover:border-primary/30 hover:bg-primary/5 transition-all group"
            >
              <div className="p-3 bg-primary/10 rounded-xl text-primary group-hover:bg-primary  transition-all">
                <Plus size={20} />
              </div>
              <div className="text-left">
                <p className="font-bold text-slate-900 ">Apply for Loan</p>
                <p className="text-xs text-slate-500 ">
                  Submit a new application
                </p>
              </div>
            </button>
            <Link
              to="/cashiers/create-customers"
              className="w-full flex items-center gap-4 p-4 rounded-2xl border border-slate-100 hover:border-primary/30 hover:bg-primary/5 transition-all group"
            >
              <div className="p-3 bg-slate-100  rounded-xl text-slate-600  group-hover:bg-primary  transition-all">
                <Users size={20} />
              </div>
             
                <div className="text-left">
                  <p className="font-bold text-slate-900 ">Add Customer</p>
                  <p className="text-xs text-slate-500 ">
                    Register a new client
                  </p>
                </div>
            </Link>
            <button className="w-full flex items-center gap-4 p-4 rounded-2xl border border-slate-100  hover:border-primary/30 hover:bg-primary/5 transition-all group">
              <div className="p-3 bg-slate-100 rounded-xl text-slate-600  group-hover:bg-primary transition-all">
                <Download size={20} />
              </div>
              <div className="text-left">
                <p className="font-bold text-slate-900 ">Download Forms</p>
                <p className="text-xs text-slate-500  ">
                  Get offline documents
                </p>
              </div>
            </button>
          </div>

          <div className="mt-8">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
              Recent Activity
            </h4>
            <div className="space-y-4">
              {mockActivityLogs.slice(0, 4).map((log) => (
                <div key={log.id} className="flex gap-3">
                  <div
                    className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                      log.type === "loan"
                        ? "bg-blue-700"
                        : log.type === "customer"
                          ? "bg-emerald-500"
                          : log.type === "auth"
                            ? "bg-amber-500"
                            : "bg-slate-400"
                    }`}
                  ></div>
                  <div>
                    <p className="text-sm text-slate-500 ">
                      {log.action}:{" "}
                      <span className="font-bold">{log.details}</span>
                    </p>
                    <p className="text-[10px] text-slate-400 ">
                      {log.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </motion.div>
  );
};;
