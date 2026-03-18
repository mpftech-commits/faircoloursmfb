interface Props {
  name: string;
  email: string;
}

export default function UserCard({ name, email }: Props) {
  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-300 ">
      <div className="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center text-white font-semibold">
        {name
          .split(" ")
          .map((n) => n[0])
          .join("")}
      </div>

      <div className="flex flex-col">
        <p className="font-semibold text-sm">{name}</p>
        <p className="text-xs text-gray-500">{email}</p>

        <div className="flex gap-2 mt-1 text-xs">
          <span className="text-green-600 bg-green-50 px-2 py-2 rounded-lg">Verified Agent</span>
          <span className="text-yellow-600 bg-yellow-50 px-2 py-2 rounded-lg">Standard Plan</span>
        </div>
      </div>
    </div>
  );
}