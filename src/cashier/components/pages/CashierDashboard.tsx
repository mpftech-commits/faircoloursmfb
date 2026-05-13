import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Users,
  FileText,
  Clock,
  CheckCircle2,
  Download,
  Plus,
  // Eye,
  AlertTriangle,
  Loader,

} from 'lucide-react';
import { StatCard } from '../shared/StatCard';
import { StatusBadge, Button, Card, TypeBadge } from '../ui';
import { mockActivityLogs } from '../../mockData';
import { getCashierDashboardStats } from '../../../services/Axios';

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
    _id: string
  };

}
type cashierDataProps = {
  deposits: number;
  withdrawals: number;
  loans: number;
  customers: number;
}

export const CashierDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery] = useState("");
  const [transactions, setTransactions] = useState<Transactions[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cashierData, setCashierData] = useState<cashierDataProps>({
    deposits: 0,
    withdrawals: 0,
    loans: 0,
    customers: 0
  });

  // Transaction Logic
  useEffect(() => {
    const fetchTAllDashboardData = async () => {
      setLoading(true);
      setError(null);
      try {
        // You can keep GetTransaction(1, 10)
        const cashierRes = await getCashierDashboardStats();

        const dashboardData = cashierRes?.data;

        // Update transactions with the "recentTransactions" array from the API
        setTransactions(dashboardData?.recentTransactions || []);

        // Update the stat cards
        setCashierData(dashboardData?.cards || {
          deposits: 0,
          withdrawals: 0,
          loans: 0,
          customers: 0
        });

      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
        setError("Failed to fetch dashboard data");
      } finally {
        setLoading(false);
      }
    };
    fetchTAllDashboardData();
  }, []);

  // const filteredTransactions = useMemo(() => {
  //   if (!transactions) return [];

  //   return transactions.filter((transaction) => {
  //     // 1. Look inside customerId for the name
  //     const name = transaction?.customerId?.fullName?.toLowerCase() || "";

  //     // 2. Use the publicId or the nested _id for ID searching
  //     const id = transaction?.publicId?.toLowerCase() || "";

  //     const query = searchQuery.toLowerCase();

  //     // 3. Return true if either matches the query
  //     return name.includes(query) || id.includes(query);
  //   });
  // }, [transactions, searchQuery]);


  console.log(transactions, " transactions");
  const handleApplyLoan = () => {
    navigate("/cashiers/customers");
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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className='flex items-center justify-center gap-3 animate-pulse'><Loader size={18} className='animate-spin' /> Loading Dashboard Data please wait...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex items-center justify-center h-full text-red-500 text-2xl font-semibold">
        <p className="flex items-center gap-5"> <AlertTriangle size={18} /> {error}</p>
      </div>
    );
  }

  const userStr = localStorage.getItem("user");
  if (!userStr) return;
  const user = JSON.parse(userStr);

  // if(! transactions || transactions.length === 0) {
  //   return <div>  Loading Transactions...</div>
  // }

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
            Welcome back, {user.fullName} !
          </h1>
          <p className="text-slate-500">
            Here's what's happening with your applications today.
          </p>
        </div>
        <div className="flex items-center gap-3 text-gray-900">
          <Button
            variant="outline"
            onClick={() => exportToCSV(transactions || [], "loan_report")}
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
          value={cashierData.customers || "0"}
          icon={Users}
          trend="+12%"
        />
        <StatCard
          title="Loans"
          value={`₦${(cashierData.loans || 0).toLocaleString()}`}
          icon={FileText}
          trend="+5.4%"
        />
        <StatCard
          title="Withdrawals"
          value={`₦${(cashierData.withdrawals || 0).toLocaleString()}`}
          icon={Clock}
        />
        <StatCard
          title="Total Deposit"
          value={`₦${(cashierData.deposits || 0).toLocaleString()}`}
          icon={CheckCircle2}
          trend="+8.2%"
        />

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 overflow-hidden">
          <div className="p-6 border-b border-slate-50  flex items-center justify-between">
            <h3 className="font-bold text-slate-900 ">
              Recent Transactions
            </h3>
            <Link
              to="/cashiers/transactions"
              className="text-sm text-primary font-medium hover:underline"
            >
              View All
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-100  text-slate-500  text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4 font-medium">customerId</th>
                  <th className="px-6 py-4 font-medium">Customer</th>
                  <th className="px-6 py-4 font-medium">Amount</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium">Type</th>
                  <th className="px-6 py-4 font-medium">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 ">
                {transactions?.map((transaction: Transactions) => {
                  // Fallback for name initials
                  const fullName = transaction.customerId?.fullName || "Unknown Customer";
                  const initials = fullName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase();

                  return (
                    <tr key={transaction._id} className="text-slate-500 transition-all group hover:bg-slate-50">
                      <td className="px-6 py-4 text-slate-500 text-xs font-medium">
                        {transaction.publicId}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold p-2 text-slate-600">
                            {initials}
                          </div>
                          <span className="text-sm font-medium text-slate-900">
                            {fullName}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-500">
                        ₦{transaction.amount.toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={transaction.status} />
                      </td>
                      <td className="px-6 py-4 text-sm ">
                        <TypeBadge type={transaction.type} />
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-500">
                        {new Date(transaction.createdAt).toLocaleDateString()}
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
                <p className="text-xs text-slate-500 ">Register a new client</p>
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
                    className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${log.type === "loan"
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
