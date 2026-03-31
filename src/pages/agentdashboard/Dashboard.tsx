
import {Wallet} from "lucide-react"
import { Link } from "react-router-dom";
import StatsCard from "../../components/StatsCard"
import TransactionTable from "../../components/TransactionTable";
import TransactionChart from "../../components/TransactionChart";


export default function Dashboard() {


  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-6 space-y-6">
        {/* STATS */}
        <div className="grid grid-col-1 md:grid-cols-4  gap-5 ">
          <StatsCard title=" Withdrawal" value="$15,200" icon={<Wallet  size={18}/>} />
          <StatsCard title=" Deposits" value="$8,450" icon={<Wallet  size={18}/>}/>
          <StatsCard title=" Loan" value="$5,120" icon={<Wallet size={18}/>}/>
          <StatsCard title=" Returns" value="$20,300" icon={<Wallet  size={18}/>} />
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
              <Link to="/404">
                <button
                  
                  className="w-full bg-blue-600 text-white py-4 mt-3 rounded-xl font-bold"
                >
                  Add Customer
                </button>
              </Link>
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
      {/* Footer */}
        <div className="text-center text-xs text-gray-400 pt-6 pb-6">
          FairColors MFB v1.0.0
        </div>
    </div>
  );
}
