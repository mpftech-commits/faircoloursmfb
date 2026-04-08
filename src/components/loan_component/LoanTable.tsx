import { useState, useEffect } from "react";
import RiskBadge from "./RiskBadge";
import { GetLoans } from "../../services/Axios";
import { Loader, AlertTriangle, ArrowLeft, ArrowRight, Eye } from "lucide-react";

// interface Props {
//   onSelect?: (loan: Loan) => void;
// }
 type LoanStatus = "pending" | "approved" | "rejected";
 interface Loan {
   _id: string;
   name: string;
   amount: number;
   duration: number;
   status: LoanStatus;
   creditScore: number;
   interest: number;
   date: string;
   customerId: {
     _id: string;
     fullName: string;
     phone: string;
   };
 }

export default function LoanTable() {
  const [loansState, setLoansState] = useState<Loan[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response = await GetLoans(1, 10);
        console.log(response, "loan fetched successfully");
        setLoansState(response.data);
      } catch (err: any) {
        console.error("Error fetching loans:", err);
        setError("");
      } finally {
        setLoading(false);
      }
    };
    fetchLoans();
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-sm border overflow-x-auto border-gray-300">
      {loading && (
        <p className="flex p-5 items-center gap-2 font-semibold text-blue-600">
          <Loader size={18} className="animate-spin" /> loading...
        </p>
      )}
      {/* when there is an error */}
      {error && (
        <p className="text-red-500 flex p-5 items-center gap-2 font-semibold">
          <AlertTriangle size={18} /> {error}
        </p>
      )}
      {!loading && !error && (
        <table className="w-full">
          <thead className="bg-gray-50 text-center text-xs">
            <tr>
              <th className="p-3 text-xs">Name</th>
              <th>Amount</th>
              <th>Intrest</th>
              <th>Duration</th>
              <th>Risk</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {loansState.map((loan) => (
              <tr
                key={loan._id}
                // onClick={() => onSelect(loan)}
                className="border-t border-gray-300 cursor-pointer hover:bg-gray-50 text-xs"
              >
                <td className="p-3">{loan.customerId?.fullName}</td>
                <td>₦{loan.amount.toLocaleString()}</td>
                <td>₦{loan.interest.toLocaleString()}</td>
                <td>{loan.duration} months</td>
                <td>
                  <RiskBadge score={loan.creditScore} />
                </td>
                <td className="capitalize">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      loan.status === "approved"
                        ? "bg-green-100 text-green-600"
                        : loan.status === "rejected"
                          ? "bg-red-100 text-red-600"
                          : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {loan.status}
                  </span>
                </td>
                <td>
                  <button className="bg-blue-100 text-blue-700 hover:bg-blue-200 py-1 px-3 rounded-full text-xs font-medium flex items-center gap-1">
                    <Eye size={16} /> View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className="flex justify-between items-center p-3 mt-4">
        <button
          className="flex gap-2 items-center bg-blue-100 px-3 rounded-full font-medium cursor-pointer text-blue-700 py-1"
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          <ArrowLeft size={18} /> Prev
        </button>

        <button
          className="flex gap-2 items-center bg-blue-100 px-3 py-1 cursor-pointer rounded-full font-medium text-blue-700"
          onClick={() => setPage((prev) => prev + 1)}
        >
          {" "}
          Next <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}