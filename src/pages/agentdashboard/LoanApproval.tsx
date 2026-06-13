import { useState } from "react";
import { loans as mockLoans } from "../../data/Types";
import StatsCard from "../../components/loan_component/StatsCard";
import LoanTable from "../../components/loan_component/LoanTable";
import LoanFilters from "../../components/loan_component/Filter";

export default function LoanApproval() {
  const [loans] = useState(mockLoans);

  return (
    <div className=" space-y-6  min-h-screen p-3">

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs mt-3">
        <StatsCard title="Total Loans" value={`${loans.length}`} />
        <StatsCard
          title="Approved"
          value={`${loans.filter(l => l.status === "approved").length}`}
        />
        <StatsCard
          title="Pending"
          value={`${loans.filter(l => l.status === "pending").length}`}
        />
        <StatsCard
          title="Rejected"
          value={`${loans.filter(l => l.status === "rejected").length}`}
        />
      </div>

      {/* Filters */}
      <LoanFilters  />

      {/* Table */}
      <LoanTable  />

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