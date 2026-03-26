import Addpayment from "../modal/addpayment";
import { useState } from "react";
import "../payment.css";

function Button() {
  const [isOpen, setisOpen] = useState(false);

  return (
    <div className="button-header">
      <div className="payment">
        <input type="date" name="" id="date" />
        <select name="" id="">
          <option selected disabled value="">
            status
          </option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
          <option value="successful">Successfull</option>
        </select>
      </div>
      <Addpayment isOpen={isOpen} onClose={() => setisOpen(false)} />
      <button onClick={() => setisOpen(true)} className="addpayment">
        + add payment
      </button>
    </div>
  );
}
export default Button;
