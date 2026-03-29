import Button from "../components/button";
import Cards from "../components/cards";
import Data from "../components/data";

import "../card.css";
// import { useOutletContext } from "react-router-dom";

function Payment() {
   

// const { pageTitle } = useOutletContext()

  return (
    <section className="content">
      <div className="payment-container">
        <Cards />
        <h1>made payments</h1>
      </div>

      <div className="payment-header">
       <Button />
      </div>
      <div className="payment-data">
        <Data />
      </div>
    </section>
  );
}
export default Payment;
