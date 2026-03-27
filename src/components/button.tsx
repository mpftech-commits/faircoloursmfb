import Addpayment from "../modal/addpayment";
import { useState } from "react";
import "../payment.css";

function Button() {
  const [isOpen, setisOpen] = useState(false);

  return (
    <div className="button-header">
      <div className="payment">
        <input type="date" className="border  border-gray-300 rounded-lg px-5 w-50 " />
        <select className="w-50 px-5 border py-3 ">
          <option selected disabled value="">
            status
          </option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
          <option value="successful">Successfull</option>
        </select>
      </div>
      <Addpayment isOpen={isOpen} onClose={() => setisOpen(false)} />
      <button onClick={() => setisOpen(true)} className="text-white text-xs bg-blue-900  px-5 py-3 rounded-lg font-medium cursor-pointer">
        + Add Cashier
      </button>
    </div>
  );
}
export default Button;
