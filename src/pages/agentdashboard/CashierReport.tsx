import { useState, useMemo, useRef } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

type Transaction = {
  id: number;
  cashier: string;
  amount: number;
  type: "deposit" | "withdrawal";
  date: string;
};

// 🔥 MORE REALISTIC DATA
const mockData: Transaction[] = [
  { id: 1, cashier: "John", amount: 20000, type: "deposit", date: "2026-03-20" },
  { id: 2, cashier: "Mary", amount: 10000, type: "withdrawal", date: "2026-03-21" },
  { id: 3, cashier: "John", amount: 5000, type: "deposit", date: "2026-03-22" },
  { id: 4, cashier: "David", amount: 15000, type: "deposit", date: "2026-03-22" },
  { id: 5, cashier: "Mary", amount: 7000, type: "withdrawal", date: "2026-03-22" },
  { id: 6, cashier: "John", amount: 12000, type: "withdrawal", date: "2026-03-21" },
  { id: 7, cashier: "David", amount: 9000, type: "deposit", date: "2026-03-20" },
];

export default function CashierReport() {
  const [filter, setFilter] = useState<"daily" | "weekly" | "monthly">("daily");
  const [cashierFilter, setCashierFilter] = useState("all");

  // 🧠 FILTER LOGIC
  const filteredData = useMemo(() => {
    const now = new Date();

    return mockData.filter((t) => {
      const txDate = new Date(t.date);

      let matchesTime = true;

      if (filter === "daily") {
        matchesTime = txDate.toDateString() === now.toDateString();
      }

      if (filter === "weekly") {
        const weekAgo = new Date();
        weekAgo.setDate(now.getDate() - 7);
        matchesTime = txDate >= weekAgo && txDate <= now;
      }

      if (filter === "monthly") {
        matchesTime =
          txDate.getMonth() === now.getMonth() &&
          txDate.getFullYear() === now.getFullYear();
      }

      const matchesCashier =
        cashierFilter === "all" || t.cashier === cashierFilter;

      return matchesTime && matchesCashier;
    });
  }, [filter, cashierFilter]);

  // 📊 SUMMARY
  const summary = useMemo(() => {
    let deposits = 0;
    let withdrawals = 0;

    filteredData.forEach((t) => {
      if (t.type === "deposit") deposits += t.amount;
      else withdrawals += t.amount;
    });

    return {
      deposits,
      withdrawals,
      total: deposits - withdrawals,
    };
  }, [filteredData]);

  // 📈 CHART DATA (group by date)
  const chartData = useMemo(() => {
    const grouped: any = {};

    filteredData.forEach((t) => {
      if (!grouped[t.date]) {
        grouped[t.date] = { date: t.date, deposit: 0, withdrawal: 0 };
      }

      grouped[t.date][t.type] += t.amount;
    });

    return Object.values(grouped);
  }, [filteredData]);

  const cashiers = ["all", ...new Set(mockData.map((t) => t.cashier))];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* HEADER */}
      <div className="flex flex-col lg:flex-row justify-between gap-4 mb-6">
        <h1 className="text-xl font-semibold">Cashier Reports</h1>

        <div className="flex flex-wrap gap-2">
          {/* TIME FILTER */}
          {["daily", "weekly", "monthly"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`px-4 py-2 rounded-xl text-sm ${
                filter === f
                  ? "bg-blue-600 text-white"
                  : "bg-white border"
              }`}
            >
              {f}
            </button>
          ))}

          {/* CASHIER FILTER */}
          <select
            value={cashierFilter}
            onChange={(e) => setCashierFilter(e.target.value)}
            className="px-4 py-2 rounded-xl border bg-white text-sm"
          >
            {cashiers.map((c) => (
              <option key={c} value={c}>
                {c === "all" ? "All Cashiers" : c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <Card title="Total Deposits" value={summary.deposits} />
        <Card title="Total Withdrawals" value={summary.withdrawals} />
        <Card title="Net Balance" value={summary.total} />
      </div>

      {/* CHART */}
      <div className="bg-white p-4 rounded-2xl shadow border mb-6 h-72">
        <h3 className="text-sm font-medium mb-3">Cash Flow Overview</h3>

        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="deposit" fill="#22c55e" />
            <Bar dataKey="withdrawal" fill="#ef4444" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow border overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="px-6 py-3 text-left">Cashier</th>
              <th className="px-6 py-3 text-left">Type</th>
              <th className="px-6 py-3 text-left">Amount</th>
              <th className="px-6 py-3 text-left">Date</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.map((t) => (
              <tr key={t.id} className="border-t hover:bg-gray-50">
                <td className="px-6 py-4">{t.cashier}</td>

                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      t.type === "deposit"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {t.type}
                  </span>
                </td>

                <td className="px-6 py-4 font-medium">
                  ₦{t.amount.toLocaleString()}
                </td>

                <td className="px-6 py-4 text-gray-500">
                  {t.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// 💳 CARD
function Card({ title, value }: { title: string; value: number }) {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm border">
      <p className="text-gray-500 text-sm">{title}</p>
      <h2 className="text-xl font-semibold mt-2">
        ₦{value.toLocaleString()}
      </h2>
    </div>
  );
}