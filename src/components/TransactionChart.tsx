import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";
import { GetTransaction } from "../services/Axios";

type ChartRow = {
  name: string;
  deposits: number;
  withdrawals: number;
  payments: number;
};

// -------------------- CHART --------------------
const TransactionChart = () => {
  const [chartData, setChartData] = useState<ChartRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAndAggregate = async () => {
      setLoading(true);
      setError(null);
      try {
        // fetch a reasonable number of recent transactions
        const res = await GetTransaction(1, 200);
        const transactions = res.data || [];

        // prepare last 7 days map (keys = yyyy-mm-dd)
        const daysMap: Record<string, ChartRow> = {};
        const labels: string[] = [];
        const today = new Date();
        for (let i = 6; i >= 0; i--) {
          const d = new Date(today);
          d.setDate(today.getDate() - i);
          const key = d.toISOString().slice(0, 10);
          const name = d.toLocaleDateString("en-US", { weekday: "short" });
          daysMap[key] = { name, deposits: 0, withdrawals: 0, payments: 0 };
          labels.push(key);
        }

        // aggregate amounts per day and type
        transactions.forEach((t: any) => {
          const dateKey = new Date(t.createdAt).toISOString().slice(0, 10);
          if (!daysMap[dateKey]) return; // ignore older/newer than last 7 days
          const amount = Number(t.amount) || 0;
          if (t.type === "deposit") daysMap[dateKey].deposits += amount;
          else if (t.type === "withdrawal") daysMap[dateKey].withdrawals += amount;
          else daysMap[dateKey].payments += amount;
        });

        const data = labels.map((k) => daysMap[k]);
        setChartData(data);
      } catch (err: any) {
        console.error("Error loading transactions for chart:", err);
        setError(err?.response?.data?.message || err?.message || "Failed to load chart data");
      } finally {
        setLoading(false);
      }
    };

    fetchAndAggregate();
  }, []);

  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <h3 className="font-semibold mb-4 text-[10px]">Daily Cashier Transactions</h3>

      {loading && <p className="text-[8px] text-gray-500">Loading chart...</p>}
      {error && <p className="text-[8px] text-red-500">{error}</p>}

      {!loading && !error && (
        <ResponsiveContainer width="100%" height={250} className="text-[8px]">
          <BarChart data={chartData} >
            <XAxis dataKey="name"  className="text-[8px]"/>
            <YAxis  className="text-[8px]"/>
            <Tooltip formatter={(value: any) => new Intl.NumberFormat().format(Number(value))} />
            <Bar dataKey="deposits" fill="#3B82F6" />
            <Bar dataKey="withdrawals" fill="#EF4444" />
            <Bar dataKey="payments" fill="#10B981" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};
export default TransactionChart;