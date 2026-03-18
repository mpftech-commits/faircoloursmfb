export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

  export const Input = ({ className, ...props }: InputProps) => {
  return (
    <input
      className={`border p-3 rounded-lg w-full ${className}`}
      {...props}
    />
  );
};
