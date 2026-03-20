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
      <div className="bg-white p-6 rounded-2xl w-[400px]">
        <h2 className="text-xl font-bold mb-4">Loan Details</h2>

        <p><b>Name:</b> {loan.name}</p>
        <p><b>Amount:</b> ₦{loan.amount.toLocaleString()}</p>
        <p><b>Income:</b> ₦{loan.income.toLocaleString()}</p>
        <p><b>Credit Score:</b> {loan.creditScore}</p>

        <div className="flex gap-3 mt-6">
          <button
            onClick={() => onApprove(loan.id)}
            className="flex-1 bg-green-500 text-white py-2 rounded-lg"
          >
            Approve
          </button>

          <button
            onClick={() => onReject(loan.id)}
            className="flex-1 bg-red-500 text-white py-2 rounded-lg"
          >
            Reject
          </button>
        </div>

        <button onClick={onClose} className="mt-4 text-sm text-gray-500">
          Close
        </button>
      </div>
    </div>
  );
}