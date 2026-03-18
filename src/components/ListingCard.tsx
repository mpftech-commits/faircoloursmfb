import { MoreVertical } from "lucide-react";
import StatusBadge from "./StatusBadge";

interface Props {
  title: string;
  location: string;
  bedrooms: number;
  price: string;
  status: string;
  image: string;
}

export default function ListingCard({
  title,
  location,
  bedrooms,
  price,
  status,
  image,
}: Props) {
  return (
    <div className="bg-white border rounded-xl p-3 flex gap-4 items-center shadow-sm">

      <img
        src={image}
        className="w-24 h-20 rounded-lg object-cover"
      />

      <div className="flex-1">

        <h3 className="font-medium text-gray-800">
          {title}
        </h3>

        <p className="text-sm text-gray-500">
          {location}
        </p>

        <p className="text-sm text-gray-600 mt-1">
          {bedrooms} Bedrooms
          <span className="font-semibold ml-2">
            {price}/yr
          </span>
        </p>

        <StatusBadge status={status} />

      </div>

      <MoreVertical size={18} className="text-gray-400" />

    </div>
  );
}