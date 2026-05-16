interface Props {
  label: string;
  placeholder?: string;
  required?: boolean;
  value?: string;
}

export default function FormInput({ label, placeholder, required, value }: Props) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <input
        placeholder={placeholder}
        value={value}
        className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-700"
      />
    </div>
  );
}