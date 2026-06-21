import { useState, useEffect } from "react";
// import { LoanStatus, loans as mockLoans } from "../../data/Types";
import StatsCard from "../../components/loan_component/StatsCard";
import LoanTable from "../../components/loan_component/LoanTable";
import LoanFilters from "../../components/loan_component/Filter";
import { getLoanStats } from "../../services/Axios";

type LoanFilterStatus = "total" | "pending" | "approved" | "rejected" | "disbursed";

type loanStatsData = {
  stats: {
    total: number;
    totalAmount?: number;
    byStatus: {
      approved?: number;
      pending?: number;
      rejected?: number;
      disbursed?: number;
      completed?: number;
      [key: string]: number | undefined;
    };
  };
};

export default function LoanApproval() {
  // const [loans] = useState(mockLoans);
  const [Data, setData] = useState<loanStatsData>({ stats: { total: 0, byStatus: { approved: 0, pending: 0, rejected: 0, disbursed: 0 } } });
  const [statusFilter, setStatusFilter] = useState<LoanFilterStatus>("total");
  // const [filter, setFilter] = useState("daily");

  const LoanStats = async () => {
    try {
      const res = await getLoanStats();

      setData({
        stats:
          res.stats || { total: 0, byStatus: { approved: 0, pending: 0, rejected: 0, disbursed: 0 } },
      });
      console.log("loan stats data:", res.stats?.byStatus);
    } catch (err: any) {
      // console.error("Error fetching loan stats:", err);
    }
  };

  useEffect(() => {
    // console.log("Fetching loan with:");
    LoanStats();
  }, []);

  return (
    <div className=" space-y-6  min-h-screen p-3">

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-xs mt-3 max-w-md p-1 rounded-sm">
        <StatsCard title="Total Loans" value={Data.stats?.total || 0}
          className="bg-gray-50 border-gray-300 text-gray-500"
        />
        <StatsCard
          title="Approved"
          value={Data.stats?.byStatus?.approved || 0}
          className="bg-green-50 border-green-300 text-green-500"
        />
        <StatsCard
          title="Disbursed"
          value={Data.stats?.byStatus?.disbursed || 0}
          className="bg-blue-50 border-blue-300 text-blue-500"
        />
        <StatsCard
          title="Pending"
          value={Data.stats?.byStatus?.pending || 0}
          className="bg-yellow-50 border-yellow-300 text-yellow-500"
        />
        <StatsCard
          title="Rejected"
          value={Data.stats?.byStatus?.rejected || 0}
          className="bg-red-50 border-red-300 text-red-500"
        />
      </div>

      {/* Filters */}
      <LoanFilters selectedFilter={statusFilter} onFilterChange={setStatusFilter} />

      {/* Table */}
      <LoanTable statusFilter={statusFilter} />

      {/* Modal */}
      {/* <LoanDetailsModal
        loan={selectedLoan}
        onClose={() => setSelectedLoan(null)}
        onApprove={approveLoan}
        onReject={rejectLoan}
      /> */}
    </div>
  );
}