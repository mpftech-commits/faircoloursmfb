interface Props {
  title: string;
  desc?: string;
  items?: string[];
  children?: React.ReactNode;
}

export default function InfoCard({ title, desc, items, children }: Props) {
  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">

      <p className="font-semibold text-sm text-gray-700 mb-2 text-left">
        {title}
      </p>

      {desc && (
        <p className="text-xs text-gray-600 mb-2 text-left">
          {desc}
        </p>
      )}

      {items && (
        <ul className="text-xs text-gray-600 list-disc pl-4 space-y-1 text-left">
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}

      {children}
    </div>
  );
}