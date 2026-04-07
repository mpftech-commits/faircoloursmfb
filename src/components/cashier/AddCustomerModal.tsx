import { useEffect, useState } from "react";
import { CreateCustomer } from "../../services/Axios";
import { X, Loader } from "lucide-react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function AddCustomerModal({ isOpen, onClose }: Props) {
  const [fullname, setFullName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

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

  const handleCreateCustomer = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage(null);

    try {
      const response = await CreateCustomer({
        fullName: fullname,
        phone,
        address,
      });

      console.log(response, "customer created successfully");
      setFullName("");
      setPhone("");
      setAddress("");
      setStatusMessage({
        type: "success",
        text: "Customer registered successfully.",
      });
    } catch (err: any) {
      console.log(err, "error creating customer");
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Customer registration failed. Please try again.";
      setStatusMessage({ type: "error", text: message });
    } finally {
      setLoading(false);
    }
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
            className="text-white  bg-blue-800 cursor-pointer p-2 font-bold rounded-full"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleCreateCustomer}>
          <div className="grid grid-cols-1 gap-3 ">
            <div>
              <label htmlFor="FullName" className="text-xs ">
                FullName
              </label>
              <input
                placeholder="fullName"
                className="border border-gray-200 p-2 w-full rounded-lg mt-2 text-xs"
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            {/* <div>
              <label htmlFor="email" className="text-xs ">
                Email
              </label>
              <input
                placeholder="Email"
                className="border border-gray-200 p-2 w-full rounded-lg mt-2 text-xs"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div> */}
          </div>
          <div className="grid grid-cols-2 gap-3 mb-2">
            <div>
              <label htmlFor="phone" className="text-xs ">
                Phone_Number
              </label>
              <input
                placeholder="Phone Number"
                className="border mt-3 border-gray-200 p-2 w-full mb-4 rounded-lg text-xs"
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="address" className="text-xs ">
                Address
              </label>
              <input
                placeholder="enter address"
                className="border border-gray-200 p-2 w-full mb-4 rounded-lg mt-3 text-xs"
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </div>
          {statusMessage && (
            <div
              className={`mt-3 rounded-lg px-4 py-3 text-sm font-medium ${
                statusMessage.type === "success"
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-rose-100 text-rose-700"
              }`}
            >
              {statusMessage.text}
            </div>
          )}
          {/* Actions */}
          <div className="flex justify-end gap-2 mt-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-gray-200 text-xs"
            >
              Cancel
            </button>
            <button
              disabled={loading}
              className=" flex gap-3 bg-blue-800 text-white px-4 py-2 rounded-lg cursor-pointer text-xs "
            >
              {loading && <Loader size={18} className="animate-spin" />}
              {loading ? "Creating Customer..." : "Create Customer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
