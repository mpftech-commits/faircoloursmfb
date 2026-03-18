interface Props {
  status: string;
}

export default function StatusBadge({ status }: Props) {

  const styles: any = {
    Approved: "bg-green-100 text-green-600",
    Pending: "bg-yellow-100 text-yellow-600",
    Rented: "bg-red-100 text-red-600",
    Removed: "bg-gray-200 text-gray-600",
  };

  return (
    <span
      className={`text-xs px-2 py-1 rounded-full mt-1 inline-block ${styles[status]}`}
    >
      {status}
    </span>
  );
}