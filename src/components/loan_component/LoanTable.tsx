import type { Loan } from "../../data/Types";
import RiskBadge from "./RiskBadge";

interface Props {
  loans: Loan[];
  onSelect: (loan: Loan) => void;
}

export default function LoanTable({ loans, onSelect }: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border overflow-x-auto border-gray-300">
      <table className="w-full">
        <thead className="bg-gray-50 text-left">
          <tr>
            <th className="p-3">Name</th>
            <th>Amount</th>
            <th>Duration</th>
            <th>Risk</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {loans.map((loan) => (
            <tr
              key={loan.id}
              onClick={() => onSelect(loan)}
              className="border-t border-gray-300 cursor-pointer hover:bg-gray-50"
            >
              <td className="p-3">{loan.name}</td>
              <td>₦{loan.amount.toLocaleString()}</td>
              <td>{loan.duration} months</td>
              <td>
                <RiskBadge score={loan.creditScore} />
              </td>
              <td className="capitalize">{loan.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}