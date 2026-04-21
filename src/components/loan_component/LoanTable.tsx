import { useState, useEffect } from "react";
import RiskBadge from "./RiskBadge";
import { GetLoans } from "../../services/Axios";
import {
  Loader,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Eye,
} from "lucide-react";

type LoanStatus = "Pending" | "Approved" | "Rejected";
interface PersonInfo {
  _id: string;
  fullName?: string;
  otherName?: string;
  surname?: string;
  phone?: string;
  address?: string;
  publicId?: string;
}
interface GuarantorInfo {
  fullName?: string;
  relationship?: string;
  phone?: string;
  email?: string;
  address?: string;
  country?: string;
  state?: string;
  lga?: string;
  landmark?: string;
  dateOfBirth?: string;
  maritalStatus?: string;
}
interface Loan {
  _id: string;
  publicId?: string;
  amount: number;
  amountToPay?: number;
  monthlyPayment?: number;
  createdAt: string;
  updatedAt?: string;
  createdBy?: {
    fullName?: string;
  };
  customerId?: PersonInfo;
  guarantor?: GuarantorInfo;
  duration?: number;
  interest?: number;
  purpose?: string;
  repaymentMethod?: string;
  status: LoanStatus;
  creditScore?: number;
  date?: string;
}

export default function LoanTable() {
  const [loansState, setLoansState] = useState<Loan[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>("");
  const [page, setPage] = useState(1);
  const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actionLoading, setActionLoading] = useState<
    "approve" | "reject" | null
  >(null);

  useEffect(() => {
    const fetchLoans = async () => {
      setLoading(true);
      try {
        const response = await GetLoans(page, 10);
        console.log(response, "loan fetched successfully");
        const loans = Array.isArray(response)
          ? response
          : response?.data?.data || response?.data || [];
        setLoansState(loans);
      } catch (err: any) {
        console.error("Error fetching loans:", err);
        setError(err.response?.data?.message || "something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchLoans();
  }, [page]);
  const handleViewLoans = (loan: Loan) => {
    setSelectedLoan(loan);
    setIsModalOpen(true);
  };

  // approving & rejecting loans
  const handleApprove = async () => {
    if (!selectedLoan) return;

    try {
      setActionLoading("approve");

      // TODO: call your API here
      console.log("Approved loan:", selectedLoan._id);

      setSelectedLoan({ ...selectedLoan, status: "Approved" });
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async () => {
    if (!selectedLoan) return;

    try {
      setActionLoading("reject");

      // TODO: call your API here
      console.log("Rejected loan:", selectedLoan._id);

      setSelectedLoan({ ...selectedLoan, status: "Rejected" });
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(null);
    }
  };

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
        <table className="w-full px-5 py-10 bg-green-100">
          <thead className="bg-gray-100 text-center text-xs ">
            <tr className="mt-4">
              <th className=" text-xs p-2">User_Id</th>
              <th className=" text-xs p-2">Name</th>
              <th className=" text-xs p-2">Amount ₦</th>
              <th className=" text-xs p-2">Interest %</th>
              <th className=" text-xs p-2">Duration</th>
              <th className=" text-xs p-2">Risk</th>
              <th className=" text-xs p-2">Status</th>
              <th className=" text-xs p-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {loansState.map((loan) => (
              <tr
                key={loan._id}
                // onClick={() => onSelect(loan)}
                className="border-t border-gray-300 cursor-pointer text-center hover:bg-gray-50 text-xs px-5 border-b border-b-gray-300 pb-5"
              >
                <td className="p-3">{loan._id}</td>
                <td className="p-3">{loan.customerId?.fullName}</td>
                <td>₦{loan.amount.toLocaleString()}</td>
                <td>
                  {loan.interest !== undefined
                    ? `₦${loan.interest.toLocaleString()}`
                    : "-"}
                </td>
                <td>{loan.duration ?? "-"} months</td>
                <td>
                  <RiskBadge score={loan.creditScore ?? 0} />
                </td>
                <td className="capitalize">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      loan.status === "Approved"
                        ? "bg-green-100 text-green-600"
                        : loan.status === "Rejected"
                          ? "bg-red-100 text-red-600"
                          : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {loan.status}
                  </span>
                </td>
                <td>
                  <button
                    onClick={() => handleViewLoans(loan)}
                    className="bg-blue-100 text-blue-700 hover:bg-blue-200 py-1 px-3 rounded-full text-xs font-medium flex items-center gap-1"
                  >
                    <Eye size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {isModalOpen && selectedLoan && (
        <div
          onClick={() => setIsModalOpen(false)}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4 overflow-auto">
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white w-full max-w-xl rounded-2xl shadow-xl p-6 relative overflow-auto mt-20 mb-10">
            {/* Close */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700">
              ✕
            </button>

            {/* Header */}
            <div className="pt-50 lg:pt-3 mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Loan Overview
              </h2>
              <p className="text-xs text-gray-500">
                Detailed information about this loan
              </p>
            </div>

            {/* Status Badge */}
            <div className="mb-4">
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  selectedLoan.status === "Approved"
                    ? "bg-green-100 text-green-600"
                    : selectedLoan.status === "Rejected"
                      ? "bg-red-100 text-red-600"
                      : "bg-yellow-100 text-yellow-600"
                }`}>
                {selectedLoan.status}
              </span>
            </div>

            {/* Content Grid */}
            <div className="space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-500 text-xs">Loan Number</p>
                  <p className="font-medium break-all">
                    {selectedLoan.publicId || selectedLoan._id}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Status</p>
                  <p className="font-medium capitalize">
                    {selectedLoan.status}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Created By</p>
                  <p className="font-medium">
                    {selectedLoan.createdBy?.fullName || "-"}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Created</p>
                  <p className="font-medium">
                    {new Date(selectedLoan.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Updated</p>
                  <p className="font-medium">
                    {selectedLoan.updatedAt
                      ? new Date(selectedLoan.updatedAt).toLocaleDateString()
                      : "-"}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Purpose</p>
                  <p className="font-medium">{selectedLoan.purpose || "-"}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-500 text-xs">Amount</p>
                  <p className="font-medium">
                    ₦{selectedLoan.amount.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Amount to Pay</p>
                  <p className="font-medium">
                    ₦{selectedLoan.amountToPay?.toLocaleString() ?? "-"}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Monthly Payment</p>
                  <p className="font-medium">
                    ₦{selectedLoan.monthlyPayment?.toLocaleString() ?? "-"}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Interest</p>
                  <p className="font-medium">{selectedLoan.interest ?? "-"}%</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Duration</p>
                  <p className="font-medium">
                    {selectedLoan.duration ?? "-"} months
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Repayment</p>
                  <p className="font-medium capitalize">
                    {selectedLoan.repaymentMethod || "-"}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                <div>
                  <p className="text-gray-500 text-xs">Customer Name</p>
                  <p className="font-medium">
                    {selectedLoan.customerId?.fullName || "-"}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Customer Phone</p>
                  <p className="font-medium">
                    {selectedLoan.customerId?.phone || "-"}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Customer Address</p>
                  <p className="font-medium">
                    {selectedLoan.customerId?.address || "-"}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Customer ID</p>
                  <p className="font-medium break-all">
                    {selectedLoan.customerId?.publicId || "-"}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                <div>
                  <p className="text-gray-500 text-xs">Guarantor</p>
                  <p className="font-medium">
                    {selectedLoan.guarantor?.fullName || "-"}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Guarantor Phone</p>
                  <p className="font-medium">
                    {selectedLoan.guarantor?.phone || "-"}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Relationship</p>
                  <p className="font-medium">
                    {selectedLoan.guarantor?.relationship || "-"}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Guarantor Address</p>
                  <p className="font-medium">
                    {selectedLoan.guarantor?.address || "-"}
                  </p>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="my-6 border-t border-gray-300" />

            {/* Actions */}
            <div className="flex justify-end gap-3">
              <button
                onClick={handleReject}
                disabled={actionLoading !== null}
                className="px-4 py-2 rounded-lg text-sm font-medium bg-red-100 text-red-600 hover:bg-red-200 disabled:opacity-50"
              >
                {actionLoading === "reject" ? "Rejecting..." : "Reject"}
              </button>

              <button
                onClick={handleApprove}
                disabled={actionLoading !== null}
                className="px-4 py-2 rounded-lg text-sm font-medium bg-green-600 text-white hover:bg-green-700 disabled:opacity-50"
              >
                {actionLoading === "approve" ? "Approving..." : "Approve"}
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
