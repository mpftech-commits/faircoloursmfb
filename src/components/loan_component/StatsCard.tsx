interface Props {
  title: string;
  value: string;
}

export default function StatsCard({ title, value }: Props) {
  return (
    <div className="bg-white p-2 rounded-2xl shadow-sm border border-gray-300">
      <p className="text-gray-500 text-[10px]">{title}</p>
      <h2 className="text-sm font-bold mt-2">{value}</h2>
    </div>
  );
}