import { useEffect, useState } from "react";
import { GetTransaction } from "../services/Axios";
import { Loader, AlertTriangle, ArrowLeft, ArrowRight } from "lucide-react";

// const transactions = [
//   { id: 1, name: "John Doe", type: "Deposit", amount: "500", date: "Today" },
//   {
//     id: 2,
//     name: "Jane Smith",
//     type: "Withdrawal",
//     amount: "200",
//     date: "Today",
//   },
//   { id: 3, name: "Michael", type: "Payment", amount: "150", date: "Today" },
// ];
// interface Customer {
//   _id: string;
//   fullName: string;
//   phone: string;
// }

interface Props {
  type: string;
  amount: number;
  date: string;
  createdAt: string;
  customerId:{
     _id: string;
  fullName: string;
  phone: string;
  }
}

function TransactionTable() {
  const [transactions, setTransactions] = useState<Props[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await GetTransaction(1, 10);
        console.log("Fetched transactions:", response);
        setTransactions(response.data);
      } catch (error: any) {
        console.error("Error fetching transactions:", error);
        setError(error.response?.data?.message || "something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, []);

  return (
    <div className="bg-white p-6 rounded-2xl shadow w-full overflow-x-auto">
      <h3 className="font-semibold text-lg mb-4">Transaction History</h3>

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
        <table className="w-full text-sm border-separate border-spacing-y-2">
          {/* HEADER */}
          <thead>
            <tr className="text-left text-gray-500 text-xs uppercase ">
              <th className="px-6 py-2">Full Name</th>
              <th className="px-6 py-2">Transaction Type</th>
              <th className="px-6 py-2">Phone Number</th>
              <th className="px-6 py-2">Amount</th>
              <th className="px-6 py-2">Transaction Date</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {transactions.map((t) => (
              <tr
                key={t.customerId?._id}
                className="bg-gray-50 hover:bg-gray-100 transition rounded-xl"
              >
                <td className="px-6 py-4 font-medium text-gray-700">
                  {t.customerId?.fullName}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      t.type === "deposit"
                        ? "bg-green-100 text-green-600"
                        : t.type === "withdrawal"
                          ? "bg-red-100 text-red-600"
                          : "bg-blue-100 text-blue-600"
                    }`}
                  >
                    {t.type}
                  </span>
                </td>

                <td className="px-6 py-4 font-semibold text-gray-800">
                  {t.customerId?.phone}
                </td>
                <td className="px-6 py-4 font-semibold text-gray-800">
                  ₦{t.amount.toLocaleString()}
                </td>

                <td className="px-6 py-4 text-gray-500">{t.createdAt}</td>
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
export default TransactionTable;
