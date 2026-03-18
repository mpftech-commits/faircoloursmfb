export default function SkeletonCard() {
  return (
    <div className="animate-pulse bg-white border rounded-xl p-3 flex gap-4">

      <div className="w-24 h-20 bg-gray-200 rounded-lg"></div>

      <div className="flex-1 space-y-2">

        <div className="h-3 bg-gray-200 rounded w-1/3"></div>

        <div className="h-3 bg-gray-200 rounded w-1/4"></div>

        <div className="h-3 bg-gray-200 rounded w-1/2"></div>

        <div className="h-5 bg-gray-200 rounded w-16"></div>

      </div>

    </div>
  );
}