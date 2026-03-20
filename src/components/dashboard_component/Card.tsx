export const Card = ({ title, value, className }: { title: string; value: number, className?: string }) => (
  <div className="bg-white rounded-2xl shadow p-5">
    <p className="text-gray-500 text-sm">{title}</p>
    <h2 className="text-2xl font-bold">₦{value.toLocaleString()}</h2>
  </div>
);