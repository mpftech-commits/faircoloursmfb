import { X } from "lucide-react";
import type { Loan } from "../../data/Types";

interface Props {
  loan: Loan | null;
  onClose: () => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

export default function LoanDetailsModal({
  loan,
  onClose,
  onApprove,
  onReject,
}: Props) {
  if (!loan) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-2xl w-100 space-y-4 mt-3">
        <h2 className="text-xl font-bold mb-4 text-center mt-3">Loan Details </h2>

        <p className="flex justify-between"><b>Name:</b> <span className="font-medium">{loan.name}</span></p>
        <p className="flex justify-between font-medium"><b>Amount:</b> ₦{loan.amount.toLocaleString()}</p>
        <p className="flex justify-between font-medium"><b>Income:</b> ₦{loan.income.toLocaleString()}</p>
        <p className="flex justify-between font-medium"><b>Credit Score:</b> {loan.creditScore}</p>

        <div className="flex gap-3 mt-6">
          <button
            onClick={() => onApprove(loan.id)}
            className="flex-1 bg-blue-900 cursor-pointer text-white py-2 rounded-lg"
          >
            Approve
          </button>

          <button
            onClick={() => onReject(loan.id)}
            className="flex-1 bg-blue-500 text-white py-2 rounded-lg cursor-pointer"
          >
            Reject
          </button>
        </div>

        <button onClick={onClose} className="mt-4 text-sm text-white cursor-pointer bg-blue-800 rounded-lg p-1 relative flex items-center gap-1 font-medium px-2">
          <X size={18} /> Close
        </button>
      </div>
    </div>
  );
}