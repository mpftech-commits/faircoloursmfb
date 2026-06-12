import { Link } from "react-router-dom";
import StatsCard from "../../components/StatsCard";
import TransactionTable from "../../components/TransactionTable";
import TransactionChart from "../../components/TransactionChart";
import { useEffect, useState } from "react";
import { getDashboardStats } from "../../services/Axios";
import { Banknote, CreditCardIcon, User, Users } from "lucide-react";

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
  
        setData(res.data);
        console.log("Dashboard data:", res.data);
      } catch (err: any) {
        console.error("Error fetching dashboard:", err);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      console.log("Fetching dashboard with:", { filter, startDate, endDate });
      if (filter === "custom" && (!startDate || !endDate)) return;
      fetchData();
    }, [filter, startDate, endDate]);

  return (
    <div className="min-h-screen ">
      <div className=" space-y-6">
        {/* STATS */}

        <div>
          {/* FILTER CONTROLS */}
          <div className="flex gap-2 mb-4 flex-wrap">
            {["daily", "weekly", "monthly", "quarterly", "custom"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1 rounded-full text-[10px] capitalize ${
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
                className="text-[10px]"
              />
              <input type="date" onChange={(e) => setEndDate(e.target.value)}  className="text-[10px]"/>
            </div>
          )}

          {/* STATS CARDS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatsCard
              icon={<Banknote size={12} />}
              title="Deposits"
              value={data?.cards.deposits?.toLocaleString()}
              loading={loading}
            />
            <StatsCard
              icon={<CreditCardIcon size={12} />}
              title="Withdrawals"
              value={data?.cards.withdrawals?.toLocaleString()}
              loading={loading}
            />
            <StatsCard
              icon={<User size={12} />}
              title="Loans"
              value={data?.cards.loans?.toLocaleString()}
              loading={loading} />
            <StatsCard
              icon={<Users size={12} />}
              title="Customers"
              value={data?.cards.customers}
              loading={loading}
            />
          </div>
        </div>

        {/* CHART + ACTIONS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <TransactionChart />
          </div>

          <div className="space-y-4 flex flex-col md:flex-row gap-3 w-full">
            <div className="bg-white p-5 rounded-lg mt-1 drop-shadow-md lg:w-1/2 w-full  ">
              <h1 className="border-b border-gray-200 pb-3 font-bold text-xs">
                Add New Customer
              </h1>
              <Link to="/create-customer">
                <button className="w-fit bg-blue-600 text-white py-2.5 mt-3 px-6 rounded-xl font-bold text-[10px] cursor-pointer">
                  Add Customer
                </button>
              </Link>
            </div>

            <div className="bg-white p-5 rounded-lg mt-1 drop-shadow-md lg:w-1/2  w-full">
              <h1 className="border-b border-gray-200 pb-3 font-bold text-xs">
                Add New Cashiers
              </h1>
              <Link to="/cashier">
                <button className="w-fit bg-green-700 text-white py-2.5 px-6 font-bold rounded-xl text-[10px]  mt-3 cursor-pointer ">
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
      <div className="text-center text-[10px] text-gray-400 py-3">
        FairColors MFB v1.0.0
      </div>
    </div>
  );
}
