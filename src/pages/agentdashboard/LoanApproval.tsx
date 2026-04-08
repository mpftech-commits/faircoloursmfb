import { useState } from "react";
import { loans as mockLoans } from "../../data/Types";
import StatsCard from "../../components/loan_component/StatsCard";
import LoanTable from "../../components/loan_component/LoanTable";
import LoanFilters from "../../components/loan_component/Filter";
import LoanDetailsModal from "../../components/loan_component/LoanDetails";
import type { Loan } from "../../data/Types";

export default function LoanApproval() {
  const [loans, setLoans] = useState(mockLoans);
 
  const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null);


  const approveLoan = (id: string) => {
    setLoans((prev) =>
      prev.map((l) =>
        l.id === id ? { ...l, status: "approved" } : l
      )
    );
    setSelectedLoan(null);
  };

  const rejectLoan = (id: string) => {
    setLoans((prev) =>
      prev.map((l) =>
        l.id === id ? { ...l, status: "rejected" } : l
      )
    );
    setSelectedLoan(null);
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
      <LoanTable onSelect={setSelectedLoan} />

      {/* Modal */}
      <LoanDetailsModal
        loan={selectedLoan}
        onClose={() => setSelectedLoan(null)}
        onApprove={approveLoan}
        onReject={rejectLoan}
      />
    </div>
  );
}