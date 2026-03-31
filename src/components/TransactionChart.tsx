import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const chartData = [
  { name: "Mon", deposits: 1200, withdrawals: 800, payments: 200 },
  { name: "Tue", deposits: 900, withdrawals: 600, payments: 150 },
  { name: "Wed", deposits: 1400, withdrawals: 900, payments: 300 },
  { name: "Thu", deposits: 800, withdrawals: 500, payments: 100 },
];

// -------------------- CHART --------------------
const TransactionChart = () => (
  <div className="bg-white p-6 rounded-2xl shadow">
    <h3 className="font-semibold mb-4">Daily Cashier Transactions</h3>

    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={chartData}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="deposits" fill="#3B82F6" />
        <Bar dataKey="withdrawals" fill="#EF4444" />
        <Bar dataKey="payments" fill="#10B981" />
      </BarChart>
    </ResponsiveContainer>
  </div>
);
export default TransactionChart;