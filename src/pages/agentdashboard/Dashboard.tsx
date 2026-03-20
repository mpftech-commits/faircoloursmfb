// // import DashboardLayout from "../layout/DashboardLayout";
// import StatusCard from "../../components/StatusCard";
// import OverviewCard from "../../components/OverviewCard";
// import ActionItem from "../../components/ActionItem";
// import {
//   Plus,
//   Home,
//   AlertTriangle,
//   CheckCircle,
//   LineChart,
//   Diamond,
//   Clock,
// } from "lucide-react";
// import { Link } from "react-router-dom";

// export default function Dashboard() {
//   return (
//     <div className="space-y-4 ">
//       <div className="grid md:grid-cols-4 grid-cols-1 gap-3 border-b border-b-gray-300 pb-5  ">
//         <StatusCard
//           icon={<CheckCircle size={18} />}
//           title="Total Savings"
//           subtitle="₦ 5,000,000"
//           className="bg-green-600 text-white rounded-full px-3 p-1"
//         />
//         <StatusCard
//           icon={<Diamond size={18} />}
//           title="Total Deposit"
//           subtitle="₦ 2,000,000"
//           className="underline text-green-600"
//         />
//         <StatusCard
//           icon={<LineChart size={18} />}
//           title="Total Withdrawals"
//           subtitle="₦ 300,000"
//         />
//         <StatusCard
//           icon={<LineChart size={18} />}
//           title="Total Loans"
//           subtitle="₦ 800,000"
//         />
//       </div>

//       <div className="pt-6">
//         <h3 className="text-sm font-semibold text-gray-600 mb-3">
//           General Overview
//         </h3>

//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//           <OverviewCard
//             value={12}
//             label="Active Listings"
//             icon={<Home />}
//             className="bg-green-50 text-green-700 w-fit p-3 rounded-lg"
//           />
//           <OverviewCard
//             value={3}
//             label="Pending Review"
//             icon={<Clock />}
//             className="bg-amber-50 text-amber-700 w-fit p-3 rounded-lg"
//           />
//           <OverviewCard
//             value={3}
//             label="Rented"
//             icon={<CheckCircle />}
//             className="bg-blue-50 text-blue-700 w-fit p-3 rounded-lg"
//           />
//           <OverviewCard
//             value={1}
//             label="Reports"
//             icon={<AlertTriangle />}
//             className="bg-red-50 text-red-700 w-fit p-3 rounded-lg"
//           />
//         </div>
//       </div>

//       <div className="pt-6 space-y-3">
//         <h3 className="text-sm font-semibold text-gray-600">Quick Actions</h3>

//         <Link to="">
//           <ActionItem
//             icon={Plus}
//             label="Add New Listing"
//             className="bg-green-700 text-white p-2 rounded-full"
//           />
//         </Link>
//         <Link to="">
//           <ActionItem
//             icon={Home}
//             label="Manage Listings"
//             className="bg-green-500 text-white p-2 rounded-full"
//           />
//         </Link>
//         <Link to="">
//           <ActionItem
//             icon={AlertTriangle}
//             label="View Reports"
//             className="bg-amber-600 text-white p-2 rounded-full"
//           />
//         </Link>
//       </div>
//     </div>
//   );
// }




// ================== pages/Dashboard.tsx ==================
import { useState } from "react";
import jsPDF from "jspdf";
import { Card } from "../../components/dashboard_component/Card";
import { Table } from "../../components/dashboard_component/Table";
import { Button } from "../../components/dashboard_component/Button";
import { Chart } from "../../components/dashboard_component/Chart";

// TYPES
type Customer = { id: number; name: string; status: "pending" | "approved" };
type Loan = { id: number; name: string; amount: number; status: "pending" | "approved" };
type Transaction = { id: number; type: string; amount: number; date: string };

// MOCK DATA
const customersData: Customer[] = [
  { id: 1, name: "John Doe", status: "pending" },
];

const loansData: Loan[] = [
  { id: 1, name: "Jane Smith", amount: 50000, status: "pending" },
];

const transactionsData: Transaction[] = [
  { id: 1, type: "Deposit", amount: 20000, date: "2026-03-18" },
  { id: 2, type: "Withdrawal", amount: 10000, date: "2026-03-19" },
  { id: 3, type: "Deposit", amount: 50000, date: "2026-03-22" },
  { id: 4, type: "withdrawal", amount: 4000, date: "2026-03-22" },
  { id: 5, type: "Deposit", amount: 7000, date: "2026-03-22" },
  { id: 6, type: "withdrawal", amount: 90000, date: "2026-03-22" },
];

export default function Dashboard() {
  const [tab, setTab] = useState("dashboard");
  const [customers, setCustomers] = useState(customersData);
  const [loans, setLoans] = useState(loansData);

  const approveCustomer = (id: number) => {
    setCustomers((prev) => prev.map((c) => (c.id === id ? { ...c, status: "approved" } : c)));
  };

  const approveLoan = (id: number) => {
    setLoans((prev) => prev.map((l) => (l.id === id ? { ...l, status: "approved" } : l)));
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Transaction Report", 20, 20);
    transactionsData.forEach((t, i) => {
      doc.text(`${t.type} - ₦${t.amount} - ${t.date}`, 20, 30 + i * 10);
    });
    doc.save("report.pdf");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* NAV */}
      <div className="flex gap-3 mb-6 flex-wrap">
        {["dashboard", "customers", "loans", "transactions", "reports"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-full capitalize ${tab === t ? "bg-blue-600 text-white" : "bg-white"}`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* DASHBOARD */}
      {tab === "dashboard" && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card title="Savings" value={300000} />
            <Card title="Deposits" value={800000} />
            <Card title="Withdrawals" value={500000} />
            <Card title="Loans" value={200000} />
          </div>
          <Chart data={transactionsData} />
        </>
      )}

      {/* CUSTOMERS */}
      {tab === "customers" && (
        <Table headers={["Name", "Status", "Action"]}>
          {customers.map((c) => (
            <tr key={c.id} className="border-t">
              <td className="p-3">{c.name}</td>
              <td className="p-3">{c.status}</td>
              <td className="p-3">
                {c.status === "pending" && (
                  <Button onClick={() => approveCustomer(c.id)}>Approve</Button>
                )}
              </td>
            </tr>
          ))}
        </Table>
      )}

      {/* LOANS */}
      {tab === "loans" && (
        <Table headers={["Name", "Amount", "Status", "Action"]}>
          {loans.map((l) => (
            <tr key={l.id} className="border-t">
              <td className="p-3">{l.name}</td>
              <td className="p-3">₦{l.amount}</td>
              <td className="p-3">{l.status}</td>
              <td className="p-3">
                {l.status === "pending" && (
                  <Button onClick={() => approveLoan(l.id)}>Approve</Button>
                )}
              </td>
            </tr>
          ))}
        </Table>
      )}

      {/* TRANSACTIONS */}
      {tab === "transactions" && (
        <Table headers={["Type", "Amount", "Date"]}>
          {transactionsData.map((t) => (
            <tr key={t.id} className="border-t">
              <td className="p-3">{t.type}</td>
              <td className="p-3">₦{t.amount}</td>
              <td className="p-3">{t.date}</td>
            </tr>
          ))}
        </Table>
      )}

      {/* REPORT */}
      {tab === "reports" && (
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl mb-4">Generate Report</h2>
          <Button onClick={generatePDF}>Download PDF</Button>
        </div>
      )}
    </div>
  );
}

