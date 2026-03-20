export const Button = ({ children, onClick }: any) => (
  <button
    onClick={onClick}
    className="px-3 py-1 rounded text-white bg-blue-600"
  >
    {children}
  </button>
);