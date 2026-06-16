interface Props {
  title: string;
  value: number;
  className?: string;
}

export default function StatsCard({ title, value, className }: Props) {
  return (
    <div className={` p-1.5 rounded-lg shadow-sm border border-gray-300  flex-1 ${className}`}>
      <p className=" text-[10px]">{title}</p>
      <h2 className="text-[10px] font-bold mt-2">{value}</h2>
    </div>
  );
}