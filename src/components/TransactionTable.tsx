const transactions = [
  { id: 1, name: "John Doe", type: "Deposit", amount: "500", date: "Today" },
  {
    id: 2,
    name: "Jane Smith",
    type: "Withdrawal",
    amount: "200",
    date: "Today",
  },
  { id: 3, name: "Michael", type: "Payment", amount: "150", date: "Today" },
];

const TransactionTable = () => (
    
 
<div className="bg-white p-6 rounded-2xl shadow w-full overflow-x-auto">
  <h3 className="font-semibold text-lg mb-4">Transaction History</h3>

  <table className="w-full text-sm border-separate border-spacing-y-2">
    {/* HEADER */}
    <thead>
      <tr className="text-left text-gray-500 text-xs uppercase ">
        <th className="px-6 py-2">Name</th>
        <th className="px-6 py-2">Type</th>
        <th className="px-6 py-2">Amount</th>
        <th className="px-6 py-2">Date</th>
      </tr>
    </thead>

    {/* BODY */}
    <tbody>
      {transactions.map((t) => (
        <tr
          key={t.id}
          className="bg-gray-50 hover:bg-gray-100 transition rounded-xl"
        >
          <td className="px-6 py-4 font-medium text-gray-700">
            {t.name}
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
            ₦{(t.amount).toLocaleString()}
          </td>

          <td className="px-6 py-4 text-gray-500">
            {t.date}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
);
export default TransactionTable;