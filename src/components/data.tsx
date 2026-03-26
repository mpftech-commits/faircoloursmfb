import "../data.css";


const Data = () => {
  return (
    <div className="table-container">
      <table className="payment-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone-No</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td className="user-cell">
              <img src="/user.png" alt="user" />
              Christian Albert
            </td>
            <td>albert@hotmail.com</td>
            <td>(+23)812347564</td>
            <td>23/04/2023</td>
            <td>
              <span className="status pending">Pending</span>
            </td>
          </tr>

          <tr>
            <td className="user-cell">
              <img src="/user.png" alt="user" />
              Aisha Bello
            </td>
            <td>bello@hotmail.com</td>
            <td>08120223344556</td>
            <td>25/04/2023</td>
            <td>
              <span className="status successful">Successful</span>
            </td>
          </tr>

          <tr>
            <td className="user-cell">
              <img src="/user.png" alt="user" />
              John Martins
            </td>
            <td>john@hotmail.com</td>
            <td>12344567890</td>
            <td>26/04/2023</td>
            <td>
              <span className="status failed">Failed</span>
            </td>
          </tr>

          <tr>
            <td className="user-cell">
              <img src="/user.png" alt="user" />
              Zainab Musa
            </td>
            <td>musa@hotmail.com</td>
            <td>1239876354</td>
            <td>28/04/2023</td>
            <td>
              <span className="status successful">Successful</span>
            </td>
          </tr>

          <tr>
            <td className="user-cell">
              <img src="/user.png" alt="user" />
              Paul Okafor
            </td>
            <td>$12,000</td>
            <td>Transfer</td>
            <td>01/05/2023</td>
            <td>
              <span className="status pending">Pending</span>
            </td>
          </tr>

          <tr>
            <td className="user-cell">
              <img src="/user.png" alt="user" />
              Deborah Williams
            </td>
            <td>williams23@hotmail.com</td>
            <td>12345678909</td>
            <td>02/05/2023</td>
            <td>
              <span className="status failed">Failed</span>
            </td>
          </tr>

          <tr>
            <td className="user-cell">
              <img src="/user.png" alt="user" />
              Samuel Ade
            </td>
            <td>samuel123@hotmail.com</td>
            <td>091803456789</td>
            <td>04/05/2023</td>
            <td>
              <span className="status successful">Successful</span>
            </td>
          </tr>

          <tr>
            <td className="user-cell">
              <img src="/user.png" alt="user" />
              Fatima Lawal
            </td>
            <td>lawal@hotmail.com</td>
            <td>(+22)91264573</td>
            <td>05/05/2023</td>
            <td>
              <span className="status pending">Pending</span>
            </td>
          </tr>

          <tr>
            <td className="user-cell">
              <img src="/user.png" alt="user" />
              Michael Brown
            </td>
            <td>$15,400</td>
            <td>Card</td>
            <td>06/05/2023</td>
            <td>
              <span className="status successful">Successful</span>
            </td>
          </tr>

          <tr>
            <td className="user-cell">
              <img src="/user.png" alt="user" />
              Grace Peterson
            </td>
            <td>$3,500</td>
            <td>USSD</td>
            <td>07/05/2023</td>
            <td>
              <span className="status failed">Failed</span>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="buttons">
        <button className="prev">previous</button>
        <button className="next">next</button>
      </div>
    </div>
  );
};

export default Data;
