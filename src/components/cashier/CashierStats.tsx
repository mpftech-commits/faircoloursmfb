
interface Props {
  transactions: Transaction[];
}

export default function CashierStats({ transactions }: Props) {
  const total = transactions.reduce((acc, t) => acc + t.amount, 0);
  const deposits = transactions
    .filter(t => t.type === "deposit")
    .reduce((acc, t) => acc + t.amount, 0);

  const withdrawals = transactions
    .filter(t => t.type === "withdrawal")
    .reduce((acc, t) => acc + t.amount, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card title="Total Transactions" value={`₦${total.toLocaleString()}`} />
      <Card title="Deposits" value={`₦${deposits.toLocaleString()}`} />
      <Card title="Withdrawals" value={`₦${withdrawals.toLocaleString()}`} />
    </div>
  );
}

function Card({ title, value }: any) {
  return (
    <div className="bg-white p-4 rounded-2xl shadow border border-gray-300">
      <p className="text-gray-500 text-sm">{title}</p>
      <h2 className="text-xl font-bold mt-2">{value}</h2>
    </div>
  );
}