import "../styles/card.css";

function Cards() {
  return (
    <div className="card-wrapper">
      <div className="flex items-center gap-5 py-3 w-full justify-between">
       
        <div className="card border p-5 rounded-lg px-5 border-gray-300">
          <h5>$900,000</h5>
          <div className="icon">
            <span className="material-symbols-outlined">
              account_balance_wallet
            </span>
            <p>available balance</p>
          </div>
        </div>
        <div className="card">
          <h5>$180,000</h5>
          <div className="icon">
            <span className="material-symbols-outlined">
              account_balance_wallet
            </span>
            <p>total withdrawn</p>
          </div>
        </div>
        <div className="card">
          <h5>$90,000</h5>
          <div className="icon">
            <span className="material-symbols-outlined">
              account_balance_wallet
            </span>
            <p>total contributed</p>
          </div>
        </div>
        <div className="card">
          <h5>45</h5>
          <div className="icon">
            <span className="material-symbols-outlined">groups</span>
            <p>total members</p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Cards;
