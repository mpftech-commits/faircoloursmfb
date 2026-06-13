import type { ReportFilter } from "../services/ReportService";

interface Props {
  selected: ReportFilter;
  onChange: (filter: ReportFilter) => void;
}

const filters: ReportFilter[] = ["weekly", "monthly", "quarterly", "yearly"];

export default function ReportFilters({ selected, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((f) => (
        <button
          key={f}
          onClick={() => onChange(f)}
          className={`px-3 py-1.5 rounded-lg text-[10px] capitalize transition
            ${
              selected === f
                ? "bg-blue-700 text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
        >
          {f}
        </button>
      ))}
    </div>
  );
}
