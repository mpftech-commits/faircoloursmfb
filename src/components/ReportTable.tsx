interface ReportItem {
  customerName: string;
  amount: number;
  date: string;
}

export default function ReportTable({ data }: { data: ReportItem[] }) {
  if (!data?.length) {
    return (
      <div className="text-center py-10 text-gray-500">
        No report data available
      </div>
    );
  }

  return (
    <div className="overflow-x-auto mt-6">
      <table className="min-w-full border rounded-lg overflow-hidden">
        <thead className="bg-green-600 text-white text-sm">
          <tr>
            <th className="p-3 text-left">Customer</th>
            <th className="p-3 text-left">Amount</th>
            <th className="p-3 text-left">Date</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {data.map((item, i) => (
            <tr key={i} className="border-b hover:bg-gray-50">
              <td className="p-3">{item.customerName}</td>
              <td className="p-3 font-medium">₦{item.amount}</td>
              <td className="p-3">{item.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
