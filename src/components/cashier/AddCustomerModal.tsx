import { useEffect, useState } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (name: string, email: string, phone: string) => void;
};

export default function AddCustomerModal({
  isOpen,
  onClose,
  onAdd,
}: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // Close on ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
    }

    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  // Prevent scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    onAdd(name, email, phone);
    setName("");
    setEmail("");
    setPhone("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white w-full max-w-md mx-4 p-6 rounded-2xl shadow-xl animate-fadeIn">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Add Customer</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <input
          value={name}
          placeholder="Name"
          className="border p-2 w-full mb-3 rounded-lg"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          value={email}
          placeholder="Email"
          className="border p-2 w-full mb-3 rounded-lg"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          value={phone}
          placeholder="Phone Number"
          className="border p-2 w-full mb-4 rounded-lg"
          onChange={(e) => setPhone(e.target.value)}
        />

        {/* Actions */}
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Add Customer
          </button>
        </div>
      </div>
    </div>
  );
}