interface Props {
  setFilter: (value: string) => void;
}

export default function LoanFilters({ setFilter }: Props) {
  return (
    <div className="flex gap-2">
      {["all", "pending", "approved", "rejected"].map((f) => (
        <button
          key={f}
          onClick={() => setFilter(f)}
          className="px-3 py-1 rounded-lg bg-gray-100 hover:bg-gray-200"
        >
          {f}
        </button>
      ))}
    </div>
  );
}