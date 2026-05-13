import { useEffect, useState } from "react";
import { GetTransaction, ApproveTransaction } from "../services/Axios";
import { Loader, AlertTriangle, ArrowLeft, ArrowRight } from "lucide-react";

interface Props {
  _id: string;
  publicId: string;
  type: string;
  amount: number;
  date?: string;
  createdAt: string;
  customerId: {
    _id: string;
    fullName: string;
    phone: string;
  }
  status: "approved" | "pending" | "rejected";
}

function TransactionTable() {
  const [transactions, setTransactions] = useState<Props[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [initialLoad, setInitialLoad] = useState<boolean>(true);
  const [error, setError] = useState<string | null>("");
  const [page, setPage] = useState(1);
  const [selectedTransaction, setSelectedTransaction] = useState<Props | null>(null);
  const [approving, setApproving] = useState<boolean>(false);
  const [approveError, setApproveError] = useState<string | null>(null);
  const [approveSuccess, setApproveSuccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchTransactions = async (isInitial = false) => {
      if (isInitial) setLoading(true);
      try {
        const response = await GetTransaction(page, 10);
        console.log("Fetched transactions:", response);
        setTransactions(response.data);
        if (isInitial) setInitialLoad(false);
      } catch (error: any) {
        console.error("Error fetching transactions:", error);
        setError(error.response?.data?.message || "something went wrong");
        if (isInitial) setInitialLoad(false);
      } finally {
        if (isInitial) setLoading(false);
      }
    };
    fetchTransactions(true);

    // Set up polling for real-time updates
    const intervalId = setInterval(() => fetchTransactions(false), 10000); // Poll every 10 seconds

    // Cleanup interval on unmount or page change
    return () => clearInterval(intervalId);
  }, [page]);

  const openTransactionModal = (transaction: Props) => {
    setSelectedTransaction(transaction);
    setApproveError(null);
    setApproveSuccess(null);
  };

  const closeTransactionModal = () => {
    setSelectedTransaction(null);
    setApproving(false);
    setApproveError(null);
    setApproveSuccess(null);
  };

  const handleApprove = async () => {
    if (!selectedTransaction) return;

    setApproving(true);
    setApproveError(null);
    setApproveSuccess(null);

    try {
      await ApproveTransaction(selectedTransaction.publicId);
      const updatedTransaction = { ...selectedTransaction, status: "approved" as const };
      setSelectedTransaction(updatedTransaction);
      setTransactions((prev) =>
        prev.map((tx) => (tx.publicId === selectedTransaction.publicId ? updatedTransaction : tx)),
      );
      setApproveSuccess("Transaction approved successfully.");
    } catch (error: any) {
      setApproveError(error.response?.data?.message || error.message || "Unable to approve transaction");
      console.log("Error approving transaction:", error);
    } finally {
      setApproving(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow w-full overflow-x-auto">
      <h3 className="font-semibold text-lg mb-4">Transaction History</h3>

      {initialLoad && (
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
      {!initialLoad && !error && (
        <table className="w-full text-sm border-separate border-spacing-y-2">
          {/* HEADER */}
          <thead>
            <tr className="text-left text-gray-500 text-xs uppercase ">
              <th className="px-6 py-2">Full Name</th>
              <th className="px-6 py-2">Transaction Type</th>
              <th className="px-6 py-2">Phone Number</th>
              <th className="px-6 py-2">Amount</th>
              <th className="px-6 py-2">Status</th>
              <th className="px-6 py-2">Transaction Date</th>
              <th className="px-6 py-2">Action</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {transactions.map((t) => (
              <tr
                key={t.publicId}
                className="bg-gray-50 hover:bg-gray-100 transition rounded-xl"
              >
                <td className="px-6 py-4 font-medium text-gray-700">
                  {t.customerId?.fullName}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${t.type === "deposit"
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
                <td className="px-6 py-4 font-semibold text-gray-800">
                  {t.status === "approved" ? (
                    <span className="px-3 py-1 rounded-full text-xs bg-green-100 text-green-600">
                      Approved
                    </span>
                  ) : t.status === "pending" ? (
                    <span className="px-3 py-1 rounded-full text-xs bg-yellow-100 text-yellow-600">
                      Pending
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full text-xs bg-red-100 text-red-600">
                      Rejected
                    </span>
                  )}
                </td>

                <td className="px-6 py-4 text-gray-500">{t.createdAt}</td>
                <td className="px-6 py-4">
                  <button
                    className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium cursor-pointer"
                    onClick={() => openTransactionModal(t)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {selectedTransaction && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 overflow-y-scroll pt-40 lg:pt-0">
          <div className="w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl ">
            <div className="flex items-start justify-between gap-4  border-b border-gray-200 pb-3 pt-5 lg:pt-0">
              <div>
                <h2 className="text-2xl font-semibold  text-slate-900">Transaction details</h2>
                <p className="text-sm text-slate-500">ID: {selectedTransaction._id}</p>
              </div>
              <button
                className="text-slate-500 hover:text-slate-900"
                onClick={closeTransactionModal}
              >
                Close
              </button>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 p-4">
                <p className="text-xs uppercase tracking-wide text-slate-500">Customer</p>
                <p className="mt-2 text-sm font-medium text-slate-900">{selectedTransaction.customerId.fullName}</p>
                <p className="text-sm text-slate-600">{selectedTransaction.customerId.phone}</p>
              </div>

              <div className="rounded-2xl border border-slate-200 p-4">
                <p className="text-xs uppercase tracking-wide text-slate-500">Status</p>
                <p className="mt-2 text-sm font-semibold text-slate-900 capitalize">{selectedTransaction.status}</p>
              </div>

              <div className="rounded-2xl border border-slate-200 p-4">
                <p className="text-xs uppercase tracking-wide text-slate-500">Type</p>
                <p className="mt-2 text-sm font-semibold text-slate-900 capitalize">{selectedTransaction.type}</p>
              </div>

              <div className="rounded-2xl border border-slate-200 p-4">
                <p className="text-xs uppercase tracking-wide text-slate-500">Amount</p>
                <p className="mt-2 text-sm font-semibold text-slate-900">₦{selectedTransaction.amount.toLocaleString()}</p>
              </div>

              <div className="rounded-2xl border border-slate-200 p-4 sm:col-span-2">
                <p className="text-xs uppercase tracking-wide text-slate-500">Transaction date</p>
                <p className="mt-2 text-sm font-medium text-slate-900">{new Date(selectedTransaction.createdAt).toLocaleString()}</p>
              </div>
            </div>

            {(approveError || approveSuccess) && (
              <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm">
                {approveError ? (
                  <p className="text-red-600">{approveError}</p>
                ) : (
                  <p className="text-emerald-600">{approveSuccess}</p>
                )}
              </div>
            )}

            <div className="mt-6 flex flex-wrap items-center justify-end gap-3">
              <button
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                onClick={closeTransactionModal}
              >
                Close
              </button>
              <button
                className="rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white transition enabled:hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                onClick={handleApprove}
                disabled={approving || selectedTransaction.status === "approved"}
              >
                {selectedTransaction.status === "approved"
                  ? "Already Approved"
                  : approving
                    ? "Approving..."
                    : "Approve"}
              </button>
            </div>
          </div>
        </div>
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
