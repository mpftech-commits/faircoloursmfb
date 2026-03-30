import { X } from "lucide-react";
import "../modal/addpayment.css";
interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddCashier({ isOpen, onClose }: Props) {

  if (!isOpen) return null;

  return (
    <div className="modal-overlay ">
      <div className="modal-container mt-15">
        {/* Header */}
        <div className="modal-headers relative">
          <X onClick={onClose} className="cursor-pointer absolute right-5 top-5 bg-blue-900 text-white rounded-sm p-1"/>
          <div className="logo-box">
            <img src="/logo.png" alt="loopbox-logo" />
          </div>
        </div>

        {/* Body */}
        <div className="modal-Body">
          <h2>Add Cashier</h2>

          <label>Name</label>
          <div className="input-box">
            <input
              type="text"
              placeholder="Full-name"  
            />
          </div>

          <label>Status</label>
          <select>
            <option value="">Select Status</option>
            <option value="pending">Loan Collector</option>
          <option value="failed">Cashier</option>
          <option value="successful">Office Cashier</option>
          <option value="successful">Daily Cash Collector</option>
          </select>

          <label>Email</label>
          <div className="input-box">
            <input
              type="email"
              placeholder=" Email"  
            />
          </div>
          <label>Phone-number</label>
          <div className="input-box">
            <input
              type="text"
              placeholder=" e.g (+23)98235649"  
            />
          </div>

          <div className="modal-actions">
            <button className="btns cancel" onClick={onClose}>
              Cancel
            </button>
            <button className="btns continue">Continue</button>
          </div>
        </div>
      </div>
    </div>
  );
}

