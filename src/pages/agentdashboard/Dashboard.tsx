import { Card } from "../../components/dashboard_component/Card";
import { Chart } from "../../components/dashboard_component/Chart";

type Transaction = { id: number; type: string; amount: number; date: string };



const transactionsData: Transaction[] = [
  { id: 1, type: "Deposit", amount: 20000, date: "2026-03-18" },
  { id: 2, type: "Withdrawal", amount: 10000, date: "2026-03-19" },
  { id: 3, type: "Deposit", amount: 50000, date: "2026-03-22" },
  { id: 4, type: "withdrawal", amount: 4000, date: "2026-03-22" },
  { id: 5, type: "Deposit", amount: 7000, date: "2026-03-22" },
  { id: 6, type: "withdrawal", amount: 90000, date: "2026-03-22" },
];

export default function Dashboard() {
 
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* DASHBOARD */}
     
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card title="Total Savings" value={300000} />
            <Card title=" Total Deposits" value={800000} />
            <Card title="Total Withdrawals" value={500000} />
            <Card title="Total Loans" value={200000} />
          </div>
          <Chart data={transactionsData} />
        
     
    </div>
  );
}
