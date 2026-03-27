import type React from "react";
import { forwardRef} from "react";

interface InputProps {
  type?: "text" | "number" | "email" | "password" | "date" | "time" | string;
  id?: string;
  name?: string;
  placeholder?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  className?: string;
  min?: string;
  max?: string;
  step?: number;
  disabled?: boolean;
  success?: boolean;
  error?: boolean;
  hint?: string;
  required?: boolean;
  maxLength?: number;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
  type = "text",
  id,
  name,
  placeholder,
  value,
  onChange,
  onKeyDown,
  className = "",
  min,
  max,
  step,
  disabled = false,
  success = false,
  error = false,
  hint,
  required = false,
  maxLength,
  inputMode,
 }, ref) => {
  let inputClasses = ` h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-800 focus:outline-hidden focus:ring-3   ${className}`;

  if (disabled) {
    inputClasses += ` text-gray-500 border-gray-300 opacity-40 bg-gray-100 cursor-not-allowed opacity-40`;
  } else if (error) {
    inputClasses += `  border-red-500 focus:border-red-300 focus:ring-red-500/20 `;
  } else if (success) {
    inputClasses += `  border-green-500 focus:border-green-300 focus:ring-green-500/20  `;
  } else {
    inputClasses += ` bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 `;
  }

  return (
    <div className="relative">
      <input
        ref={ref}
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        min={min}
        max={max}
        step={step}
        maxLength={maxLength}
        inputMode={inputMode}
        disabled={disabled}
        required={required}
        className={inputClasses}
        
      />

      {hint && (
        <p
          className={`mt-1.5 text-xs ${
            error
              ? "text-error-500"
              : success
              ? "text-success-500"
              : "text-gray-500"
          }`}
        >
          {hint}
        </p>
      )}
    </div>
  );
});
Input.displayName = "Input";

export default Input;
