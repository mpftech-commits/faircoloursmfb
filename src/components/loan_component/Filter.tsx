type LoanFilterStatus = "total" | "pending" | "approved" | "rejected" | "disbursed";

interface LoanFiltersProps {
  selectedFilter: LoanFilterStatus;
  onFilterChange: (filter: LoanFilterStatus) => void;
}

const FILTERS: { label: string; value: LoanFilterStatus }[] = [
  { label: "Total", value: "total" },
  { label: "Pending", value: "pending" },
  { label: "Approved", value: "approved" },
  { label: "Disbursed", value: "disbursed" },
  { label: "Rejected", value: "rejected" },
];

export default function LoanFilters({ selectedFilter, onFilterChange }: LoanFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {FILTERS.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onFilterChange(filter.value)}
          className={`px-3 py-1 rounded-lg text-[10px] font-medium capitalize transition ${
            selectedFilter === filter.value
              ? "bg-blue-800 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
