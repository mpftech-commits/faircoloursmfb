export default function RiskBadge({ score }: { score: number }) {
  let color = "bg-red-100 text-red-600";
  let label = "High Risk";

  if (score > 700) {
    color = "bg-green-100 text-green-600";
    label = "Low Risk";
  } else if (score > 600) {
    color = "bg-yellow-100 text-yellow-600";
    label = "Medium Risk";
  }

  return (
    <span className={`px-2 py-1 rounded-full text-xs ${color}`}>
      {label}
    </span>
  );
}