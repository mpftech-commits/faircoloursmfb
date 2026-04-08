// interface Props {
//   setFilter: (value: string) => void;
// }

export default function () {
  return (
    <div className="flex gap-2">
      {["All", "Pending", "Approved", "Rejected"].map((f) => (
        <button
          key={f}
        
          className="px-3 py-1 rounded-lg bg-gray-100 hover:bg-gray-200"
        >
          {f}
        </button>
      ))}
    </div>
  );
}