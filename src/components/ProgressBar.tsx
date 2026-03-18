interface Props {
  step: number
  total: number
}

export default function ProgressBar({ step, total }: Props) {

  const percent = (step / total) * 100;

  return (
    <div>

      <div className="flex justify-between text-sm text-gray-600 mb-2">
        <span>Step {step} of {total}</span>
        <span>{percent}%</span>
      </div>

      <div className="w-full bg-gray-200 h-2 rounded-full">
        <div
          className="bg-green-700 h-2 rounded-full transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>

    </div>
  );
}