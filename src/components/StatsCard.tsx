type Props = {
  title: string;
  value: number;
  loading: boolean;
};

function StatsCard({ title, value, loading }: Props) {
  return (
    <div className="bg-white rounded-xl shadow p-4">
      <p className="text-gray-500 text-sm">{title}</p>

      <h2 className="text-xl font-semibold text-blue-700 mt-2">
        {loading ? "Loading..." : (value ?? "--")}
      </h2>
    </div>
  );
}

 export default StatsCard;



// import { useEffect, useState } from "react";
// import StatsCard from "./StatsCard";
// import { getDashboardStats } from "./services/dashboard";

// export default function Dashboard() {
//   const [filter, setFilter] = useState("weekly");
//   const [data, setData] = useState<any>(null);
//   const [loading, setLoading] = useState(false);

//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");

//   const fetchData = async () => {
//     try {
//       setLoading(true);

//       const res = await getDashboardStats({
//         filter,
//         startDate,
//         endDate,
//       });

//       setData(res.cards);
//     } catch (err) {
//       console.error("Error fetching dashboard:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (filter === "custom" && (!startDate || !endDate)) return;
//     fetchData();
//   }, [filter, startDate, endDate]);

//   return (
//     <div>
//       {/* FILTER BUTTONS */}
//       <div className="flex gap-2 mb-4 flex-wrap">
//         {["daily", "weekly", "monthly", "quarterly", "custom"].map((f) => (
//           <button
//             key={f}
//             onClick={() => setFilter(f)}
//             className={`px-3 py-1 rounded-full text-xs capitalize ${
//               filter === f ? "bg-blue-600 text-white" : "bg-gray-200"
//             }`}
//           >
//             {f}
//           </button>
//         ))}
//       </div>

//       {/* CUSTOM DATE */}
//       {filter === "custom" && (
//         <div className="flex gap-2 mb-4">
//           <input type="date" onChange={(e) => setStartDate(e.target.value)} />
//           <input type="date" onChange={(e) => setEndDate(e.target.value)} />
//         </div>
//       )}

//       {/* CARDS */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//         <StatsCard title="Deposits" value={data?.deposits} loading={loading} />
//         <StatsCard
//           title="Withdrawals"
//           value={data?.withdrawals}
//           loading={loading}
//         />
//         <StatsCard title="Loans" value={data?.loans} loading={loading} />
//         <StatsCard
//           title="Customers"
//           value={data?.customers}
//           loading={loading}
//         />
//       </div>
//     </div>
//   );
// }
