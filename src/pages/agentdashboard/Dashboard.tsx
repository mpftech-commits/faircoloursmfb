import { Link } from "react-router-dom";
import StatsCard from "../../components/StatsCard";
import TransactionTable from "../../components/TransactionTable";
import TransactionChart from "../../components/TransactionChart";
import { useEffect, useState } from "react";
import { getDashboardStats } from "../../services/Axios";

export default function Dashboard() {
  const [filter, setFilter] = useState("daily");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const fetchData = async () => {
      try {
        setLoading(true);
  
        const res = await getDashboardStats({
          filter,
          startDate,
          endDate,
        });
  
        setData(res.cards);
      } catch (err) {
        console.error("Error fetching dashboard:", err);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      if (filter === "custom" && (!startDate || !endDate)) return;
      fetchData();
    }, [filter, startDate, endDate]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className=" space-y-6">
        {/* STATS */}

        <div>
          {/* FILTER CONTROLS */}
          <div className="flex gap-2 mb-4 flex-wrap">
            {["daily", "weekly", "monthly", "quarterly", "custom"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1 rounded-full text-xs capitalize ${
                  filter === f ? "bg-blue-600 text-white" : "bg-gray-200"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* CUSTOM DATE */}
          {filter === "custom" && (
            <div className="flex gap-2 mb-4">
              <input
                type="date"
                onChange={(e) => setStartDate(e.target.value)}
              />
              <input type="date" onChange={(e) => setEndDate(e.target.value)} />
            </div>
          )}

          {/* STATS CARDS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatsCard
              title="Deposits"
              value={data?.deposits}
              loading={loading}
            />
            <StatsCard
              title="Withdrawals"
              value={data?.withdrawals}
              loading={loading}
            />
            <StatsCard title="Loans" value={data?.loans} loading={loading} />
            <StatsCard
              title="Customers"
              value={data?.customers}
              loading={loading}
            />
          </div>
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
              <Link to="/create-customer">
                <button className="w-full bg-blue-600 text-white py-4 mt-3 rounded-xl font-bold">
                  Add Customer
                </button>
              </Link>
            </div>

            <div className="bg-white p-5 rounded-lg drop-shadow-md">
              <h1 className="border-b border-gray-300 pb-3 font-bold">
                Add New Cashiers
              </h1>
              <Link to="/cashier">
                <button className="w-full bg-green-700 text-white py-4 font-bold rounded-xl  mt-3 ">
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
      {/* Footer */}
      <div className="text-center text-xs text-gray-400 pt-6 pb-6">
        FairColors MFB v1.0.0
      </div>
    </div>
  );
}
