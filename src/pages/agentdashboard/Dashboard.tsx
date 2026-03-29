import  { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {Wallet} from "lucide-react"
import { Link } from "react-router-dom";

// -------------------- MOCK DATA --------------------
const chartData = [
  { name: "Mon", deposits: 1200, withdrawals: 800, payments: 200 },
  { name: "Tue", deposits: 900, withdrawals: 600, payments: 150 },
  { name: "Wed", deposits: 1400, withdrawals: 900, payments: 300 },
  { name: "Thu", deposits: 800, withdrawals: 500, payments: 100 },
];

const transactions = [
  { id: 1, name: "John Doe", type: "Deposit", amount: "500", date: "Today" },
  {
    id: 2,
    name: "Jane Smith",
    type: "Withdrawal",
    amount: "200",
    date: "Today",
  },
  { id: 3, name: "Michael", type: "Payment", amount: "150", date: "Today" },
];

const StatCard = ({ title, value, icon }: any) => (
  <div className="bg-white p-5 rounded-2xl shadow">
    <p className="text-gray-500 text-sm">{title}</p>
    <h2 className="text-2xl font-bold text-blue-900">{value}</h2>
    <div className="bg-blue-900 w-fit p-2 rounded-md mt-2 text-white ">
      {icon}
    </div>
  </div>
);

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

// -------------------- TABLE --------------------
const TransactionTable = () => (
 
<div className="bg-white p-6 rounded-2xl shadow w-full overflow-x-auto">
  <h3 className="font-semibold text-lg mb-4">Transaction History</h3>

  <table className="w-full text-sm border-separate border-spacing-y-2">
    {/* HEADER */}
    <thead>
      <tr className="text-left text-gray-500 text-xs uppercase ">
        <th className="px-6 py-2">Name</th>
        <th className="px-6 py-2">Type</th>
        <th className="px-6 py-2">Amount</th>
        <th className="px-6 py-2">Date</th>
      </tr>
    </thead>

    {/* BODY */}
    <tbody>
      {transactions.map((t) => (
        <tr
          key={t.id}
          className="bg-gray-50 hover:bg-gray-100 transition rounded-xl"
        >
          <td className="px-6 py-4 font-medium text-gray-700">
            {t.name}
          </td>

          <td className="px-6 py-4">
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                t.type === "deposit"
                  ? "bg-green-100 text-green-600"
                  : t.type === "withdrawal"
                  ? "bg-red-100 text-red-600"
                  : "bg-blue-100 text-blue-600"
              }`}
            >
              {t.type}
            </span>
          </td>

          <td className="px-6 py-4 font-semibold text-gray-800">
            ₦{(t.amount).toLocaleString()}
          </td>

          <td className="px-6 py-4 text-gray-500">
            {t.date}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>


);

// -------------------- MODAL --------------------
const Modal = ({ open, onClose, title, children }: any) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md">
        <div className="flex justify-between mb-4">
          <h2 className="font-semibold">{title}</h2>
          <button onClick={onClose}>✕</button>
        </div>
        {children}
      </div>
    </div>
  );
};

// -------------------- FORMS --------------------
const AddCustomerForm = () => (
  <div className="flex flex-col gap-3">
    <input className="border p-2 rounded" placeholder="Full Name" />
    <input className="border p-2 rounded" placeholder="Email" />
    <input className="border p-2 rounded" placeholder="Phone" />
    <button className="bg-blue-600 text-white py-2 rounded">
      Add Customer
    </button>
  </div>
);

const CreateCashierForm = () => (
  <div className="flex flex-col gap-3">
    <input className="border p-2 rounded" placeholder="Full Name" />
    <input className="border p-2 rounded" placeholder="Email" />
    <button className="bg-blue-700 text-white py-2 rounded">
      Create Cashier
    </button>
  </div>
);

// -------------------- DASHBOARD --------------------
export default function Dashboard() {
  const [openCustomer, setOpenCustomer] = useState(false);
  const [openCashier, setOpenCashier] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-6 space-y-6">
        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatCard title="Total Savings" value="$15,200" icon={<Wallet  size={18}/>} />
          <StatCard title="Total Deposits" value="$8,450" icon={<Wallet  size={18}/>}/>
          <StatCard title="Total Withdrawals" value="$5,120" icon={<Wallet size={18}/>}/>
          <StatCard title="Total Loans" value="$20,300" icon={<Wallet  size={18}/>} />
        </div>

        {/* CHART + ACTIONS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <TransactionChart />
          </div>

          <div className="space-y-4">
            <div className="bg-white p-5 rounded-lg mt-1 drop-shadow-md">
              <h1 className="border-b border-gray-300 pb-3 font-bold">
                Add New Customer
              </h1>
              <button
                onClick={() => setOpenCustomer(true)}
                className="w-full bg-blue-600 text-white py-4 mt-3 rounded-xl font-bold"
              >
                Add Customer
              </button>
            </div>

            <div className="bg-white p-5 rounded-lg drop-shadow-md">
              <h1 className="border-b border-gray-300 pb-3 font-bold">
                Add New Cashiers
              </h1>
              <Link to="/cashier">
                <button
                  className="w-full bg-green-700 text-white py-4 font-bold rounded-xl  mt-3 "
                >
                  Create Cashier
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div>
    <TransactionTable />
</div>
      </div>

      {/* MODALS */}
      <Modal
        open={openCustomer}
        onClose={() => setOpenCustomer(false)}
        title="Add Customer"
      >
        <AddCustomerForm />
      </Modal>

      <Modal
        open={openCashier}
        onClose={() => setOpenCashier(false)}
        title="Create Cashier"
      >
        <CreateCashierForm />
      </Modal>
    </div>
  );
}
