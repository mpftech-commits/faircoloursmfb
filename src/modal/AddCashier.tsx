import { X, Eye, EyeOff } from "lucide-react";
import "../modal/AddCashier.css";
import { useState } from "react";
import { CreateCashier } from "../services/Axios";
interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddCashier({ isOpen, onClose }: Props) {
  const [showPassword, setShowPassword] = useState<boolean | null>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [loading, setLoading] = useState<boolean | undefined>(false);
  const [error, setError] = useState<string>("");

  if (!isOpen) return null;

  const handleClose = () => {
    setError("");
    onClose();
  };
  const HandleCreateCashier = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await CreateCashier({
        name,
        email,
        password,
      });
      console.log(response, "user created successfully");
      setLoading(false);
      setEmail("");
      setPassword("");
      setName("");
    } catch (error) {
      console.log("error creating cashier.:", error);
      setLoading(false);
      setError(
        error instanceof Error
          ? error.message
          : "Failed to create cashier. Please try again.",
      );
    }
  };

  return (
    <div className="modal-overlay ">
      <div className="modal-container mt-15">
        {/* Header */}
        <div className="modal-headers relative">
          <X
            onClick={handleClose}
            className="cursor-pointer absolute right-5 top-5 bg-blue-900 text-white rounded-sm p-1"
          />
          <div className="logo-box">
            <img src="/logo.png" alt="loopbox-logo" />
          </div>
        </div>

        {/* Body */}
        <div className="modal-Body">
          <h2>Add Cashier</h2>

          <form onSubmit={HandleCreateCashier}>
            {error && (
              <div className="error-message bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}
            <label>Full-Name</label>
            <div className="input-box">
              <input
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setError("");
                }}
                type="text"
                placeholder="First name & last name "
              />
            </div>
            <label>Email</label>
            <div className="input-box">
              <input
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                type="email"
                placeholder=" enter your Email"
              />
            </div>
            <label>password</label>
            <div className="input-box relative">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? "text" : "Password"}
                placeholder=" Create a secure password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3  cursor-pointer mt-2"
              >
                {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
            </div>
            <div className="modal-actions">
              <button className="btns cancel" onClick={handleClose}>
                Cancel
              </button>
              <button className="btns continue" disabled={loading}>
                {loading && (
                  <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin cursor-not-allowed"></span>
                )}
                {loading ? "Creating Cashier..." : "Create Cashier"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
